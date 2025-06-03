import { useState } from 'react';

function RecipeForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, user_id: user.id })
      });
      const result = await res.json();
      if (res.ok) {
        onAdd(); // neu laden
        setTitle('');
        setDescription('');
      } else {
        alert(result.message);
      }
    } catch (err) {
      console.error('Fehler beim Speichern:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
      <h3>Neues Rezept</h3>
      <input
        type="text"
        placeholder="Titel"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      /><br />
      <textarea
        placeholder="Beschreibung"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      ></textarea><br />
      <button type="submit">Speichern</button>
    </form>
  );
}

export default RecipeForm;
