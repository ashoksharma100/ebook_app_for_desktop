const videopathz = "resources/videos/";
const videoextension = "ogv";
const VIDEO_SCALE = {
  WIDTH: 320,
  HEIGHT: 240
}
var MASTER_DATA = [
  {
    "id": "1",
    "word": "special",
    "meaning": "nice and different",
    "usage": "Ria is my special friend."
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  },
   {
    "id": "2",
    "word": "dinner",
    "meaning": "food that you eat at night before sleeping",
    "usage": "My sister has dinner at 8 pm."
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  },
   {
    "id": "3",
    "word": "family",
    "meaning": "people who live together in the same house",
    "usage": "Pranav is going to meet his family."
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  },
   {
    "id": "4",
    "word": "forest",
    "meaning": "jungle",
    "usage": "There are many trees in the forest."
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  }, {
    "id": "5",
    "word": "roared",
    "meaning": "made a loud noise",
    "usage": "The lion roared and saved its cub."
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  }, {
    "id": "6",
    "word": "annoyed",
    "meaning": "angry",
    "usage": "Anisha was annoyed with her brother."
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  }, {
    "id": "7",
    "word": "frightened",
    "meaning": "made (someone) afraid",
    "usage": "The dog frightened the little cat."
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  }, {
    "id": "8",
    "word": "hunter",
    "meaning": "someone who catches and kills animals",
    "usage": "A hunter was running after the deer."
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  }, {
    "id": "9",
    "word": "kept my promise",
    "meaning": "I did what I said",
    "usage": "My father kept his promise by buying me the toy."
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  }, {
    "id": "10",
    "word": "scampers",
    "meaning": "moves quickly with short steps",
    "usage": "The rat scampers silently."
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  }, {
    "id": "11",
    "word": "furly",
    "meaning": "having fur",
    "usage": "This dog is furly."
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  }, {
    "id": "12",
    "word": "broad",
    "meaning": "wide",
    "usage": "Sara had a broad smile on her face."
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  }, {
    "id": "13",
    "word": "supper",
    "meaning": "evening meal",
    "usage": "Do you eat supper before dinner?"
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  }, {
    "id": "14",
    "word": "shell",
    "meaning": "the covering of a nut or an egg;",
    "usage": "The shell of a coconut is hard."
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  }, {
    "id": "15",
    "word": "beach",
    "meaning": "the sand near the sea",
    "usage": "I played with my friends at the beach."
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  }, {
    "id": "16",
    "word": "sandcastles",
    "meaning": "castles made of sand",
    "usage": "Hari made sandcastles with Mary."
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  }, {
    "id": "17",
    "word": "sunglasses",
    "meaning": "dark spectacles that you wear to save your eyes from the bright sunlight",
    "usage": "Arbaz wears sunglasses when he goes out in the sun."
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  }, {
    "id": "18",
    "word": "dug",
    "meaning": "made a hole",
    "usage": "The rat dug a hole in the sand."
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  }, {
    "id": "19",
    "word": "jumped with joy",
    "meaning": "was happy",
    "usage": "I jumped with joy to see my friend."
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  }, {
    "id": "20",
    "word": "raincoat",
    "meaning": "a coat we wear to stay dry when it rains",
    "usage": "Tina has a blue raincoat."
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  }, {
    "id": "21",
    "word": "carries",
    "meaning": "takes",
    "usage": "Asif carries the boxes to the attic."
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  }, {
    "id": "22",
    "word": "lightning",
    "meaning": "very bright light in the sky when it rains",
    "usage": "There was a flash of lightning in the sky. "
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  }, {
    "id": "23",
    "word": "thunders",
    "meaning": "loud sounds that we hear from the sky when it rains",
    "usage": "The baby cried hearing the thunders."
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  }, {
    "id": "24",
    "word": "different",
    "meaning": "not same",
    "usage": "I am different from my friend."
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  }, {
    "id": "25",
    "word": "idea",
    "meaning": "a plan",
    "usage": "The boy got an idea for the project."
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  }, {
    "id": "26",
    "word": "goose",
    "meaning": "a bird that looks like a big duck with a long neck",
    "usage": "Mother goose took the baby to the river."
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  }, {
    "id": "27",
    "word": "wild",
    "meaning": "animals that are found in the jungle",
    "usage": "Wild animals live in the forest."
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  }, {
    "id": "28",
    "word": "excited",
    "meaning": "very happy",
    "usage": "Rashi is excited for her birthday."
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  }, {
    "id": "29",
    "word": "aims",
    "meaning": "points towards something",
    "usage": "The baby aims at the mother."
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  }, {
    "id": "30",
    "word": "stew",
    "meaning": "meat cooked in a pot of water",
    "usage": "Grandfather put the stew in the bowl."
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  }, {
    "id": "31",
    "word": "roast",
    "meaning": "meat cooked over fire",
    "usage": "Shazia ate the roast in the evening."
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  }, {
    "id": "32",
    "word": "outing",
    "meaning": "going out to some place for fun",
    "usage": "My parents went for an outing."
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  }, {
    "id": "33",
    "word": "gardener",
    "meaning": "a person who takes care of the plants in a garden",
    "usage": "A gardener is taking care of the plants."
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  }, {
    "id": "34",
    "word": "watering",
    "meaning": "giving water to plants",
    "usage": "Rosa and her brother are watering the plants."
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  }, {
    "id": "35",
    "word": "wonderful",
    "meaning": "very good",
    "usage": "Raman got a wonderful gift."
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  }, {
    "id": "36",
    "word": "morn",
    "meaning": "morning",
    "usage": "I will meet you at the lake in the morn."
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  }, {
    "id": "37",
    "word": "thro'",
    "meaning": "(here) full",
    "usage": "The man played the piano all thro' the day."
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  }, {
    "id": "38",
    "word": "in wonder",
    "meaning": "with joy",
    "usage": "Jerry shouted in wonder."
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  }, {
    "id": "39",
    "word": "delighted",
    "meaning": "very happy",
    "usage": "I was delighted to see my new dress."
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  }, {
    "id": "40",
    "word": "huffing and puffing",
    "meaning": "breathing noisily because you are very tired",
    "usage": "Romi was huffing and puffing after the race."
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  }, {
    "id": "41",
    "word": "heavily",
    "meaning": "with a lot of force",
    "usage": "It rained heavily last evening."
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  }, {
    "id": "42",
    "word": "strengths",
    "meaning": "things we are good at",
    "usage": "Drawing and painting are my strengths."
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  }, {
    "id": "43",
    "word": "trunk",
    "meaning": "the long nose of an elephant",
    "usage": "The elephant had a long trunk."
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  }, {
    "id": "44",
    "word": "pleasant",
    "meaning": "nice",
    "usage": "It is a pleasant morning."
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  }, {
    "id": "45",
    "word": "trotted",
    "meaning": "ran",
    "usage": "The horse trotted behind the man."
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  },{
    "id": "47",
    "word": "honest",
    "meaning": "one who always tells the truth",
    "usage": "Maya is an honest girl."
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  }, {
    "id": "48",
    "word": "youth",
    "meaning": "one who is young",
    "usage": "The old man looked thin in his youth."
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  }, {
    "id": "49",
    "word": "plans",
    "meaning": "a list of things that you will do",
    "usage": "The teacher has made plans for tomorrow."
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  }, {
    "id": "50",
    "word": "welcomed",
    "meaning": "said hello",
    "usage": "Keshav welcomed the man with a smile."
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  }, {
    "id": "51",
    "word": "guides",
    "meaning": "those who help people know about a place",
    "usage": "The guides came with us to the temple. "
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  }, {
    "id": "52",
    "word": "rosy",
    "meaning": "pink and nice",
    "usage": "Rashid's cheeks become rosy in winters."
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  }, {
    "id": "53",
    "word": "honk",
    "meaning": "the sound of horns",
    "usage": "The drivers honk the horns loudly."
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  }, {
    "id": "54",
    "word": "zebra crossing",
    "meaning": "black and white lines drawn on a road where cars, buses, rickshaws, etc. must stop to let people pass",
    "usage": "We cross the road at the zebra crossing."
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  }, {
    "id": "55",
    "word": "peaks",
    "meaning": "the top of mountains",
    "usage": "The girl saw the peaks of the mountains."
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  }, {
    "id": "56",
    "word": "forts",
    "meaning": "old buildings",
    "usage": "My father likes to visit forts."
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  }, {
    "id": "57",
    "word": "stupas",
    "meaning": "a building where Buddhists go to pray",
    "usage": "All the children were silent at the stupas."
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  }, {
    "id": "58",
    "word": "careless",
    "meaning": "does not do things nicely",
    "usage": "Dev becomes careless while doing maths."
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  }, {
    "id": "59",
    "word": "wagging",
    "meaning": "moving from side to side",
    "usage": "My dog is wagging its tail."
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  }, {
    "id": "60",
    "word": "flopping",
    "meaning": "(here) falling down",
    "usage": "The tired men were flopping down on the armchairs."
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  }, {
    "id": "61",
    "word": "wondered",
    "meaning": "thought about something",
    "usage": "Shalu wondered about the party."
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  }, {
    "id": "62",
    "word": "pretty",
    "meaning": "beautiful",
    "usage": "Garima has a pretty coat."
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  }, {
    "id": "63",
    "word": "fetched",
    "meaning": "brought",
    "usage": "The dog fetched the ball from the bushes."
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  }, {
    "id": "64",
    "word": "frozen",
    "meaning": "very cold",
    "usage": "My hands are frozen."
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  }, {
    "id": "65",
    "word": "ocean",
    "meaning": "a very large sea with salty water",
    "usage": "The whales live in the ocean."
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  }, {
    "id": "66",
    "word": "bones",
    "meaning": "hard parts inside your body",
    "usage": "Bimal broke his bones when he fell down."
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  }, {
    "id": "67",
    "word": "kittens",
    "meaning": "young ones of a cat",
    "usage": "The black kittens live near my house."
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  }, {
    "id": "68",
    "word": "healthy",
    "meaning": "fit",
    "usage": "Drinking milk keeps us healthy."
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  }, {
    "id": "69",
    "word": "barnyard",
    "meaning": "a place in a farm where animals are kept",
    "usage": "The cows and horses are running in the barnyard."
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  }, {
    "id": "70",
    "word": "acorn",
    "meaning": "fruit of the oak tree",
    "usage": "Chitra is eating an acorn."
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  }, {
    "id": "71",
    "word": "rush",
    "meaning": "hurry",
    "usage": "Children rush to the bus stop after school."
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  }, {
    "id": "72",
    "word": "shortcut",
    "meaning": "the shortest way to a place",
    "usage": "Robin took the shortcut to school."
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  }, {
    "id": "73",
    "word": "peeped",
    "meaning": "looked inside",
    "usage": "The man peeped into the hole."
    /*"antonyms": "commenced, started",
    "synonyms": "halted",
    "description": "Meaning",
    "letter": "C",
    "resource": "image"*/
  },
  /*
  {
    "id": "74",
    "word": "twas",
    "meaning": "it was",
    "usage": "'Twas a sunny day."
    } */
    
];