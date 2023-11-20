const express = require("express");
const router = express.Router();
const Request = require("../models/request"); // Assuming your model file is in a 'models' directory

// Route to add a request
router.post("/add", async (req, res) => {
  try {
    const newRequest = new Request({
      motherId: req.body.motherId,
      name: req.body.name,
      date: req.body.date,
      purpose: req.body.purpose,
      childBirth: req.body.childBirth,
      phone: req.body.phone,
      amount: req.body.amount,
      childName: req.body.childName,
      childAge: req.body.childAge,
    });

    const savedRequest = await newRequest.save();
    res.status(201).json({ message: "Request added successfully" });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Route to approve a request (toggle approval status)
router.put("/approve/:requestId", async (req, res) => {
  try {
    const requestId = req.params.requestId;
    const request = await Request.findById(requestId);

    if (!request) {
      return res.status(404).send("Request not found");
    }

    request.approved = true; // Toggle approval status
    const updatedRequest = await request.save();
    res.json(updatedRequest); // Respond with the updated request
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Route to approve a request (toggle approval status)
router.put("/reject/:requestId", async (req, res) => {
  try {
    const requestId = req.params.requestId;
    const request = await Request.findById(requestId);

    if (!request) {
      return res.status(404).send("Request not found");
    }

    request.approved = false; // Toggle approval status
    const updatedRequest = await request.save();
    res.json(updatedRequest); // Respond with the updated request
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const allRequests = await Request.find();
    res.json(allRequests);
  } catch (err) {
    res.status(500).send("Error fetching requests");
  }
});

module.exports = router;
