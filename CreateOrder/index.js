const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');

const orderTableName = process.env.ORDER_TABLE_NAME; //  Environment variable for the DynamoDB table name

exports.handler = async (event) => {
  console.log('Received event:', event);

  try {
    // 1. Parse the request body.  The body is already JSON, no need to parse.
    const orderData = event.body;

    // 2. Validate the order data.  Added validation for the items array
    if (!orderData.customerId || !orderData.items || !Array.isArray(orderData.items) || orderData.items.length === 0 || !orderData.total) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Invalid order data.  Missing required fields or items are invalid.' }),
      };
    }

    // 2.5 Validate the items array
     for (const item of orderData.items) {
        if (!item.productId || typeof item.quantity !== 'number' || item.quantity <= 0) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Invalid order data: Each item must have a productId and a quantity greater than zero.' }),
            };
        }
    }

    // 3. Generate a unique order ID.
    const orderId = uuid.v4();
    const createdAt = new Date().toISOString();

    // 4. Construct the order item for DynamoDB.
    const orderItem = {
      orderId: orderId,
      customerId: orderData.customerId,
      items: orderData.items,
      total: orderData.total,
      createdAt: createdAt,
    };

    // 5.  Write the order to DynamoDB.
    const params = {
      TableName: orderTableName,
      Item: orderItem,
    };

    await dynamodb.put(params).promise();  // Use .promise() for async/await

    // 6.  Construct the response.
    const response = {
      statusCode: 201, // Created
      body: JSON.stringify({
        orderId: orderId,
        customerId: orderData.customerId,
        items: orderData.items,
        total: orderData.total,
        createdAt: createdAt,
      }),
    };

    console.log('Order created successfully:', response);
    return response;

  } catch (error) {
    // 7. Handle errors.
    console.error('Error creating order:', error);
    return {
      statusCode: 500, // Internal Server Error
      body: JSON.stringify({ message: 'Failed to create order: ' + error.message }),
    };
  }
};
