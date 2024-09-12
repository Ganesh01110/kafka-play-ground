const { kafka } = require("./client");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function init() {
  const producer = kafka.producer();

  try {
    console.log("Connecting Producer...");
    await producer.connect();
    console.log("Producer Connected Successfully");

    rl.setPrompt("> ");
    rl.prompt();

    rl.on("line", async function (line) {
      try {
        const [riderName, location] = line.split(" ");
        await producer.send({
          topic: "rider-updates",
          messages: [
            {
              partition: location.toLowerCase() === "north" ? 0 : 1,
              key: "location-update",
              value: JSON.stringify({ name: riderName, location: location }),
            },
          ],
        });
        console.log(`Message sent: ${riderName} - ${location}`);
      } catch (err) {
        console.error("Error sending message:", err);
      }
      rl.prompt();
    }).on("close", async () => {
      await producer.disconnect();
      console.log("Producer Disconnected.");
    });

  } catch (err) {
    console.error("Error connecting producer:", err);
  }
}

init();
