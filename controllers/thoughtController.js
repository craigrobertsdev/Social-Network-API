const { Thought, User } = require("../models");

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thought = await Thought.find().select("-__v").populate("reactions");
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId }).select("-__v");

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const userToUpdate = await User.findOneAndUpdate(
        { username: req.body.username },
        { $addToSet: { thoughts: thought._id } }
      );

      res.status(200).json({ thought, userToUpdate });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  // Update a thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: "No thought with this id!" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!thought) {
        res.status(404).json({ message: "No thought with that ID" });
      }

      res.json({ message: "Thought deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Create a reaction and add it to the associated thought
  async createReaction(req, res) {
    try {
      const thought = await Thought.findById({ _id: req.params.thoughtId });

      if (!thought) {
        res.status(404).json({ message: "No thought with that ID" });
        return;
      }

      thought.reactions.addToSet(req.body);
      await thought.save();

      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete reaction from thought
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        {
          $pull: { reactions: { reactionId: req.params.reactionId } },
        },
        { new: true }
      );

      if (!thought) {
        res.status(404).json({ message: "No thought with that ID" });
        return;
      }

      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
