const client = require('./client')

// similar to fast moving data altt to kafkka  in redis -stream
// https://redis.io/docs/latest/develop/data-types/streams/



async function init() {
    try {
        // Add entry for Castilla
        const res1 = await client.xadd(
            'race:france', '*', 
            'rider', 'Castilla', 
            'speed', '30.2', 
            'position', '1', 
            'location_id', '1'
        );
        console.log(res1);
         // Prints the generated ID
        // return timestamp

        // Add entry for Norem
        const res2 = await client.xadd(
            'race:france', '*', 
            'rider', 'Norem', 
            'speed', '28.8', 
            'position', '3', 
            'location_id', '1'
        );
        console.log(res2);
        // return timestamp

        // Add entry for Prickett
        const res3 = await client.xadd(
            'race:france', '*', 
            'rider', 'Prickett', 
            'speed', '29.7', 
            'position', '2', 
            'location_id', '1'
        );
        console.log(res3);

        // return timestamp
    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.quit(); // Always close the connection
    }
}

init();