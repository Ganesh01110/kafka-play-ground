const { Redis } = require('ioredis');

const client=new Redis();
//bydefault hits the port

module.exports = client;