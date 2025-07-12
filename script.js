const API_KEY = "fc1a1cc7a4d74de1b50fbde982028f99";
let currentRecipes = [], reviews = {};
let filter = { category: 'All', cuisine: 'All' };

document.addEventListener("DOMContentLoaded", () => {
  const imgEl = document.getElementById("manual-image");
  if (imgEl) imgEl.addEventListener("change", uploadPreview);
  routePages();
});

function uploadPreview(e) {
  const file = e.target.files[0];
  if (!file) return;
  const fr = new FileReader();
  fr.onload = () => {
    const img = document.getElementById("manual-preview");
    img.src = fr.result;
    img.style.display = "block";
  };
  fr.readAsDataURL(file);
}

function routePages() {
  const path = location.pathname.split("/").pop();
  if (path === "results.html") return; 
  if (path === "recipe.html") loadRecipeDetail();
 
}

function searchRecipes() {
  const ing = document.getElementById("ingredient-input").value.trim();
  if (!ing) return alert("Enter ingredients.");
  fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ing}&number=10&apiKey=${API_KEY}`)
    .then(r => r.json())
    .then(data => {
      if (!Array.isArray(data)) throw new Error("Bad API");
      currentRecipes = data.map(r => ({
        ...r,
        category: ['Lunch','Dinner','Snacks'][r.id % 3],
        cuisine: ['Italian','Korean','Other'][r.id % 3]
      }));
      renderRecipes(currentRecipes);
    }).catch(e => { console.error(e); alert("Search failed"); });
}

function sortResults() {
  const opt = document.getElementById("sort-options").value;
  if (opt === "simple") currentRecipes.sort((a, b) => a.title.localeCompare(b.title));
  else if (opt === "fast") currentRecipes.sort((a, b) => (a.readyInMinutes||0)-(b.readyInMinutes||0));
  else if (opt === "top-rated") currentRecipes.sort((a, b) => (b.likes||0)-(a.likes||0));
  renderRecipes(currentRecipes);
}

function filterBy(type, val) {
  filter[type] = val;
  renderRecipes(currentRecipes);
}

function renderRecipes(list) {
  const results = document.getElementById("recipe-results");
  if (!results) return;
  results.innerHTML = "";
  list.filter(r => filter.category === 'All' || r.category === filter.category)
      .filter(r => filter.cuisine === 'All' || r.cuisine === filter.cuisine)
      .forEach(r => {
        const div = document.createElement("div");
        div.innerHTML = `
          <h3>${r.title}</h3>
          <small>${r.category} · ${r.cuisine}</small>
          <img src="${r.image}" />
          <button onclick="getRecipeDetails(${r.id})">View Details</button>
        `;
        results.appendChild(div);
      });
}

function getRecipeDetails(id) {
  fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
    .then(r => r.json())
    .then(recipe => {
      const container = document.getElementById("recipe-detail") || document.getElementById("recipe-results");
      if (!container) return window.location.href = "404.html";
      container.innerHTML = `
        <div>
          <h2>${recipe.title}</h2>
          <img src="${recipe.image}" />
          <p><strong>Instructions:</strong> ${recipe.instructions || "No instructions."}</p>
          <h3>User Reviews</h3>
          <div id="reviews-section"></div>
          <textarea id="review-text" placeholder="Write your review"></textarea>
          <button id="submit-review-btn">Submit Review</button>
        </div>
      `;
      document.getElementById("submit-review-btn")
        .addEventListener("click", () => addReview(recipe.title));
      displayReviews(recipe.title);
    }).catch(() => window.location.href = "404.html");
}

function addReview(title) {
  const text = document.getElementById("review-text").value.trim();
  if (!text) return;
  if (!reviews[title]) reviews[title] = [];
  reviews[title].push(text);
  document.getElementById("review-text").value = "";
  displayReviews(title);
}

function displayReviews(title) {
  const sec = document.getElementById("reviews-section");
  if (!sec) return;
  sec.innerHTML = "";
  (reviews[title] || []).forEach((r, i) => {
    const p = document.createElement("p");
    p.innerText = `Review ${i+1}: ${r}`;
    sec.appendChild(p);
  });
}

function addManualRecipe() {
  const title = document.getElementById("manual-title").value.trim();
  const img = document.getElementById("manual-preview")?.src;
  const steps = document.getElementById("manual-steps").value.trim();
  const cat = document.getElementById("manual-category").value;
  const cui = document.getElementById("manual-cuisine").value;

  if (!title || !steps || !img || !cat || !cui)
    return alert("Fill all fields: title, image, steps, category, cuisine");

  const div = document.createElement("div");
  div.innerHTML = `
    <h3>${title}</h3><small>${cat} · ${cui}</small>
    <img src="${img}" /><p>${steps}</p>
  `;
  document.getElementById("manual-recipe-list").appendChild(div);
}
