exports.handler = async (event) => {
  const body = JSON.parse(event.body);

  // This is where you'd write to DynamoDB or store order data
  console.log("Order received:", body);

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: "Order received!" })
  };
};
