exports.handler = async (event) => {
  console.log("Getting product info");

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      product: "Robo Assistant X",
      description: "A fully autonomous AI-powered helper robot.",
      price: 499.99,
      features: ["Voice Control", "Self-Charging", "Pet-Friendly"]
    })
  };
};
