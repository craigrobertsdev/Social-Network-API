const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();

      res.status(200).json(users);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select("-__v")
        .populate("thoughts", "friends");

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  // Create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Update user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true });

      if (!user) {
        return res.status(404).json({ message: "No such user exists" });
      }

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a user and their associated thoughts
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: "No such user exists" });
      }

      const thought = await Thought.deleteMany({ _id: { $in: user.thoughts } });

      if (!thought) {
        return res.status(404).json({
          message: "User deleted, but no thoughts found",
        });
      }

      res.json({ message: "User successfully deleted" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Add friend to user's friends array
  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        req.params.userId,
        {
          $addToSet: { friends: new ObjectId(req.params.friendId) },
        },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "No such user exists" });
      }

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        req.params.userId,
        {
          $pull: { friends: new ObjectId(req.params.friendId) },
        },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "No such user exists" });
      }

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
