from fastapi import APIRouter
import random
import datetime

router = APIRouter()

# --- Data Simulation Constants ---
HELMET_COLORS = {
    "white": "engineer",
    "yellow": "worker",
    "blue": "supervisor"
}

# --- Realistic Workday Simulation ---
def get_workday_multiplier():
    """Returns a multiplier based on the current hour to simulate a workday."""
    now = datetime.datetime.now()
    hour = now.hour
    if 8 <= hour < 12:  # Morning peak
        return 1.0
    elif 12 <= hour < 13: # Lunch break
        return 0.3
    elif 13 <= hour < 17: # Afternoon peak
        return 0.9
    elif 7 <= hour < 8 or 17 <= hour < 18: # Start/End of day
        return 0.5
    else: # Outside working hours
        return 0.1

def generate_simulated_data():
    """Generates a snapshot of data based on the workday simulation."""
    multiplier = get_workday_multiplier()
    num_people = int(random.randint(15, 30) * multiplier)

    detected_roles = {"engineer": 0, "worker": 0, "supervisor": 0}
    locations = []

    # Ensure at least one supervisor and engineer during work hours
    if multiplier > 0.1:
        detected_roles["supervisor"] = random.randint(1, 2)
        detected_roles["engineer"] = 1

    # Populate the rest with workers
    remaining_people = num_people - sum(detected_roles.values())
    detected_roles["worker"] = max(0, remaining_people)

    # Generate locations for all people
    for role, count in detected_roles.items():
        for _ in range(count):
            locations.append({
                "x": random.randint(10, 90),
                "y": random.randint(10, 90),
                "value": random.randint(5, 10),
                "role": role
            })

    return {
        "total_people": sum(detected_roles.values()),
        "people_by_role": detected_roles,
        "locations": locations
    }

# --- API Endpoints ---
@router.get("/status")
def get_status():
    """Returns the current simulated status of the construction site."""
    return generate_simulated_data()

@router.get("/heatmap")
def get_heatmap():
    """Returns the current simulated heatmap data."""
    data = generate_simulated_data()
    return {"heatmap_data": data["locations"]}

@router.get("/production_data")
def get_production_data():
    """Returns a full day's simulated production data for the chart."""
    labels = [f"{hour}:00" for hour in range(8, 18)]
    # Simulate a typical productivity curve for the day
    production_values = [10, 15, 22, 25, 12, 28, 26, 23, 20, 15]
    return {
        "labels": labels,
        "data": production_values
    }

# Note: The snapshot functionality has been removed for simplicity in this revision,
# as the new simulation provides a more dynamic "live" view.
