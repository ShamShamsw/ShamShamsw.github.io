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
  const cacheKey = `inventory:Robo Assistant X`; // Specific key for the product

  if (redis) {
    try {
      const cachedInventory = await redis.get(cacheKey);
      if (cachedInventory) {
        console.log('Inventory retrieved from Valkey cache:', cachedInventory);
        return {
          statusCode: 200,
          headers: { "Content-Type": "application/json" },
          body: cachedInventory,
        };
      }
    } catch (err) {
      console.error('Error retrieving from Valkey:', err);
      // Continue to fetch from the primary source on cache error
    }
  }

  console.log("Fetching current inventory");
  const inventoryData = {
    product: "Robo Assistant X",
    inventory: 42,
  };
  const inventoryDataString = JSON.stringify(inventoryData);

  if (redis) {
    try {
      await redis.setex(cacheKey, 30, inventoryDataString); // Cache for 30 seconds
      console.log('Inventory stored in Valkey cache:', inventoryDataString);
    } catch (err) {
      console.error('Error storing in Valkey:', err);
    }
  }

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: inventoryDataString,
  };
};
