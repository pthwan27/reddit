import { Router } from "express";
import { RegisterHandler } from "../../migration/auth/register";

const router = Router();

router.post("/register", RegisterHandler);

export default router;
