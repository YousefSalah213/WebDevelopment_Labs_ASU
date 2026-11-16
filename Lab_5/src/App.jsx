import { useState } from "react";
import "./App.css";

function MovieItem({ movie, onDelete }) {
  return (
    <div className="movie-card">
      <div className="movie-header">
        <h3>{movie.title}</h3>
        <span className="stars">{"⭐".repeat(movie.rating)}</span>
      </div>
      <p className="review">"{movie.review}"</p>
      <button className="delete-btn" onClick={() => onDelete(movie.id)}>
        Remove
      </button>
    </div>
  );
}

function App() {
  const [movies, setMovies] = useState([
    { id: 1, title: "Inception", review: "Mind-bending masterpiece!", rating: 5 },
    { id: 2, title: "Interstellar", review: "Amazing visuals and soundtrack.", rating: 4 }
  ]);

  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);

  const handleAddMovie = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newMovie = {
      id: Date.now(),
      title: title,
      review: review || "No review added.",
      rating: Number(rating)
    };

    setMovies([...movies, newMovie]);
    setTitle("");
    setReview("");
    setRating(5);
  };

  const handleDeleteMovie = (id) => {
    setMovies(movies.filter((movie) => movie.id !== id));
  };

  return (
    <div className="container">
      <h1>🎬 Movies Watch List</h1>

      <form onSubmit={handleAddMovie} className="movie-form">
        <input
          type="text"
          placeholder="Movie Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Write a comment review..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value="5">5 Stars (⭐⭐⭐⭐⭐)</option>
          <option value="4">4 Stars (⭐⭐⭐⭐)</option>
          <option value="3">3 Stars (⭐⭐⭐)</option>
          <option value="2">2 Stars (⭐⭐)</option>
          <option value="1">1 Star (⭐)</option>
        </select>
        <button type="submit">Add Movie</button>
      </form>

      <div className="movie-list">
        {movies.length === 0 ? (
          <p className="empty">No movies in your list yet.</p>
        ) : (
          movies.map((movie) => (
            <MovieItem
              key={movie.id}
              movie={movie}
              onDelete={handleDeleteMovie}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;