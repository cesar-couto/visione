from fastapi import APIRouter
import random
import datetime
from threading import Timer

router = APIRouter()

# --- In-Memory Database for Snapshots ---
snapshot_db = []

# --- AI Simulation Logic ---
HELMET_COLORS = {
    "white": "engineer",
    "yellow": "worker",
    "blue": "supervisor"
}

def detect_people_in_frame(frame_data):
    num_people = random.randint(5, 20)
    detected_roles = {}
    locations = []

    for _ in range(num_people):
        role = random.choice(list(HELMET_COLORS.values()))
        detected_roles[role] = detected_roles.get(role, 0) + 1
        locations.append({
            "x": random.randint(1, 100),
            "y": random.randint(1, 100),
            "role": role,
            "value": random.randint(1, 10)
        })

    return {
        "total_people": num_people,
        "people_by_role": detected_roles,
        "locations": locations
    }

# --- Background Snapshot Task ---
def take_snapshot():
    print(f"Taking snapshot at {datetime.datetime.now()}")
    snapshot_data = detect_people_in_frame("dummy_frame_data")
    snapshot_data["timestamp"] = datetime.datetime.now().isoformat()
    snapshot_db.append(snapshot_data)

    # Schedule the next snapshot (in a real app, use a more robust scheduler like APScheduler)
    Timer(3600, take_snapshot).start()

# Start the snapshot process when the application starts
# take_snapshot() # Commented out for now to avoid long-running process issues

# --- API Endpoints ---
@router.get("/status")
def get_status():
    return detect_people_in_frame("dummy_frame_data")

@router.get("/heatmap")
def get_heatmap():
    return {"heatmap_data": detect_people_in_frame("dummy_frame_data")["locations"]}

@router.get("/snapshots")
def get_snapshots():
    return snapshot_db
