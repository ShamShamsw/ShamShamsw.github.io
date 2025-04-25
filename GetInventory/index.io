exports.handler = async (event) => {
  console.log("Fetching current inventory");

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      product: "Robo Assistant X",
      inventory: 42
    })
  };
};
