const mongoose = require("mongoose");
const express = require("express");
const helmet = require("helmet");

const userRouter = require("./routes/user");
const { MONGO_URI } = require("./secrets");
const { PORT } = require("./constants");

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    const app = express();

    app.use(helmet());

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.get("/", (req, res) => {
      res.send("Hello World!");
    });

    app.use(userRouter);

    app.listen(PORT, () => {
      console.log(`Server is running on PORT ${PORT}...`);
    });
  })
  .catch(console.error);
