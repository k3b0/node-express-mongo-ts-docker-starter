import mongoose from "mongoose";

export const startDb = async (callback: Function) => {
    mongoose.connect(
        `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@mongodb:27017/course-goals?authSource=admin`,
        {},
        (err) => {
          if (err) {
            console.error('FAILED TO CONNECT TO MONGODB');
            console.error(err);
          } else {
            console.log('CONNECTED TO MONGODB');
            callback()
          }
        }
      );
}