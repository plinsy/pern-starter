const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../middleware");
const router = express.Router({ mergeParams: true });
router.use(express.json());
router.use(cors());
import { Form, Student } from "./../models";

router.post("/login", async (req: any, res: any, next: any) => {
  try {
    const { nie, accessKey } = req.body;
    const student = await Student.findOne({ where: { nie } });
    if (!student) {
      return res
        .status(400)
        .send({ message: `User with nie = ${nie} not found` });
    }
    const form = await Form.findOne({ where: { accessKey } });
    if (!form) {
      return res
        .status(400)
        .send({ message: `Form with accessKey = ${accessKey} not found` });
    }
    // Generate a JWT for the user
    const token = jwt.sign({ nie: nie }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Return the user and the JWT
    res.json({ student, token });
  } catch (err: any) {
    res.status(500).send({ message: err.message });
  }
});

module.exports = router;
