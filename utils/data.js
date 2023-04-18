const names = [
  "Aaran",
  "Aaren",
  "Aarez",
  "Aarman",
  "Aaron",
  "Aaron-James",
  "Aarron",
  "Aaryan",
  "Aaryn",
  "Aayan",
  "Aazaan",
  "Abaan",
  "Abbas",
  "Abdallah",
  "Abdalroof",
  "Abdihakim",
  "Abdirahman",
  "Abdisalam",
  "Abdul",
  "Abdul-Aziz",
  "Abdulbasir",
  "Abdulkadir",
  "Abdulkarem",
  "Smith",
  "Jones",
  "Coollastname",
  "enter_name_here",
  "Ze",
  "Zechariah",
  "Zeek",
  "Zeeshan",
  "Zeid",
  "Zein",
  "Zen",
  "Zendel",
  "Zenith",
  "Zennon",
  "Zeph",
  "Zerah",
  "Zhen",
  "Zhi",
  "Zhong",
  "Zhuo",
  "Zi",
  "Zidane",
  "Zijie",
  "Zinedine",
  "Zion",
  "Zishan",
  "Ziya",
  "Ziyaan",
  "Zohaib",
  "Zohair",
  "Zoubaeir",
  "Zubair",
  "Zubayr",
  "Zuriel",
  "Xander",
  "Jared",
  "Courtney",
  "Gillian",
  "Clark",
  "Jared",
  "Grace",
  "Kelsey",
  "Tamar",
  "Alex",
  "Mark",
  "Tamar",
  "Farish",
  "Sarah",
  "Nathaniel",
  "Parker",
];

const thoughts = [
  "JavaScript is fun...",
  "I love learning new things",
  "Would rather be coding",
  "I can't wait to use TypeScript",
  "Better ask ChatGPT",
  "Which is better - Windows, Mac or Linux?",
  "I'm runnning out of ideas for random thoughts",
  "Got even less ideas now",
  "Completely out of thoughts to think",
];

const reactions = [
  "I agree",
  "Did you really think that through?",
  "Have you tried googling it?",
  "RTFM",
  "I disagree",
];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random full name
const getRandomName = () => `${getRandomArrItem(names)} ${getRandomArrItem(names)}`;

// Gets n random thoughts
const getRandomThoughts = (n) => {
  const randomThoughts = [];
  for (let i = 0; i < n; i++) {
    randomThoughts.push(getRandomArrItem(thoughts));
  }

  return randomThoughts;
};

// Gets n random reactions
const getRandomReactions = (n) => {
  const randomReactions = [];
  for (let i = 0; i < n; i++) {
    randomReactions.push(getRandomArrItem(reactions));
  }
};

// Export the functions for use in seed.js
module.exports = { getRandomName, getRandomThoughts, getRandomReactions };
