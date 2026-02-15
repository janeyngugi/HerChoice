# Project Handoff Report: HerChoice

**To:** Anti Gravity Team
**From:** Jules (Initial Developer)
**Date:** October 26, 2023
**Subject:** Handoff of HerChoice Prototype

## Project Overview
HerChoice is a web-based prototype designed to assist victims of sexual abuse by connecting them to essential services (hospitals, shelters, therapy) and allowing anonymous incident reporting. The system uses "Big Data" concepts (via a dashboard) to visualize trends and help policymakers.

## Technical Architecture
The project is a Monorepo containing:
-   **Client (`/client`):** A React application built with Vite.
    -   **Styling:** Tailwind CSS.
    -   **Maps:** React Leaflet (OpenStreetMap).
    -   **Charts:** Chart.js with `react-chartjs-2`.
    -   **Routing:** React Router DOM.
-   **Server (`/server`):** A Node.js Express REST API.
    -   **Database:** SQLite (file-based `database.sqlite`).
    -   **ORM:** Sequelize.
    -   **Mock Data:** Automated seeding script (`scripts/seed.js`).

## Current Status
The prototype is fully functional with the following features implemented:
1.  **Landing Page:** Responsive hero section and feature highlights.
2.  **Find Help:**
    -   Interactive map showing mock resource locations.
    -   List view with filtering (Hospital, Shelter, etc.).
    -   "Get Directions" button (UI only).
3.  **Report Incident:**
    -   Form for anonymous or pseudo-anonymous reporting.
    -   Geolocation integration (browser API) to capture incident coordinates.
    -   Data is saved to the SQLite database.
4.  **Stories:**
    -   Read-only view of survivor stories (fetched from DB).
    -   "Write a Story" button (currently shows a "Coming Soon" alert).
5.  **Emergency Contacts:**
    -   View system contacts (Helplines).
    -   Add personal contacts (saved to DB).
6.  **Data Dashboard:**
    -   Visualizes incident types using a Bar chart and Pie chart.
    -   Calculates basic statistics (Total incidents).

## Setup & Execution
1.  **Install Dependencies:**
    ```bash
    cd server && npm install
    cd client && npm install
    ```
2.  **Run Development Environment:**
    -   **Backend:** `cd server && npm start` (Runs on port 3000)
    -   **Frontend:** `cd client && npm run dev` (Runs on port 5173)

## Database
-   The database is an SQLite file located at `server/database.sqlite` (created automatically).
-   **Seeding:** On the first run, if the `Resources` table is empty, the system automatically runs `scripts/seed.js` to populate the DB with demo data (Nairobi-based locations).

## Known Issues & Next Steps for "Anti Gravity"
1.  **Environment Variables:** Currently, API URLs are hardcoded to `http://localhost:3000` in the frontend components. These should be moved to `.env` files (e.g., `VITE_API_URL`).
2.  **Authentication:** The "Login/Guest" flow mentioned in the proposal is not fully enforced. Currently, all features are open. Future work should implement JWT authentication for admin/user roles.
3.  **Story Moderation:** The backend supports an `isApproved` flag for stories, but there is no Admin UI to approve submitted stories.
4.  **Geolocation:** The map centers on a hardcoded location (Nairobi). It should ideally default to the user's current location.
5.  **Deployment:** The app is configured for local dev. For production, `client` should be built (`npm run build`) and served statically by the Express server or a separate web server (Nginx/Vercel).

## Key Files
-   `server/models/`: Database schema definitions.
-   `client/src/pages/`: Main view components.
-   `client/src/components/Navbar.jsx`: Main navigation logic.

Good luck taking HerChoice to the next level!
