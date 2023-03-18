const jwt = require("jsonwebtoken");
import { User } from "./models";

// Define a middleware for authenticating requests
const authenticate = (req: any, res: any, next: any) => {
  // Get the JWT from the Authorization header
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Missing authentication token" });
  }

  try {
    // Verify the JWT and get the user ID from the payload
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user with the given ID
    const user = User.findOne({ where: { id } });

    if (!user) {
      return res.status(401).json({ error: "Invalid authentication token" });
    }

    // Attach the user
    req.user = user;
    next();
  } catch (error) {
    console.error("Error authenticating user:", error);
    res.status(500).json({ error: "Unable to authenticate user" });
  }
};

export { authenticate };
