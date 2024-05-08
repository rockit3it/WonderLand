const Listing = require("../models/listing.js");
const initData = require("./data.js");
const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/haweli";
main().
then(()=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log(err);
})
async function main() {
  await mongoose.connect(MONGO_URL);
}

let initDb = async()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) =>({...obj, owner : "660e85cf6e9d3493e1ef086a"}));
    await Listing.insertMany(initData.data);
    console.log("data base is intitialised");
}

initDb();