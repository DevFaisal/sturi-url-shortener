import mongoose from "mongoose";

async function connectToDatabase() {
  const uri = process.env.MONGODB_URI;
  const connection = await mongoose
    .connect(uri)
    .then(() => {
      console.log("Database Connected");
    })
    .catch((error) => {
      console.log(error);
    });
  // console.log(connection);
}

export default connectToDatabase;

// import mongoose from "mongoose";

// const DATABASE_URL = process.env.MONGODB_URI;

// if (!DATABASE_URL) {
//   throw new Error(
//     "Please define the DATABASE_URL environment variable inside .env.local"
//   );
// }

// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// async function connectToDatabase() {
//   if (cached.conn) {
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     const opts = {
//       bufferCommands: false,
//     };

//     cached.promise = mongoose.connect(DATABASE_URL, opts).then((mongoose) => {
//       return mongoose;
//     });
//   }
//   cached.conn = await cached.promise;
//   return cached.conn;
// }

// export default connectToDatabase;
