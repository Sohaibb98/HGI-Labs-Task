# Video Transcription App

This application is built using Vue 3 with TypeScript for the frontend and Node.js for the backend. The backend handles video uploads, which are then sent to the AssemblyAI server for transcription. Once the transcription process is complete, the results are returned to the frontend for display.

## Architecture Overview

- **Frontend**: Built with **Vue 3** and **TypeScript** to provide a dynamic and responsive user experience.
- **Backend**: Built with **Node.js** to handle video uploads and communicate with the AssemblyAI API for transcription.
- **Transcription Service**: The app uses **AssemblyAI** for audio transcription and speaker diarization. After researching multiple services (including Google), AssemblyAI was selected for its robust transcription and speaker identification capabilities.

For more details on the transcription process, you can check out AssemblyAI's documentation: [AssemblyAI Transcription API](https://www.assemblyai.com/docs/getting-started/transcribe-an-audio-file/typescript).

## Future Plans

- **API Options**: In the next update, we plan to add the ability to choose from 6 popular free APIs for transcription.
- **Hosting**: We also plan to host the entire application on an S3 bucket.

## Installation Guide

1. **Backend Setup**: 
   - Navigate to the backend directory:
     ```bash
     cd backend
     ```
   - Install backend dependencies:
     ```bash
     npm i
     ```
   - Run the backend server:
     ```bash
     npm start
     ```

2. **Frontend Setup**: 
   - Navigate to the frontend directory:
     ```bash
     cd frontend
     ```
   - Install frontend dependencies:
     ```bash
     npm i
     ```
   - Run the frontend server:
     ```bash
     npm run serve
     ```

Once both the backend and frontend servers are running, the application should be fully functional.

Enjoy using the app!
