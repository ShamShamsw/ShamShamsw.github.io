import redis
import random
import faker
import json

# Connect to Redis server (no password)
r = redis.Redis(
    host='34.219.253.200.amazonaws.com',  # Replace with your actual Redis IP
    port=6379,
    decode_responses=True
)

# Test connection
try:
    pong = r.ping()
    print("Connected to Redis:", pong)
    
    # Set and get a key
    r.set("message", "Hello from Python")
    value = r.get("message")
    print("Stored value:", value)

except redis.ConnectionError as e:
    print("Redis connection error:", e)

# Initialize Faker for synthetic customer IDs
fake = faker.Faker()

# Generate and store 10 fake order records
for i in range(1000):
    order_id = f"order:{i}"
    order_data = {
        "Customer ID": fake.uuid4(),
        "Product 1 ID": f"prod-{random.randint(1000, 9999)}",
        "Quantity 1": random.randint(1, 20)
    }
    r.set(order_id, json.dumps(order_data))

# Retrieve and print the stored orders
for i in range(1000):
    order_id = f"order:{i}"
    data = r.get(order_id)
    print(f"{order_id}: {data}")
