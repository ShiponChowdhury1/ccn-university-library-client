import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(`https://ccn-library-mangemenet-backend.vercel.app/api/books/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error("Failed to fetch book");
        }
        return res.json();
      })
      .then(data => {
        setBook(data);
        setError("");
      })
      .catch(err => {
        console.error(err);
        setError("Something went wrong!");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center text-2xl py-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 text-xl py-10">{error}</p>;

  return (
    <div className="max-w-2xl mx-auto p-5 space-y-4">
      <img src={book.imageUrl} alt={book.title} className="w-full h-96 object-cover rounded-xl" />
      <h2 className="text-3xl font-bold">{book.title}</h2>
      <p className="text-lg">Author: {book.author}</p>
      <p className="text-yellow-500 font-semibold">⭐ {book.rating}/5</p>
      <p className="text-gray-700">{book.description}</p>
    </div>
  );
};

export default BookDetails;
