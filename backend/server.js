require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend requests
app.use(cors());
app.use(express.json());

// Set up multer for file uploads
const upload = multer({ dest: "uploads/" });

// AssemblyAI API Key
const ASSEMBLY_AI_KEY = process.env.ASSEMBLY_AI_KEY;

// Upload and process audio
app.post("/upload", upload.single("audio"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        // Read the uploaded file
        const filePath = path.join(__dirname, req.file.path);
        const fileStream = fs.createReadStream(filePath);
        console.log("FILE READ SUCCESS!");

        // Upload file to AssemblyAI
        const uploadResponse = await axios.post(
            "https://api.assemblyai.com/v2/upload",
            fileStream,
            {
                headers: {
                    Authorization: ASSEMBLY_AI_KEY,
                    "Content-Type": "application/octet-stream",
                },
            }
        );

        const audioUrl = uploadResponse.data.upload_url;

        // Request transcription
        const transcriptResponse = await axios.post(
            "https://api.assemblyai.com/v2/transcript",
            {
                audio_url: audioUrl,
                speaker_labels: true, // Enables diarization (detects different speakers)
            },
            {
                headers: {
                    Authorization: ASSEMBLY_AI_KEY,
                    "Content-Type": "application/json",
                },
            }
        );

        res.json({ transcript_id: transcriptResponse.data.id });
    } catch (error) {
        console.error("Error processing audio:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Check transcription status
app.get("/transcript/:id", async (req, res) => {
    try {
        const transcriptId = req.params.id;

        const response = await axios.get(
            `https://api.assemblyai.com/v2/transcript/${transcriptId}`,
            {
                headers: {
                    Authorization: ASSEMBLY_AI_KEY,
                },
            }
        );

        res.json(response.data);
    } catch (error) {
        console.error("Error fetching transcript:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
