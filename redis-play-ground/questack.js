const client = require('./client')

async function init(){
    await client.lpush("messages", "hii");
    await client.lpush("messages", "from");
    await client.lpush("messages", "node");
    await client.lpush("messages", "with_redis");

    console.log("done with left push...");
    // with_redis->0 , node->1  , from->2 , hii-> 3 is the order now
    //lrange messages 0 -1 -> all data print
    // lrange messages 0 1
    // lrange messages 0 3
    // lrange messages 2 3

    // pattern-> KEYS user:* or KEYS messages:*
}

init();