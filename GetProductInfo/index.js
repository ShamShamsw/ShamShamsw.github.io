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
  const redis = await connectRedis();
  const cacheKey = `product:info`;

  if (redis) {
    try {
      const cachedProductInfo = await redis.get(cacheKey);
      if (cachedProductInfo) {
        console.log('Product info retrieved from Valkey cache:', cachedProductInfo);
        return {
          statusCode: 200,
          headers: { "Content-Type": "application/json" },
          body: cachedProductInfo,
        };
      }
    } catch (err) {
      console.error('Error retrieving from Valkey:', err);
      // Continue to fetch from the primary source on cache error
    }
  }

  console.log("Getting product info");
  const productInfo = {
    product: "Robo Assistant X",
    description: "A fully autonomous AI-powered helper robot.",
    price: 499.99,
    features: ["Voice Control", "Self-Charging", "Pet-Friendly"],
  };
  const productInfoString = JSON.stringify(productInfo);

  if (redis) {
    try {
      await redis.setex(cacheKey, 3600, productInfoString); // Cache for 1 hour
      console.log('Product info stored in Valkey cache:', productInfoString);
    } catch (err) {
      console.error('Error storing in Valkey:', err);
    }
  }

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: productInfoString,
  };
};
