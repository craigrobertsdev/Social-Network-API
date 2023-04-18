const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { getRandomName, getRandomThoughts, getRandomReactions } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  // Drop existing courses
  await User.deleteMany({});

  // Drop existing students
  await Thought.deleteMany({});

  // Create empty array to hold the students
  const users = [];

  // Loop 3 times -- add users to the users array
  for (let i = 0; i < 3; i++) {
    // Get some random assignment objects using a helper function that we imported from ./data
    const username = getRandomName();
    const email = `${username}@email.com`;
    const thoughts = getRandomThoughts(3);

    for (let i = 0; i < thoughts.length; i++) {
      thoughts.push(...getRandomReactions(3));
    }

    users.push({
      username,
      email,
      thoughts,
    });
  }

  // Add students to the collection and await the results
  await User.collection.insertMany(users);

  // Add courses to the collection and await the results
  await Course.collection.insertOne({
    courseName: "UCLA",
    inPerson: false,
    students: [...students],
  });

  // Log out the seed data to indicate what should appear in the database
  console.table(students);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
