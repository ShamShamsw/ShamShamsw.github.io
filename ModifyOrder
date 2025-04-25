exports.handler = async (event) => {
  const body = JSON.parse(event.body);

  console.log("Modifying order:", body);

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: "Order modified successfully" })
  };
};
