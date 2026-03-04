import { Router } from "express";
import * as chatbotController from "../controllers/chatbotController.js";

const router = Router();

router.post("/", chatbotController.chatbot);

export default router;
