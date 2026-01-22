if(process.env.NODE_ENV !== "production"){
  require('dotenv').config({ path: '../.env' });
}

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");
const bcrypt = require('bcrypt'); 

const DB_URL = process.env.ATLASDB_URL;

main()
  .then(() => {
    console.log("connected to DB");
    initDB(); 
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(DB_URL);
}

const initDB = async () => {
  // Dummy user 
  let dummyUser = await User.findOne({ username: 'dummyowner' });
  if (!dummyUser) {
    dummyUser = new User({
      username: 'dummyowner',
      email: 'dummy@example.com',
      password: bcrypt.hashSync('dummy123', 10)  
    });
    await dummyUser.save();
    console.log('Dummy user created');
  }

  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({ ...obj, owner: dummyUser._id }));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};