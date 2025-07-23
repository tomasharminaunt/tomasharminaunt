// src/components/MyPage.jsx
import { useState } from "react";

export default function MyPage() {
  const initialRecipes = [
    {
      id: 1,
      title: "Recipe1",
      imageUrl: "https://www.tasteofhome.com/wp-content/uploads/2024/11/The-Ultimate-Grilled-Cheese_EXPS_TOHD24_11861_AlejandroMonfort_5.jpg?w=892",
      description: "Classic grilled cheese sandwich with melted cheddar.",
      instructions: [
        "Heat a pan over medium-low heat and spread butter on one side of each bread slice.",
        "Place bread butter-side down, top one slice with cheddar cheese, then cover with the other slice.",
        "Cook until both sides are golden (about 1-2 minutes per side).",
        "Slice in half and serve hot."
      ],
    },
    {
      id: 2,
      title: "Recipe2",
      imageUrl: "https://recipe1.ezmember.co.kr/cache/recipe/2018/05/26/d0c6701bc673ac5c18183b47212a58571.jpg",
      description: "Soy‑sauce egg rice topped with a runny yolk.",
      instructions: [
        "Place a bowl of hot cooked rice on the table and crack a raw egg yolk in the center.",
        "Drizzle 1 tbsp soy sauce and 1 tsp sesame oil evenly over the rice.",
        "Stir quickly with a spoon until fully mixed and slightly creamy.",
        "Optionally sprinkle chopped green onions or sesame seeds before serving."
      ],
    },
  ];

  const [savedRecipes, setSavedRecipes] = useState(initialRecipes);
  const [customRecipes, setCustomRecipes] = useState([]);

  const cancelRecipe = (id) => {
    setSavedRecipes((prev) => prev.filter((r) => r.id !== id));
  };

  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");

  const addCustomRecipe = () => {
    if (!newTitle.trim()) {
      alert("Please enter a title");
      return;
    }
    setCustomRecipes((prev) => [
      ...prev,
      { id: Date.now(), title: newTitle.trim(), description: newDesc.trim() },
    ]);
    setNewTitle("");
    setNewDesc("");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">MyPage</h1>

      {/* Saved Recipes */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Saved Recipes</h2>
        {savedRecipes.length === 0 ? (
          <p>No recipes saved.</p>
        ) : (
          <ul className="space-y-6">
            {savedRecipes.map((r) => (
              <li key={r.id} className="border p-4 rounded shadow">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{r.title}</span>
                  <button
                    onClick={() => cancelRecipe(r.id)}
                    className="px-2 py-1 border rounded"
                  >
                    Cancel
                  </button>
                </div>
                <img
                  src={r.imageUrl}
                  alt={r.title}
                  className="w-32 h-32 object-cover rounded mb-2"
                />
                <p className="italic mb-2">{r.description}</p>
                {r.instructions && (
                  <ol className="list-decimal list-inside mb-2">
                    {r.instructions.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Add Custom Recipe */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Add Custom Recipe</h2>
        <div className="flex flex-col space-y-2 max-w-sm">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Recipe Title"
            className="border p-2 rounded"
          />
          <textarea
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            placeholder="Description"
            className="border p-2 rounded"
          />
          <button
            onClick={addCustomRecipe}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save Recipe
          </button>
        </div>
      </section>

      {/* Custom Recipes List */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Custom Recipes</h2>
        {customRecipes.length === 0 ? (
          <p>No custom recipes yet.</p>
        ) : (
          <ul className="list-disc pl-5 space-y-2">
            {customRecipes.map((r) => (
              <li key={r.id}>
                <strong>{r.title}</strong> — {r.description}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
