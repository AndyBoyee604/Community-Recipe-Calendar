async function editRecipeFormHandler(event) {
    event.preventDefault();
  
    const recipe_title = document.querySelector('input[name="recipe_title"]').value.trim();
    const description = document.querySelector('input[name="description"]').value.trim();
    const ingredients = document.querySelector('textarea[name="ingredients"]').value.trim();
    const instructions = document.querySelector('textarea[name="instructions"]').value.trim();

    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];

    
    const response = await fetch(`/api/recipes/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        recipe_title,
        description,
        ingredients,
        instructions,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
     
    if (response.ok) {
      document.location.replace('/recipe');
    } else {
      alert(response.statusText);
    }
  }
  
  
  document.querySelector('.edit-recipes-form').addEventListener('submit', editRecipeFormHandler);