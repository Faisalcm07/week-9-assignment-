import { revalidatePath } from "next/cache";
import pg from "pg";

const db = new pg.Pool({
  connectionString: process.env.DB_CONN,
});

export default async function AddComment({ id }) {
  async function handleComment(formData) {
    "use server";
    const { comment } = Object.fromEntries(formData);
    
    await db.query(
      "INSERT INTO comments (comment, movie_id) VALUES ($1, $2)",
      [comment, id]
    );
    
    revalidatePath(`/movies/${id}`);
  }

  return (
    <div className="add-comment-form">
      <form action={handleComment}>
        <label htmlFor="comment">Enter a comment</label>
        <textarea placeholder="Enter a comment" name="comment" required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}