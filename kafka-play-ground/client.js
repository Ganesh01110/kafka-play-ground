const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "my-kafka-app",
  brokers: ["192.168.0.107:9092"],
});

module.exports = { kafka };