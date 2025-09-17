import { RequestHandler } from "express";
import { User } from "../../entities/User";

export const RegisterHandler: RequestHandler = async (req, res) => {
  console.log("Register request received");
  const { email, username, password } = req.body;

  try {
    // 이메일 중복 검사
    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
      return res.status(409).json({ error: "Email already exists" });
    }

    // 사용자명 중복 검사
    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername) {
      return res.status(409).json({ error: "Username already exists" });
    }

    const user = new User();
    user.email = email;
    user.username = username;
    user.password = password;

    await user.save();

    console.log("User saved successfully");

    return res
      .status(201)
      .json({ message: "User created successfully", userId: user.id });
  } catch (error) {
    console.error("Error saving user:", error);
    return res.status(500).json({ error: "Failed to create user" });
  }
};
