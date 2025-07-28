# 4thewords Frontend - Johan Moreno

This is the frontend for the **4thewords Costa Rican legends app**, built with **React** and **Vite**. It interacts with the backend API to handle user authentication, legend creation/editing, filtering, image uploads, and navigation between pages.

## ⚙️ Technologies Used

- React 18+
- Vite
- TypeScript
- Tailwind CSS
- React Router
- Axios
- React Hook Form
- Zod (for form validation)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/4thewords_frontend_johan_moreno.git
cd 4thewords_frontend_johan_moreno
```

### 2. Install dependencies

```bash
npm install
# or
pnpm install
# or
yarn install
```

### 3. Create a `.env` file

In the root directory, create a `.env` file with the following variable:

```env
VITE_API_URL="http://localhost:8080"
```

This URL should point to your running **backend API**.

---

## 📚 Features

- Login and registration with JWT authentication
- Protected routes based on user session
- List of Costa Rican legends
- Filtering by name, category, date, province, canton, and district
- Create and edit legend forms with image upload
- Confirm before deleting a legend
- Friendly form validation with error feedback
- Responsive UI using Tailwind CSS
- Reusable components: buttons, inputs, dropdowns, modals, etc.

---

## 📂 Folder Structure

```
.
├── src/
│   ├── pages/                # Screens (login, register, list, create, edit)
│   ├── components/           # Reusable UI components
│   ├── hooks/                # Custom React hooks
│   ├── contexts/             # Context providers (e.g., auth, notifications)
│   ├── services/             # Axios API service layer
│   ├── utils/                # Utility functions and validators
│   ├── App.tsx               # App root and routes
│   └── main.tsx              # App bootstrap
├── public/                   # Static files
├── .env                      # Environment variables
├── index.html                # HTML entry point
└── vite.config.ts            # Vite configuration
```

---

## 🧪 Development

Start the development server on **http://localhost:3000**:

```bash
npm run dev
# or
pnpm dev
```

---

## 📫 Contact

Developed by **Johan Alejandro Moreno Gil** for a technical test.  
Feel free to review the code or reach out if you have questions.
