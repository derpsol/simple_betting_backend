const mongoose = require("mongoose");

const RandomSchema = new mongoose.Schema({
  randomNumber1: {
    type: Number,
    required: true,
  },
  randomNumber2: {
    type: Number,
    required: true,
  },
  roomnum: {
    type: Number,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

RandomSchema.method({});

RandomSchema.statics = {
  async get(id) {
    const book = await this.findById(id).populate("owner").exec();
    if (!book) {
      throw new APIError("No such room exists!", httpStatus.NOT_FOUND);
    }
    return book;
  },

  list() {
    return this.find().populate("owner").exec();
  },

  listLazy({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("owner")
      .exec();
  },
};

module.exports = mongoose.model("Random", RandomSchema);
