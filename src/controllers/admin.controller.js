import sha256 from "sha256";
import jwt from "../utils/jwt.js";
import { read} from "../utils/model.js";

export const LOGIN = (req, res,next) => {
  try {
    let { username, password } = req.body;

    let users = read("users");

    let user = users.find(
      (user) => user.username == username && user.password == sha256(password)
    );

    let agent = req.headers["user-agent"];
    let ip = req.ip;

    if (!user) {
      return next(new Error (401,"wrong username or password"))
    }
    
    return res.status(200).json({
      status: 200,
      message: "ok",
      data:user,
      token: jwt.sign({ userId: user.userId, agent: agent, ip: ip }),
    });

  } catch (error) {
    return next(new  Error(500,error.message))
  }
};
  