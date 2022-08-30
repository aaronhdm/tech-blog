const newBlogFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#title').value.trim();
    const description = document.querySelector('#description').value.trim();
  
    if (name && description) {
      const response = await fetch('/api/dashboard/', {
        method: 'POST',
        body: JSON.stringify({ name, description }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  document
    .querySelector('.newBlog-form')
    .addEventListener('submit', newBlogFormHandler);