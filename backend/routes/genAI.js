const express = require('express');
const cors = require('cors');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const router = express.Router();

dotenv.config();

router.use(express.json());

// Multer setup for file uploads
const upload = multer({ dest: 'uploads/' });

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// // List models and print names of models that support 'generatedContent'
// async function listModels() {
//   const models = await genAI.listModels();
//   models.forEach((model) => {
//     if (model.supported_generation_methods.includes('generatedContent')) {
//       console.log(model.name);
//     }
//   });
// }
// listModels();

const MODEL_CONFIG = {
  temperature: 0.2,
  top_p: 1,
  top_k: 32,
  max_output_tokens: 4096
};

const SAFETY_SETTINGS = [
  {
    category: "HARM_CATEGORY_HARASSMENT",
    threshold: "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    category: "HARM_CATEGORY_HATE_SPEECH",
    threshold: "BLOCK_MEDIUM_AND_ABOVE"
  }
];

// Endpoint to handle PDF upload and extract text
router.post('/', upload.single('file'), async (req, res) => {
  try {
    const fileBuffer = fs.readFileSync(req.file.path);
    const data = await pdfParse(fileBuffer);
    const text = data.text;
    console.log(text);

    // Generative AI call
    const model = await genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      // generation_config: MODEL_CONFIG,
      // safety_settings: SAFETY_SETTINGS
    });

    const prompt = "Extract an array of Skills from this resume, preferrably technical. Make sure to return the response in a JSON Format. Here is the Resume Text : " +  text

    // Assuming you want to process text with the model
    const result = await model.generateContent(prompt);
    const newResponse = await result.response;
    const resw = newResponse.text();
    const finalData = resw.slice(7,-3);
    const jsonData = JSON.parse(finalData);

    res.json({ generatedContent: finalData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to process request' });
  }
});

module.exports = router;