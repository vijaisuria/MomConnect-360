const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const requestRoutes = require("./routes/request");

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/maternal-health", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Define Schema
const registrationSchema = new mongoose.Schema({
  name: String,
  role: String,
  dob: Date,
  email: String,
  address: String,
  phone: Number,
  password: String,
});

const Registration = mongoose.model("Registration", registrationSchema);

// Routes
app.post("/register", (req, res) => {
  const newRegistration = new Registration({
    name: req.body.name,
    role: req.body.role,
    dob: req.body.dob,
    email: req.body.email,
    address: req.body.address,
    phone: req.body.phone,
    password: req.body.password,
  });

  console.log(newRegistration);

  newRegistration
    .save()
    .then((registration) => res.status(200).json(req.body))
    .catch((err) => res.status(400).send("Error: " + err));
});

//add a logic to check if the user exists in the database
//if user exists, send the user details
//else send error message
app.post("/login", (req, res) => {
  const { email, role, password } = req.body;

  Registration.findOne({ email, role })
    .then((user) => {
      if (!user) {
        res.status(400).json({ msg: "User not found" });
      } else {
        if (password === user.password) {
          // Send a response to the client indicating where to redirect
          let redirectURL;
          if (user.role === "healthcare") {
            redirectURL = "/doctor";
          } else if (user.role === "mother") {
            redirectURL = "/mother";
          } else if (user.role === "financial") {
            redirectURL = "/finance";
          } else if (user.role === "education") {
            redirectURL = "/education";
          } else {
            redirectURL = "/admin";
          }
          res
            .status(200)
            .json({ redirect: redirectURL, id: user._id, role: user.role });
        } else {
          res.status(400).json({ msg: "Wrong password" });
        }
      }
    })
    .catch((err) => res.status(400).send("Error: " + err));
});

app.get("/finance", (req, res) => {
  Registration.find({ role: "financial" })
    .then((users) => res.send(users))
    .catch((err) => res.status(400).send("Error: " + err));
});

app.get("/mother", (req, res) => {
  Registration.find({ role: "mother" })
    .then((users) => res.send(users))
    .catch((err) => res.status(400).send("Error: " + err));
});

app.get("/:id", (req, res) => {
  const id = req.params.id;
  Registration.findById(id)
    .then((users) => res.send(users))
    .catch((err) => res.status(400).send("Error: " + err));
});

app.use("/api/requests", requestRoutes);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
