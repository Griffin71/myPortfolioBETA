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
