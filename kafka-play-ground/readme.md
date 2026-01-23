# kafka-play-ground

### Start Zookeper Container and expose PORT 2181. in cmd
    ```
    docker run -p 2181:2181 zookeeper 
    ```
   also can be run in detatched mode

### Start Kafka Container, expose PORT 9092 and setup ENV variables. in cmd
   ```
     docker run -p 9092:9092 -e KAFKA_ZOOKEEPER_CONNECT=<your_ip>:2181 -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://192.168.0.107:9092 -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 
     confluentinc/cp-kafka
   ```

### Explanation of the Command:

-p 9092:9092: Maps Kafka's port 9092 inside the container to port 9092 on the host machine.
-e KAFKA_ZOOKEEPER_CONNECT=<PRIVATE_IP>:2181: Sets the Zookeeper connection string.
-e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://<PRIVATE_IP>:9092: Specifies the Kafka listener address.
-e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1: Sets the replication factor for the Kafka offsets topic to 1 (single-node setup).
confluentinc/cp-kafka: The Docker image for Kafka from Confluent.

## setup a new node js project 

  ```
  npm init
  ```
### install all dependencies(kafkajs)
  ```
  npm install kafkajs
  ```

       or
### clone the repository 
   ```
   git clone  https://github.com/Ganesh01110/kafka-play-ground.git
   ```

### Run Multiple Consumers
   ```
   node consumer.js <GROUP_NAME>
   ```
   eg :- ```
   node consumer.js user-1
   ```  or 
   ```
   node consumer.js user-2
   ```

### Create Producer
   ```
   node producer.js
   ```

### give input to producer
    > ```
      abc south
      ```
    > ```
       xyz north
      ```

## other commands for docker
    -Start the Kafka container again:
    ---- ```
           docker start <kafka_container id>
         ```
    -list all running container
   ---- ```
        docker ps
        ```
    -Make sure you're inside the Kafka container: Run:
    ----```
        docker exec -it <kafka_container id>/bin/bash
        ```
    -Check Docker Status:
    ----```
        docker inspect <kafka_container id>
        ```

