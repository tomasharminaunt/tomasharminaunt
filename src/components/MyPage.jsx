import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../firebase";

function MyPage() {
  const [recipes, setRecipes] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true); // loading state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        setUserId(uid);
        console.log("✅ Logged in UID:", uid); // Debug log

        try {
          const q = query(
            collection(db, "savedRecipes"),
            where("uid", "==", uid)
          );

          const querySnapshot = await getDocs(q);
          const data = querySnapshot.docs.map((doc) => doc.data());
          console.log("✅ Retrieved recipes:", data); // Debug log
          setRecipes(data);
        } catch (error) {
          console.error("❌ Failed to fetch recipes from Firestore:", error);
        } finally {
          setLoading(false);
        }
      } else {
        console.log("⛔ No user is logged in.");
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">My Saved Recipes</h1>
      <p className="mb-4">This is your personal recipe collection page.</p>

      {loading ? (
        <p>Loading...</p>
      ) : recipes.length === 0 ? (
        <p>No saved recipes found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recipes.map((recipe, i) => (
            <div key={i} className="border p-4 rounded shadow">
              <h2 className="text-lg font-semibold mb-2">{recipe.title}</h2>
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-40 object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyPage;
