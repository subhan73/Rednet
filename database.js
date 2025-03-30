function createPost() {
    let postText = document.getElementById("postText").value.trim();
    if (!postText) return alert("Post cannot be empty.");

    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.unshift({ text: postText, user: currentUser, timestamp: Date.now() }); // Add new post at the top
    localStorage.setItem("posts", JSON.stringify(posts));
    localStorage.setItem("newPost", Date.now()); // Notify other tabs

    document.getElementById("postText").value = "";
    displayPosts(); // Update UI immediately
}

function displayPosts() {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    let postContainer = document.getElementById("postContainer");
    postContainer.innerHTML = "";
    
    posts.forEach(post => {
        let postElement = document.createElement("div");
        postElement.className = "post";
        postElement.innerHTML = `<strong>${post.user}</strong>: ${post.text}`;
        postContainer.appendChild(postElement);
    });
}

// Load posts on page load
displayPosts();

// Listen for new posts in other tabs
window.addEventListener("storage", function(event) {
    if (event.key === "newPost") {
        displayPosts();
    }
});
