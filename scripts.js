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


document.addEventListener("DOMContentLoaded", () => {
    // Load saved comments from localStorage
    loadComments();

    // Handle comment submission
    document.getElementById("comment-form").addEventListener("submit", function(event) {
        event.preventDefault();
        submitComment();
    });
});

// Function to submit a comment
function submitComment() {
    const name = document.getElementById("comment-name").value;
    const text = document.getElementById("comment-text").value;
    const rating = document.getElementById("comment-rating").innerText;

    const newComment = {
        name: name,
        text: text,
        rating: rating,
        timestamp: new Date().toLocaleString()
    };

    // Get existing comments from localStorage
    let comments = JSON.parse(localStorage.getItem("comments")) || [];

    // Add new comment to the list
    comments.push(newComment);

    // Save updated comments to localStorage
    localStorage.setItem("comments", JSON.stringify(comments));

    // Clear form
    document.getElementById("comment-name").value = '';
    document.getElementById("comment-text").value = '';
    document.getElementById("comment-rating").innerText = '0';

    // Reload comments
    loadComments();
}

// Function to load and display comments
function loadComments() {
    const commentsList = document.getElementById("comments-list");
    const comments = JSON.parse(localStorage.getItem("comments")) || [];

    commentsList.innerHTML = ''; // Clear the comment list

    comments.forEach(comment => {
        const commentDiv = document.createElement("div");
        commentDiv.classList.add("comment-card");
        commentDiv.innerHTML = `
            <p><strong>${comment.name}</strong> <small>(${comment.timestamp})</small></p>
            <p>${comment.text}</p>
            <p>Rating: ${comment.rating} / 5</p>
        `;
        commentsList.appendChild(commentDiv);
    });
}

// Function to set the rating for the comment
function rateComment(rating) {
    document.getElementById("comment-rating").innerText = rating;
}


