const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");
const formatDate = require("../utils/helpers");

// Schema to create a course model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: formatDate,
    },
    username: {
      type: String,
      required: true,
    },
    reations: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

thoughtSchema.virtual("reactionCount").get(() => reactions.length);

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
