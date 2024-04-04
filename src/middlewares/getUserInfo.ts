import { Request as ExpressRequest, Response, NextFunction } from "express";
import axios from "axios";

export interface RequestWithUser extends ExpressRequest {
  user?: any;
}

// Create an object to store cached user data
const userDataCache: { [token: string]: any } = {};

const userInfo = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const bearerToken = req.headers.authorization;

  if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = bearerToken.split(" ")[1];

  // Check if user data is cached for the token
  if (userDataCache[token]) {
    req.user = userDataCache[token];
    return next();
  }

  try {
    const response = await axios.get(
      "https://dev-22epsvydn7lyl8kn.us.auth0.com/userinfo",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const userData = response.data;

    // Cache user data for the token
    userDataCache[token] = userData;

    req.user = userData;

    next();
  } catch (error) {
    console.error("Error fetching user data:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export { userInfo };
