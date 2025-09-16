import { User } from "../../entities/User";

export const register = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;

  try {
    const user = new User();

    user.email = email;
    user.username = username;
    user.password = password;

    await user.save();

    return res.status().json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message || "회원가입 실패" });
  }
};
