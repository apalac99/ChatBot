
import FAQ from "../models/faq.js"; // Modelo para la colección de preguntas frecuentes (FAQ)


/**
 * Controlador para manejar preguntas al chatbot.
 * Busca primero en la base de datos, intentando encontrar una respuesta exacta o similar.
 */

export const askQuestion = async (req, res) => {
  const { question } = req.body; // Obtener la pregunta del cuerpo de la solicitud

  try {
    // Buscar la pregunta exacta en la base de datos
    const exactMatch = await FAQ.findOne({ question });

    if (exactMatch) {
      return res.json({ response: exactMatch.answer });
    }

    // Si no hay coincidencia exacta, buscar preguntas similares (búsqueda difusa)
    const similarMatch = await FAQ.aggregate([
      {
        $search: {
          index: "default", // Asegúrate de tener un índice de búsqueda configurado en MongoDB Atlas
          text: {
            query: question,
            path: "question",
            fuzzy: { maxEdits: 2 }, // Búsqueda difusa con 2 ediciones permitidas
          },
        },
      },
      { $limit: 1 }, // Limitar a la respuesta más relevante
    ]);

    if (similarMatch.length > 0) {
      return res.json({ response: similarMatch[0].answer });
    }


  } catch (error) {
    console.error("Error al procesar la pregunta:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};