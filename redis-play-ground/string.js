const client = require('./client')

async function init(){
    const result = await client.get("GANESH:wife");
    // const messagetoset = await client.set("GANESH:qualification" , "bsc physics and mca");
    //const result2 = await client.get("GANESH:qualification");
    await client.expire("GANESH:qualification",20)
    const result3= await client.get("GANESH:qualification");
    //console.log(":Result ->",result , "    :Result2 ->",result2);
    console.log(result3);
}

init();
