# 🍯 SweetCode

A competitive programming assistance platform that helps users practice and improve their coding skills through AI-powered tools and real-time code execution.

## ✨ Features

- 🤖 **AI-Powered Question Reframing** - Transform complex problems into clear, structured formats
- 💻 **Automatic Code Generation** - Generate optimal C++ solutions with detailed explanations
- 🧪 **Smart Test Case Generation** - Create comprehensive test cases including edge cases
- ⚡ **Real-Time Code Execution** - Test your solutions instantly with immediate feedback
- 📝 **Interactive Practice Mode** - Edit and experiment with code in a full-featured editor
- 🎯 **Solution Analysis Mode** - Study optimal solutions with detailed breakdowns
- 🔄 **Multi-Test Validation** - Run your code against multiple test scenarios

## 🛠️ Tech Stack

### Frontend

- **React** - Modern UI framework
- **Vite** - Fast build tool and development server
- **Monaco Editor** - VSCode-powered code editor
- **Jotai** - Atomic state management
- **CSS3** - Responsive styling

### Backend

- **Flask** - Lightweight web framework
- **Flask-RESTful** - RESTful API development
- **Google Gemini AI** - Advanced AI language model
- **RapidAPI OneCompiler** - Code execution service

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 19.x
- **Python** >= 3.13
- **Google Gemini API Key** - [Get yours here](https://makersuite.google.com/app/apikey)
- **OneCompiler API Key** - [Available on RapidAPI](https://rapidapi.com/onecompiler-onecompiler-default/api/onecompiler-apis/)

## 🚀 Installation

### Backend Setup

1. **Navigate to the server directory:**

   ```bash
   cd server
   ```

2. **Create and activate a virtual environment:**

   ```bash
   python -m venv env
   source env/bin/activate  # On Windows: env\Scripts\activate
   ```

3. **Install Python dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables:**

   ```bash
   # Create .env file with your API keys
   echo "GEMINI_KEY=your_gemini_api_key_here" > .env
   echo "ONE_COMPLIER_KEY=your_onecompiler_api_key_here" >> .env
   ```

5. **Start the Flask server:**
   ```bash
   python run.py
   ```
   The backend will be running on `http://localhost:3000`

### Frontend Setup

1. **Navigate to the client directory:**

   ```bash
   cd client/sweetcode
   ```

2. **Install Node.js dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**

   ```bash
   echo "VITE_API_URL=http://localhost:3000" > .env
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`

## 🎯 Usage

1. **Enter Your Problem** - Paste or type your competitive programming question in the query box

2. **Get AI Assistance** - Click "Ask the Question" to receive a reframed, structured version of your problem with clarified requirements

3. **Generate Solution** - Click "Generate Code" to receive an optimal C++ solution with explanations

4. **Choose Your Mode:**

   - **Solution Mode** - View and study the generated optimal solution
   - **Practice Mode** - Edit the code and implement your own approach

5. **Test Your Code** - Use the automatically generated test cases to validate your solution

6. **Execute & Verify** - Run your code against multiple test scenarios to ensure correctness

## 🏗️ Project Structure

```
SweetCode/
├── server/                 # Flask backend
│   ├── app/               # Application modules
│   ├── requirements.txt   # Python dependencies
│   ├── run.py            # Server entry point
│   └── .env              # Environment variables
├── client/sweetcode/      # React frontend
│   ├── src/              # Source code
│   ├── public/           # Static assets
│   ├── package.json      # Node.js dependencies
│   └── .env              # Environment variables
└── README.md
```

## 🔧 API Endpoints

- `POST /api/reframe` - Reframe and structure problem statements
- `POST /api/generate-code` - Generate optimal C++ solutions
- `POST /api/test-cases` - Generate comprehensive test cases
- `POST /api/execute` - Execute code with test cases

## 🙏 Acknowledgments

- Google Gemini AI for powerful language processing
- OneCompiler for reliable code execution
- Monaco Editor for the excellent code editing experience

---

**Happy Coding! 🚀**
