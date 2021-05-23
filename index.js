const app = require("./app");

const PORT = process.env.PORT || 9999;
const MONGO_URL =
  process.env.MONGO_URL ||
  "mongodb+srv://user:1234@cluster0.p5kbe.gcp.mongodb.net/mydatabase?retryWrites=true&w=majority";

app.start(PORT, MONGO_URL);
