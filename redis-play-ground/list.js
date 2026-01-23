const client = require("./client");

async function init(){
    await client.lpush("message",1);
    await client.lpush("message",2);
    await client.lpush("message",3);
    await client.lpush("message",4);
    await client.lpush("message",5);

    const result = await client.blpop("message",40);
    console.log(result); 

}

init();
