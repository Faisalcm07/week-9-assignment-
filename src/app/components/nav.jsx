import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar">
        <Link href="/">Home</Link>
        <Link href="/movies">Movies</Link>
        <Link href="/new-movie">Add Movie</Link>
    </nav>
  );
}