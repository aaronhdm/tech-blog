const deleteBlog = async (event) => {
    if (event.target.hasAttribute('data-id2')) {
        const id = event.target.getAttribute('data-id2');
    
        const response = await fetch(`/api/dashboard/${id}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          document.location.replace('/api/dashboard');
        } else {
          alert('Failed to delete blog');
        }
      }
  };
  
  document
    .querySelector('.delete')
    .addEventListener('click', deleteBlog);