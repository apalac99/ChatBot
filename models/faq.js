import mongoose from "mongoose";

const FAQSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
  },
  { collection: "datos_colegio" } // Usar la colección `datos_colegio`
);

const FAQ = mongoose.model("FAQ", FAQSchema);

export default FAQ;