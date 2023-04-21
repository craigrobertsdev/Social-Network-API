const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

module.exports = {
  // Get all user
  async getUsers(req, res) {
    try {
      const users = await User.find();

      res.status(200).json(users);
    } catch (err) {
      return res.status(500).json(err.message);
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

      res.json({
        user,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json(err.message);
    }
  },

  // create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err.message);
    }
  },

  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true });

      if (!user) {
        return res.status(404).json({ message: "No such user exists" });
      }

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err.message);
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

  async addFriend(req, res) {
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
  },
  async deleteFriend(req, res) {
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
  },
};
