# Karunya Semester Exam Master: 5-Subject Reverse Study Planner

An interactive semester examination revision planner built for Karunya University students, focusing on high-weight modules (Module 6 ➔ 1 and 1 ➔ 6 toggle) with full Google Calendar and Google Tasks synchronization and Karunya Question Bank integration.

---

## 🚀 Quick Start (Run Locally)

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** (comes with Node.js) or **pnpm** / **yarn**

### 2. Clone and Install Dependencies
```bash
git clone https://github.com/6379424329keerthi-blip/Task.git
cd Task
npm install
```

### 3. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Run Online Anywhere (Free Live Web App)

You can run this app on your phone, laptop, or any computer without installing Node.js:

### Option 1: GitHub Pages (Automated via GitHub Actions)
1. Push this repository to GitHub (`git push origin main`).
2. Go to your GitHub repository: [https://github.com/6379424329keerthi-blip/Task](https://github.com/6379424329keerthi-blip/Task)
3. Click **Settings** ➔ **Pages** (in the left sidebar).
4. Under **Build and deployment** ➔ **Source**, select **GitHub Actions**.
5. The workflow in `.github/workflows/deploy.yml` will automatically build and publish the app!
6. Your live web app URL will be:
   ```
   https://6379424329keerthi-blip.github.io/Task/
   ```

### Option 2: Vercel (1-Click Instant Deploy)
1. Go to [https://vercel.com](https://vercel.com) and sign in with your GitHub account.
2. Click **Add New...** ➔ **Project**.
3. Import the `Task` repository.
4. Click **Deploy**. Vercel will build and give you a fast HTTPS URL that works on all devices.

---

## 📤 Push Changes to GitHub

To push the latest updates to your GitHub repo:
```bash
git add .
git commit -m "feat: setup automated deployment and build configs"
git push origin main
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
