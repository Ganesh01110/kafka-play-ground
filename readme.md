Start Zookeper Container and expose PORT 2181. in cmd
``` docker run -p 2181:2181 zookeeper ```

Start Kafka Container, expose PORT 9092 and setup ENV variables. in cmd
```
 docker run -p 9092:9092 -e KAFKA_ZOOKEEPER_CONNECT=<your_ip>:2181 -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://192.168.0.107:9092 -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 confluentinc/cp-kafka
```

Run Multiple Consumers
```node consumer.js <GROUP_NAME>```
eg :- ```node consumer.js user-1``` or ```node consumer.js user-2```

Create Producer
```node producer.js```

give input to producer
> ``` abc south ```
> ``` xyz north ```