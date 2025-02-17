import express from "express";
import { askQuestion } from "../controllers/chatController.js";

const router = express.Router();

// Ruta para manejar preguntas al chatbot
router.post("/ask", askQuestion);

export default router;