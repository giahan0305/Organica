const mongoose = require("mongoose");
function MultipleMongooseObject(mongooses) {
  return mongooses.map((mongoose) => mongoose.toObject());
}
function SingleMongooseObject(mongoose) {
  return mongoose ? mongoose.toObject() : mongoose;
}
module.exports = { MultipleMongooseObject, SingleMongooseObject };