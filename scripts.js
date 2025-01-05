let projectRatings = {
    project1: [],
    project2: [],
    project3: [],
    project4: [],
};

function rateProject(rating, projectId) {
    if (!projectRatings[projectId]) {
        projectRatings[projectId] = [];
    }

    // Add the rating to the array for the project
    projectRatings[projectId].push(rating);

    // Update the displayed rating
    let totalRating = projectRatings[projectId].reduce((acc, curr) => acc + curr, 0);
    let avgRating = totalRating / projectRatings[projectId].length;

    // Update the average rating display
    document.getElementById(`${projectId}-avg-rating`).innerText = avgRating.toFixed(1);

    // Update the individual rating display (show the last rating selected)
    document.getElementById(`${projectId}-rating`).innerText = rating;
}
// Initialize ratings if not already saved
if (!localStorage.getItem("ratings")) {
    localStorage.setItem("ratings", JSON.stringify({}));
}

// Function to rate a project and update average
function rateProject(rating) {
    // Get the project name (could be dynamic or hardcoded for now)
    const projectName = "Project Name";  // Replace with dynamic project name if necessary
    let ratings = JSON.parse(localStorage.getItem("ratings"));

    // If project does not have any rating, initialize
    if (!ratings[projectName]) {
        ratings[projectName] = [];
    }

    // Add the new rating to the project
    ratings[projectName].push(rating);

    // Save updated ratings back to localStorage
    localStorage.setItem("ratings", JSON.stringify(ratings));

    // Update the displayed average rating
    updateAverageRating(projectName);
}

// Function to calculate and display the average rating for a project
function updateAverageRating(projectName) {
    const ratings = JSON.parse(localStorage.getItem("ratings"));
    
    if (ratings[projectName] && ratings[projectName].length > 0) {
        const totalRatings = ratings[projectName].length;
        const sumRatings = ratings[projectName].reduce((acc, rating) => acc + rating, 0);
        const averageRating = (sumRatings / totalRatings);
        const averagePercentage = (averageRating / 5) * 100;
        
        // Update the average rating display
        document.getElementById('average-rating').textContent = `Average Rating: ${averagePercentage.toFixed(1)}%`;
    }
}

// Call this function on page load to initialize the average rating
document.addEventListener('DOMContentLoaded', function () {
    updateAverageRating("Project Name");  // Replace with the dynamic project name if needed
});

