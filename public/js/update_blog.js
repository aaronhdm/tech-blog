const updateBlog = async (event) => {
    event.preventDefault();
  
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
    const name = document.querySelector('#title').value.trim();
    const description = document.querySelector('#description').value.trim();
  
    if (name && description) {
      const response = await fetch(`/api/dashboard/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ name, description }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        document.location.replace('/api/dashboard');
      } else {
        alert(response.statusText);
      }
    }
    }
  };
    
  document
    .querySelector('.update')
    .addEventListener('click', updateBlog);