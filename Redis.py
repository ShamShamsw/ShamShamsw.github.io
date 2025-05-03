curl -0 https://bootstrap.pypa.io/get-pip.py
python3 get-pip.py --user

pip install redis

```python
import redis

# elasticache redis connection with removed port and password
cache = redis.StrictRedis(host='myredis-nkzchk.serverless.usw2.cache.amazonaws.com', port=6379, db=0)

# Store a value in Redis
cache.set('my-cached-key', 'my-cached-value')

# Retrieve the value from Redis
value = cache.get('my-cached-key')

# Decode the value if necessary
decoded_value = value.decode('utf-8')
print(decoded_value)  # Output: my-cached-value
```

# nano testfile.py