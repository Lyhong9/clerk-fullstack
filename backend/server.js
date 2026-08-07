const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { clerkMiddleware } = require("@clerk/express");

dotenv.config();

const routes = require("./routes/index");
console.log(routes);

const app = express();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

app.use(routes);

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.get("/", (req, res) => {
  res.json({
    message: "Backend Root Works",
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
