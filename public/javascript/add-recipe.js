async function newRecipeFormHandler(event) {
    event.preventDefault();
  
    const recipe_title = document.querySelector('input[name="recipe-title"]').value;
    const description = document.querySelector('textarea[name="description"]').value;
    const ingredients = document.querySelector('textarea[name="ingredients"]').value;
    const instructions = document.querySelector('textarea[name="instructions"]').value;
    
  
    const response = await fetch(`/api/recipes`, {
      method: 'POST',
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
      document.location.render('/recipe');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.new-recipe-form').addEventListener('submit', newRecipeFormHandler);