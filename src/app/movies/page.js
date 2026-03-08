import Link from "next/link";
import { redirect } from "next/navigation";
import pg from "pg";
import Navbar from "../components/nav";


const db = new pg.Pool({
  connectionString: process.env.DB_CONN,
});

export default async function posts() {

  const result = await db.query("SELECT id, movie, director, description, image FROM movies");
  const movies = result.rows;

  async function handleDelete(formData) {
    "use server";
    
    const id = formData.get("id");
    await db.query("DELETE FROM movies WHERE id = $1", [id]);
    redirect("/movies");
  }

  return (
    
  <div>
    <Navbar/>
    <div className="movies-container">
      <h1>Movies</h1>
      {movies && movies.length > 0 ? (
        movies.map((movie) => (
          <div key={movie.id} className="card">
            <img src={movie.image} alt={movie.movie} className="img" />
            <span>{movie.movie}</span>
            <p className="job">{movie.director}</p>

             <div className="card-buttons">
            <Link href={`/movies/${movie.id}`}>
                <button type="button" className="details-btn">Details</button>
              </Link>
            <form action={handleDelete}>
              <input name="id" type="hidden" value={movie.id} />
              <button type="submit">Delete</button>
            </form>
            </div>
          </div>
        ))
      ) : (
        <p style={{ color: "white" }}>No movies found</p>
      )}
    </div>
    </div>
  
  );

}