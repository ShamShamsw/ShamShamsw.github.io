exports.handler = async (event) => {
  const { email } = event.queryStringParameters || {};

  // In a real app, you'd query DynamoDB here
  console.log("Fetching order for:", email);

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      product: "Robo Assistant X",
      quantity: 2,
      status: "Shipped"
    })
  };
};
