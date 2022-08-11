const randomizeMe = document.getElementById("random-meal");
const recipeSection = document.getElementById("recipe");

randomizeMe.addEventListener("click", () => {
  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((res) => res.json())
    .then((res) => {
      createMeal(res.meals[0]);
    })
    .catch((e) => {
      console.warn(e);
    });
});

const createMeal = (meal) => {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }

  const htmlSection = `
		<div>
			<div>
				<img id="random-img" src="${meal.strMealThumb}" alt="">
				${
          meal.strCategory
            ? `<p><strong>Category:</strong> ${meal.strCategory}</p>`
            : ""
        }
				${meal.strArea ? `<p><strong>Area:</strong> ${meal.strArea}</p>` : ""}
				${
          meal.strTags
            ? `<p><strong>Tags:</strong> ${meal.strTags
                .split(",")
                .join(", ")}</p>`
            : ""
        }
        <br>
				<p class="subtitle is-5 has-text-weight-medium has-text-grey-dark is-underlined">Recipe Ingredients:</p>
				<ul>
					${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}
				</ul>
			</div>
      <br>
			<div>
      <p class="subtitle is-5 has-text-weight-medium has-text-grey-dark is-underlined">Cooking Directions</p>
				<h4>${meal.strMeal}</h4>
				<p>${meal.strInstructions}</p>
			</div>
		</div>
    <br>
    <br>
		
	`;
  recipeSection.innerHTML = htmlSection;
};
