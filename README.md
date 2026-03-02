Running the System
1. Start the Backend API
Open a terminal in ...../OcrSystem.API and run:

powershell
dotnet run
The API will listen on http://localhost:5031 (or similar, check console output).

2. Start the Frontend Client
Open a new terminal in e:/2026/Mohiuddin Zadi/OcrProject/client and run:

powershell
npm install
npm start
The application will launch at http://localhost:4200.

Verification Checklist
Upload Interface: Open http://localhost:4200. You should see the "Upload Identity Document" card.
Data Extraction: Upload a sample CNIC image.
Wait for "Processing..." to finish.
"Review & Confirm Data" form should appear.
Check if Name, Document Number, and Dates are populated.
Backend Console: Check the terminal running the API. It should show logs of the request and processing.
Validation: Try to edit the form and click "Confirm".
Retention Policy: Verify that images are deleted after the retention period (code logic verified).
Troubleshooting
Frontend not connecting?: Check the API URL in client/src/app/services/api.service.ts matches the dotnet run output.
Tesseract Error?: Ensure eng.traineddata is in the tessdata folder.
