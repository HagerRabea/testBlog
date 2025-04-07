// Fetch blog posts
fetch('https://api.sheetbest.com/sheets/5663ff34-e948-498c-95c2-6421cd3d8a1b')
  .then(response => response.json())
  .then(posts => {
    const blogContainer = document.getElementById('blog-posts');

    posts.forEach(post => {
      const postElement = document.createElement('div');
      postElement.classList.add('blog-post');

      // Add unique post ID (important for matching comments later)
      const postId = post.ID || Math.random().toString(36).substr(2, 9); // You can get ID from your sheet

      postElement.innerHTML = `
        <img src="${post.ImageURL}.png" alt="${post.Title}" style="width:100%; height:auto; margin-bottom: 10px;">
        <h2>${post.Title}</h2>
        <p><small>By ${post.Author} on ${post.Date}</small></p>
        <p>${post.Content}</p>

        <a href="https://www.linkedin.com/shareArticle?mini=true&url=https://github.com/HagerRabea/testBlog&title=${encodeURIComponent(post.Title)}&summary=${encodeURIComponent(post.Content)}" target="_blank">
          Share on LinkedIn
        </a>

        <div class="comments-section" id="comments-${postId}">
          <h3>Comments (<span id="comment-count-${postId}">0</span>)</h3>
          <div class="comments-list" id="comments-list-${postId}">
            <!-- Comments will appear here -->
          </div>

          <form class="comment-form" id="form-${postId}">
            <input type="hidden" name="postId" value="${postId}">
            <input type="text" name="author" placeholder="Your name" required>
            <textarea name="comment" placeholder="Your comment" required></textarea>
            <button type="submit">Submit Comment</button>
          </form>
        </div>
      `;

      blogContainer.appendChild(postElement);

      // Attach event listener to each form after creating it
      const form = document.getElementById(`form-${postId}`);
      form.addEventListener('submit', function (e) {
        e.preventDefault();

        const author = form.querySelector('input[name="author"]').value;
        const comment = form.querySelector('textarea[name="comment"]').value;
        const timestamp = new Date().toISOString();

        const data = {
          post_id: postId,
          author: author,
          comment: comment,
          timestamp: timestamp
        };

        fetch(`https://api.sheetbest.com/sheets/19b25d90-3d87-42cc-8920-aea3cd0b5e20`, { // <-- Your new comments sheet URL
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(response => {
          if (response.ok) {
            // Add the comment immediately
            addCommentToPost(postId, author, comment, timestamp);
            form.reset(); // Clear the form
            alert(' submitting comment correctly');
          } else {
            alert('Error submitting comment.');
          }
        })
        .catch(error => {
          console.error('Error:', error);
          alert('Error submitting comment.');
        });
      });
    });
  })
  .catch(error => console.error('Error loading blog posts:', error));

// Function to add comment to the page immediately
function addCommentToPost(postId, author, comment, timestamp) {
  const commentsList = document.getElementById(`comments-list-${postId}`);

  const commentElement = document.createElement('div');
  commentElement.classList.add('comment');
  commentElement.innerHTML = `
    <p><strong>${author}</strong> (${new Date(timestamp).toLocaleString()}):</p>
    <p>${comment}</p>
    <hr>
  `;

  commentsList.appendChild(commentElement);

  // Increase comment count
  const countElement = document.getElementById(`comment-count-${postId}`);
  let currentCount = parseInt(countElement.innerText);
  countElement.innerText = currentCount + 1;
}
