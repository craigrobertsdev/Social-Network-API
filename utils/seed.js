const connection = require("../config/connection");
const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");
const { getRandomName, getRandomThought, getRandomReaction } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  // Drop existing courses
  await User.deleteMany({});

  // Drop existing students
  await Thought.deleteMany({});

  // Create empty arrays to hold the new document objects
  const users = [];
  const thoughts = [];

  // Loop 3 times -- add users to the users array
  for (let i = 0; i < 3; i++) {
    // Get some random assignment objects using a helper function that we imported from ./data
    const username = getRandomName();
    const email = `${username.split(" ").join("")}@email.com`;

    users.push({
      username,
      email,
      thoughts: [],
      friends: [],
    });

    for (let k = 0; k < 3; k++) {
      const objId = new ObjectId();
      const thought = {
        _id: objId,
        thoughtText: getRandomThought(),
        username: users[i].username,
        reactions: [],
      };

      // link this thought to user document
      users[i].thoughts.push(objId);

      thoughts.push(thought);
    }
  }

  // Add users to the collection and await the results
  await User.collection.insertMany(users);
  await Thought.collection.insertMany(thoughts);

  const thoughtsToUpdate = await Thought.find({});
  const thoughtsToSave = [];
  for (const thought of thoughtsToUpdate) {
    for (let i = 0; i < 3; i++) {
      thought.reactions.push({
        reactionBody: getRandomReaction(),
        username: thought.username,
      });
    }
    thoughtsToSave.push(thought.save());
  }

  await Promise.all(thoughtsToSave);

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
