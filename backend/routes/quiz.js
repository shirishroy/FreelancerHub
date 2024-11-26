const express = require('express');
const cors = require('cors');
const router = express.Router();
require('dotenv').config();

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

router.get('/questions/:domain/:skills', async (req, res) => {
    async function run() {
        // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
      //   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
        const domain = req.params.domain;
        const skills = req.params.skills;
        const prompt = `you are quiz master of our freelancing website. Generate 10 random domain specific questions relating to ${domain} and for the skills ${skills} with 4 multiple choice answers separately. The response should be in json format:
      [
          {
              "id": <unique_id>,
              "domain": "<domain_name>",
              "skills": ["<skill1>", "<skill2>", "<skill3>", "..."],
              "question": "<question_text>",
              "choices": [
                  "<choice1>",
                  "<choice2>",
                  "<choice3>",
                  "<choice4>"
              ],
              "correctAnswer": "<correct_answer>"
          },
          ...
      ]`
      
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const newtext = response.text();
        const questions = JSON.parse(newtext.slice(7,-3));
        res.status(200).json(questions);
        console.log(questions);        
      }
      
      run();
})

module.exports=router;