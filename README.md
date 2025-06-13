
# 🎓 CoApp – College Application Helper

**CoApp** is a free web platform that helps students navigate the U.S. college application process. It offers personalized essay feedback using Cohere AI, a detailed Common App manual, and aims to expand with community review and test prep features.

This project was built to support underserved students while helping the developer grow full-stack web development skills.

---

## 🌐 Live Demo

🚀 Try it now: [https://hailemariammersha.github.io/coapp/](https://hailemariammersha.github.io/coapp/)

---

## 🚀 Features

- 📝 **Essay Submission** – Students paste and submit their college essays.
- 🧠 **AI Feedback** – Cohere AI provides constructive writing feedback.
- 📘 **Common App Manual** – Step-by-step guidance through the U.S. application process.
- 🔒 **Built-in extensibility** – Ready to support volunteer reviews, login, and progress tracking.

---

## 🛠 Tech Stack

| Area           | Tech Used                            |
|----------------|---------------------------------------|
| **Frontend**   | HTML, CSS, JavaScript                 |
| **Backend**    | Node.js, Express.js                  |
| **AI API**     | Cohere AI (Text Generation API)       |
| **Hosting**    | GitHub Pages (frontend), Render (backend) |
| **Environment**| dotenv for API key management         |
| **HTTP**       | node-fetch                            |
| **Dev Tools**  | VS Code, Live Server extension        |

---

## 📂 Folder Structure

```

coapp/
├── index.html        # Essay submission UI
├── manual.html       # Step-by-step Common App guide
├── style.css         # Styling for the site
├── script.js         # JavaScript logic for the frontend
└── backend/
├── server.js     # Express backend with Cohere integration
└── .env          # Stores API key for Cohere

````

---

## ⚙️ Getting Started

### 1. Clone the Project
```bash
git clone https://github.com/hailemariammersha/coapp
cd coapp
````

### 2. Frontend (Open in VS Code and use Live Server)

Open `index.html` with Live Server in VS Code or view it live [here](https://hailemariammersha.github.io/coapp/).

### 3. Backend Setup

```bash
cd backend
npm install express cors dotenv node-fetch
```

Create a `.env` file:

```
COHERE_API_KEY=your_cohere_api_key_here
```

Start the backend server:

```bash
node server.js
```

✅ Or deploy the backend to **Render** and update the frontend `fetch` URL accordingly.

---

## 🌱 Planned Features

* Volunteer review dashboard
* Firebase or OAuth authentication
* College application tracker
* Integrated test prep resources (SAT, TOEFL)

---

## 🤝 Contributing

This project is currently developed by [Hailemariam Mersha](https://github.com/hailemariam-m) as part of a learning and social impact initiative. Contributions and collaborators welcome.

---


