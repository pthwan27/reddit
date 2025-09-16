import { Router } from "express";
import { register } from "../../migration/auth/register";

const router = Router();

router.post("/register", register);

export default router;
