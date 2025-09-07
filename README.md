# 📄 PDF Q&A App

A **Next.js 15** application that allows users to upload PDFs, extract their text, and query the content using **OpenAI embeddings + Pinecone** for semantic search.  

---

## 🚀 Features
- Upload PDF files and parse their text.  
- Store extracted chunks into **Pinecone** vector database.  
- Ask natural language questions about your PDF.  
- Get AI-powered answers based on document context.  

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/<your-username>/pdf-app.git
cd pdf-app
```
2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

Create a .env.local file in the root directory:
```bash
OPENAI_API_KEY=your_openai_api_key_here
PINECONE_API_KEY=your_pinecone_api_key_here
PINECONE_ENV=your_pinecone_environment
```



⚠️ Note: .env is ignored in git. Instead, we provide a .env.example so others know what’s required.

### 4️⃣ Run Development Server
```bash
npm run dev
```


The app will start at:
👉 http://localhost:3000

### 🧠 Approach

## PDF Upload & Parsing

-Users upload a PDF via /api/upload.

-We parse the text using pdf-parse
.

## Text Splitting & Embeddings

-Long text is split into chunks for better semantic retrieval.

-Each chunk is converted into embeddings using OpenAI’s Embedding API.

## Vector Database Storage

-Embeddings are stored in Pinecone, enabling semantic similarity search.

## Question Answering

-When the user asks a question, the system retrieves the most relevant chunks from Pinecone.

-Those chunks are sent to OpenAI GPT model to generate a contextual answer.

### 📂 Project Structure
```bash
pdf-app/
├── app/
│   ├── api/
│   │   └── upload/route.js   # PDF upload & parsing API
│   ├── page.js               # UI for upload & Q&A
├── lib/
│   └── pdfParser.js          # PDF parsing logic
├── public/                   # Static files
├── .env.example              # Example environment variables
├── .gitignore
├── package.json
└── README.md
```


### 📌 Notes

-.env is not committed for security. Use .env.example as a template.

-Currently using in-memory storage for extracted text (can be extended to DB).

-TailwindCSS is optional (we skipped it for now to keep setup simple).


Do you also want me to add a **Usage Example section** (step-by-step: upload → ask → answer), s

