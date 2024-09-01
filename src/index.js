const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config/config");
let server;

mongoose.connect(config.mongoose.url).then(()=>console.log(`connected to db at ${config.mongoose.url}`))
.catch((e)=>console.log(`failed to connect to DB ${e}`))

// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Create Mongo connection and get the express app to listen on config.port
app.listen(config.port, () => {
    console.log("Server Listening at", config.port);
});
