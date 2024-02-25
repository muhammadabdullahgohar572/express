const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect(
  //  "mongodb+srv://muhammadabdullahgohar572:ilove1382005@cluster0.6rlsmpt.mongodb.net/?retryWrites=true&w=majority"
 `${process.env.MONGODB_URI}`
    );
    console.log("dbconected");
  } catch (error) {
 
    console.log(`${process.env.MONGODB_URI}`);
    console.log(error);
  }
};

module.exports = dbConnect;










// const mongoose = require("mongoose");

// const dbconnect = async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGODB_URI}`);
//     console.log("DB is connected  ")
//     console.log(process.env.MONGODB_URI);
//   } catch (error) {
//     console.log(error);
   
//   }
// };

// module.exports = dbconnect;