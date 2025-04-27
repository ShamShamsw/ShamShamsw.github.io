const Redis = require('ioredis');

let redisClient;

const connectRedis = async () => {
  if (!redisClient) {
    const host = process.env.VALKEY_HOST;
    const port = process.env.VALKEY_PORT || 6379;
    redisClient = new Redis(port, host);

    redisClient.on('connect', () => {
      console.log('Connected to Valkey!');
    });

    redisClient.on('error', (err) => {
      console.error('Valkey connection error:', err);
      redisClient = null; // Ensure we try to reconnect on the next invocation
    });
  }
  return redisClient;
};

exports.handler = async (event) => {
  const { email } = event.queryStringParameters || {};
  const redis = await connectRedis();
  const cacheKey = `order:${email}`;

  if (redis) {
    try {
      const cachedOrder = await redis.get(cacheKey);
      if (cachedOrder) {
        console.log('Order retrieved from Valkey cache:', cachedOrder);
        return {
          statusCode: 200,
          headers: { "Content-Type": "application/json" },
          body: cachedOrder,
        };
      }
    } catch (err) {
      console.error('Error retrieving from Valkey:', err);
      // Continue to fetch from the primary source on cache error
    }
  }

  // In a real app, you'd query DynamoDB here
  console.log("Fetching order for:", email);
  const orderData = {
    email,
    product: "Robo Assistant X",
    quantity: 2,
    status: "Shipped",
  };
  const orderDataString = JSON.stringify(orderData);

  if (redis) {
    try {
      await redis.setex(cacheKey, 60, orderDataString); // Cache for 60 seconds
      console.log('Order stored in Valkey cache:', orderDataString);
    } catch (err) {
      console.error('Error storing in Valkey:', err);
    }
  }

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: orderDataString,
  };
};
