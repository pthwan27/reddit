import { Router } from "express";
import { CreateHandler } from "../../migration/sub/create";

const router = Router();

router.post("/create", CreateHandler);
