const newCommentFormHandler = async (event) => {
    event.preventDefault();
  
    const blog_id = event.target.getAttribute('data-id');
    const body = document.querySelector('#body2').value.trim();
  
    const response = await fetch (`/comments/${blog_id}`, {
      method: 'POST',
      body: JSON.stringify({blog_id, body}),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        document.location.reload();
      } else {
        alert(response.statusText);
      }
    };
  
  document
    .querySelector('.newComment-form')
    .addEventListener('submit', newCommentFormHandler)