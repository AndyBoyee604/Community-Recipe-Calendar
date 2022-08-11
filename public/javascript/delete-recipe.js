async function deleteRecipe(event) {
    event.preventDefault();
  
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`api/recipes/${id}`, {
      method: 'DELETE',
    });
    console.log(id);
    
  
    if (response.ok) {
      document.location.replace('/recipe');
    } else {
      alert(response.statusText);
    }
  }
  
 

  document.querySelector('#delete-post-btn').addEventListener('click', deleteRecipe);