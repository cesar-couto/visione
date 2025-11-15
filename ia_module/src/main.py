import random

# In a real scenario, this would use a library like OpenCV and a trained model (e.g., YOLO).
# For this MVP, we simulate the detection.

# Simulated helmet colors and their corresponding roles.
HELMET_COLORS = {
    "white": "engineer",
    "yellow": "worker",
    "blue": "supervisor"
}

def detect_people_in_frame(frame_data):
    """
    Simulates detecting people and classifying them by helmet color from an image frame.

    Args:
        frame_data: Placeholder for image data from a video stream.

    Returns:
        A dictionary with the total count and counts per role.
        Example:
        {
            "total_people": 5,
            "people_by_role": {
                "worker": 4,
                "engineer": 1
            },
            "locations": [ # Placeholder for heatmap data
                {"x": 10, "y": 20, "role": "worker"},
                {"x": 12, "y": 22, "role": "worker"},
                {"x": 50, "y": 60, "role": "engineer"},
                {"x": 55, "y": 65, "role": "worker"},
                {"x": 48, "y": 58, "role": "worker"},
            ]
        }
    """

    # Simulate a random number of people being detected
    num_people = random.randint(5, 20)

    detected_roles = {}
    locations = []

    # Simulate classification for each detected person
    for i in range(num_people):
        role = random.choice(list(HELMET_COLORS.values()))
        detected_roles[role] = detected_roles.get(role, 0) + 1

        # Simulate location for heatmap
        locations.append({
            "x": random.randint(1, 100),
            "y": random.randint(1, 100),
            "role": role
        })

    return {
        "total_people": num_people,
        "people_by_role": detected_roles,
        "locations": locations
    }

# Example of how this function would be used:
if __name__ == '__main__':
    # This would be a frame from a camera feed
    sample_frame = "dummy_image_data"

    detection_result = detect_people_in_frame(sample_frame)
    print("Detection Result:")
    print(detection_result)
