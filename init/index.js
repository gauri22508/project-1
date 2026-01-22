if(process.env.NODE_ENV !== "production"){
 require('dotenv').config({ path: '../.env' });
}

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const DB_URL = process.env.ATLASDB_URL;


main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(DB_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
 initData.data= initData.data.map((obj)=>({...obj, owner : "6960d3d472d1681216f7a476"}));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();
