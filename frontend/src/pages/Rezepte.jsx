import { useEffect, useState } from 'react';
import RecipeForm from '../components/RecipeForm';
import CommentSection from '../components/CommentSection';


function Rezepte() {
  const [recipes, setRecipes] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetch('http://localhost:3000/api/recipes')
      .then(res => res.json())
      .then(data => setRecipes(data))
      .catch(err => console.error('Fehler beim Laden:', err));
  }, []);

  const handleLike = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/recipes/${id}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.id })
      });
      const result = await res.json();
      // Nach dem Liken neu laden
      const updated = await fetch('http://localhost:3000/api/recipes');
      const data = await updated.json();
      setRecipes(data);
    } catch (err) {
      console.error('Fehler beim Liken:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Wirklich löschen?')) return;

    try {
      await fetch(`http://localhost:3000/api/recipes/${id}`, {
        method: 'DELETE'
      });
      setRecipes(prev => prev.filter(r => r.id !== id));
    } catch (err) {
      console.error('Fehler beim Löschen:', err);
    }
  };

  return (
    <div>
  <h2>Alle Rezepte</h2>
  <RecipeForm onAdd={() => window.location.reload()} />
  {recipes.map((r) => (
    <div key={r.id} style={{ border: '1px solid #ccc', margin: '1rem', padding: '1rem' }}>
      <h3>{r.title}</h3>
      <p>{r.description}</p>
      <small>Von {r.display_name}</small>
      <p>❤️ {r.likes} Likes</p>
      <button onClick={() => handleLike(r.id)}>Like</button>
      {user.id === r.user_id && (
        <button onClick={() => handleDelete(r.id)}>Löschen</button>
      )}
      <CommentSection recipeId={r.id} />
    </div>
  ))}
</div>

  );
}

export default Rezepte;
