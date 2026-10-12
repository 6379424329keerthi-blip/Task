# Karunya Semester Exam Master: 5-Subject Reverse Study Planner

An interactive semester examination revision planner built for Karunya University students, focusing on high-weight modules (Module 6 ➔ 1 and 1 ➔ 6 toggle) with full Google Calendar and Google Tasks synchronization and Karunya Question Bank integration.

---

## 🚀 Quick Start (Run Locally)

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** (comes with Node.js) or **pnpm** / **yarn**

### 2. Clone and Install Dependencies
```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
npm install
```

### 3. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📤 How to Push to Your GitHub Repository

If you downloaded or exported this project from AI Studio, run these commands in your project root directory:

```bash
# 1. Initialize Git (if not already a git repository)
git init

# 2. Add all project files
git add .

# 3. Create initial commit
git commit -m "feat: Karunya 5-Subject Study Planner with Google Calendar and Tasks sync"

# 4. Set default branch to main
git branch -M main

# 5. Connect to your GitHub repository
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# 6. Push code to GitHub
git push -u origin main
```

---

## 🔑 Firebase & Google Workspace Setup (Localhost & Production)

The app integrates with **Firebase Authentication**, **Google Calendar API**, and **Google Tasks API**.

### 1. Firebase Configuration
The application reads its credentials from `firebase-applet-config.json` at the root directory:
```json
{
  "projectId": "YOUR_PROJECT_ID",
  "appId": "YOUR_APP_ID",
  "apiKey": "YOUR_API_KEY",
  "authDomain": "YOUR_PROJECT_ID.firebaseapp.com",
  "storageBucket": "YOUR_PROJECT_ID.firebasestorage.app",
  "messagingSenderId": "YOUR_SENDER_ID",
  "oAuthClientId": "YOUR_OAUTH_CLIENT_ID"
}
```

### 2. Authorize `localhost` for Google Sign-In
To allow Google Sign-in to work when testing locally:
1. Open [Firebase Console](https://console.firebase.google.com/) and navigate to your project.
2. Go to **Authentication** ➔ **Settings** tab ➔ **Authorized domains**.
3. Ensure `localhost` is listed. If not, click **Add domain** and enter `localhost`.
4. Open the [Google Cloud Console Credentials Page](https://console.cloud.google.com/apis/credentials).
5. Edit your Web OAuth 2.0 Client ID and ensure **Authorized JavaScript origins** includes:
   - `http://localhost:3000`
   - Your production URL (e.g. GitHub Pages or Vercel).

---

## 🛠 Available Scripts

- `npm run dev`: Starts the Vite development server on port 3000.
- `npm run build`: Compiles TypeScript and creates optimized production assets in `dist/`.
- `npm run preview`: Previews the production build locally.
- `npm run lint`: Runs TypeScript type-checking without emitting files.

---

## 📚 Subject Coverage

1. **Data Science** (21CS301)
2. **Database Management Systems** (21CS302)
3. **Full Stack Web Development** (21CS303)
4. **Theory of Computation** (21CS304)
5. **Quantum Computing** (21CS305)

Direct reference to the official [Karunya Question Bank Portal](https://www.karunya.edu/library/question/banks).
