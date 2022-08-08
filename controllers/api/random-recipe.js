// //function to get random meal
// const getRandomMeal = async () => {
//   const random = await fetch(
//     "https://www.themealdb.com/api/json/v1/1/random.php"
//   );
//   const randomData = await random.json();
//   const randomMeal = randomData.meals[0];

//   addMeal(randomMeal, true);
// };
// getRandomMeal();

// const getMealById = async (id) => {
//   const random = await fetch(
//     "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
//   );
//   const randomData = await random.json();
//   const meal = randomData.meals[0];
//   return meal;
// };
