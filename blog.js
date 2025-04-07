fetch('https://api.sheetbest.com/sheets/5663ff34-e948-498c-95c2-6421cd3d8a1b')
  .then(response => response.json())
  .then(posts => {
    const blogContainer = document.getElementById('blog-posts');

    posts.forEach(post => {
      const postElement = document.createElement('div');
      postElement.classList.add('blog-post');
    //   <img src="https://imgur.com/YsI8Bxo.png" alt="${post.Title}" style="width:100%; height:auto; margin-bottom: 10px;">

    // <a href="https://www.linkedin.com/shareArticle?mini=true&url=https://yourwebsite.com&title=${encodeURIComponent(post.Title)}&summary=${encodeURIComponent(post.Content)}" target="_blank">
      postElement.innerHTML = `
        <img src="https://i.imgur.com/YsI8Bxo.png" alt="${post.Title}" style="width:100%; height:auto; margin-bottom: 10px;">
        <h2>${post.Title}</h2>
        <p><small>By ${post.Author} on ${post.Date}</small></p>
        <p>${post.Content}</p>
      
           <a href="https://www.linkedin.com/shareArticle?mini=true&url=https://zakaatech.com/about.html&title=${encodeURIComponent(post.Title)}&summary=${encodeURIComponent(post.Content)}" target="_blank">share the in linked in</a>
      `;
    //   document.addEventListener('DOMContentLoaded', function () {
    //     const currentURL = window.location.href;  // Get the current page URL
    //     const title = encodeURIComponent("Your Blog Post Title");  // Replace with your post title dynamically
    //     const content = encodeURIComponent("Your blog post summary or content");  // Replace with your post content dynamically
        
    //     // Dynamically set the href for LinkedIn share button
    //     document.getElementById('linkedin-share').href = `https://www.linkedin.com/shareArticle?mini=true&url=${currentURL}&title=${title}&summary=${content}`;
    //   });

      console.log(encodeURIComponent(post.Title))
console.log(post.ImageURL);
      blogContainer.appendChild(postElement);
    });
  })
  .catch(error => console.error('Error loading blog posts:', error));
