function Home({ user }) {
  if (!user) {
    return (
      <div>
        <p>Bitte logge dich ein, um dein Kochbuch zu sehen.</p>
        <h2>Hallo unbekannter!</h2>
      </div>
    );
  }
  return (
    <div>
      <h2>Hallo {user.display_name}, willkommen in deinem Kochbuch!</h2>
      <p>Hier kannst du deine Lieblingsrezepte speichern, bearbeiten und teilen.</p>
    </div>
  );
}

export default Home;
