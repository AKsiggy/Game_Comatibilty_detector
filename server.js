const express = require('express');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

const genAI = new GoogleGenerativeAI("AIzaSyBY5DHYBy8eSF4YIbb9_P4izzgdM7LfS18");

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

app.post('/check-compatibility', async (req, res) => {
    const { gameName, deviceSpecs } = req.body;
    const prompt = `Check if the game ${gameName} is compatible with the following device specs: ${JSON.stringify(deviceSpecs)}.Output ={compatibility}newline{reason}newline{min specs and reccomended specs required}`;
    
    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        res.json({ message: response.text() });
    } catch (error) {
        res.status(500).json({ message: 'Error checking compatibility' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
