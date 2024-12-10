const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = 5000;

const cors = require('cors');
app.use(cors());

// Middleware
app.use(bodyParser.json());


// Endpoint to handle AI queries
app.post('/ask', async (req, res) => {    
  const { notes, question } = req.body;

    // Format notes into a structured context
    const formattedNotes = notes
    .map(
      (note, index) =>
        `Note ${index + 1}:\n${typeof note === 'object' ? JSON.stringify(note, null, 2) : note}`
    )
    .join('\n\n');

  // Create a professional prompt
  const prompt = `
    You are an AI assistant. Use the provided context to answer the user's question accurately and concisely. Do not make up information beyond the context.

    Context:
    ${formattedNotes}

`;

  // Query the model
  try {
    const url = 'https://api-inference.huggingface.co/models/distilbert-base-cased-distilled-squad';
    const apiKey = process.env.HUGGINGFACE_API_KEY; // Replace with your Hugging Face API key
    const body = JSON.stringify({
        inputs: {
            question: question,
            context: prompt
          }
    });
    const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: body,
      });

    const data = await response.json();
    console.log(data);
    
    if (response.ok) {
        res.json({ answer: data.answer });
    } else {
        console.error('Error from Hugging Face API:', data);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error querying QA model' });
    }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
