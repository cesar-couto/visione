# Cognitive Vision Platform - MVP

This repository contains the Minimum Viable Product (MVP) for a cognitive vision platform designed to monitor and analyze civil construction sites. The project uses a simulated AI backend to provide real-time data to a web-based dashboard.

## Architecture

The project is divided into three main components:

1.  **Backend (`/backend`):** A Python server built with **FastAPI** that serves simulated data. It exposes API endpoints to provide information about personnel on-site, their roles (based on helmet color), and location data for heatmaps.
2.  **Frontend (`/frontend`):** A simple dashboard built with **HTML, CSS, and vanilla JavaScript**. It fetches data from the backend and displays it in real-time.
3.  **AI Module (`/ia_module`):** A Python module containing the simulated logic for person detection and classification. For this MVP, its logic has been integrated directly into the backend to simplify deployment.

---

## How to Run the Project

To visualize the project, you need to run both the backend and frontend services simultaneously. This requires two separate terminal windows.

### Prerequisites

-   Python 3.7+
-   `pip` (Python package installer)

### Terminal 1: Running the Backend

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **(Recommended) Create and activate a virtual environment:**
    ```bash
    # Create the environment
    python -m venv venv

    # Activate on macOS/Linux
    source venv/bin/activate

    # Activate on Windows
    # venv\Scripts\activate
    ```

3.  **Install the required dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Start the API server:**
    ```bash
    uvicorn src.main:app --reload
    ```
    The backend will now be running at `http://127.0.0.1:8000`. Leave this terminal open.

### Terminal 2: Running the Frontend

1.  **Navigate to the frontend's `src` directory:**
    ```bash
    cd frontend/src
    ```

2.  **Start a simple Python web server:**
    ```bash
    python -m http.server 8080
    ```
    The frontend will now be accessible on port `8080`. Leave this terminal open as well.

---

## Viewing the Dashboard

With both services running, open your web browser and navigate to:

👉 **http://localhost:8080**

You should see the "Cognitive Vision Dashboard" displaying the simulated data from the backend. The data will automatically refresh every 5 seconds.
