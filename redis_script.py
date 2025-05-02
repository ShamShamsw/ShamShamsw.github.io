import redis
import random
import faker
import json


# Replace with your actual EC2 public DNS or IP
HOST = "34.219.253.200"
PORT = 6379

r = redis.Redis(host=HOST, port=PORT, decode_responses=True)

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
# for i in range(10):
#     order_id = f"order:{i}"
#     order_data = {
#         "Customer ID": fake.uuid4(),
#         "Product 1 ID": f"prod-{random.randint(1000, 9999)}",
#         "Quantity 1": random.randint(1, 20)
#     }
#     r.set(order_id, json.dumps(order_data))

# # Retrieve and print the stored orders
# for i in range(10):
#     order_id = f"order:{i}"
#     data = r.get(order_id)
#     print(f"{order_id}: {data}")
