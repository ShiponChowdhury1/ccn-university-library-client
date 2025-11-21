import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { fetchBooksApi } from "../../api/booksApi";
import { Link } from "react-router-dom";

const BookList = ({ searchQuery, selectedCategories, selectedRating, sortBy }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const response = await fetchBooksApi();
        setBooks(response.data || []);
        setError("");
      } catch (err) {
        setError("Failed to load books");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

  // Filter and sort books
  const filteredBooks = books.filter((book) => {
    // Search filter
    if (searchQuery && !book.title?.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !book.author?.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Department/Category filter (using department field from sidebar)
    if (selectedCategories.length > 0 && !selectedCategories.includes("All Books")) {
      if (!selectedCategories.includes(book.department)) {
        return false;
      }
    }

    // Rating filter
    if (selectedRating && book.rating < selectedRating) {
      return false;
    }

    return true;
  });

  // Sort books
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortBy === "Recently Added") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortBy === "Alphabetical (A-Z)") {
      return a.title?.localeCompare(b.title);
    } else if (sortBy === "Alphabetical (Z-A)") {
      return b.title?.localeCompare(a.title);
    } else if (sortBy === "Most Borrowed") {
      return (b.borrowCount || 0) - (a.borrowCount || 0);
    }
    return 0;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl font-semibold text-gray-600 dark:text-gray-400">Loading books...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl font-semibold text-red-600 dark:text-red-400">{error}</div>
      </div>
    );
  }

  if (sortedBooks.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl font-semibold text-gray-600 dark:text-gray-400">No books found</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 p-4">
      {sortedBooks.map((book) => (
        <Link
          to={`/books/${book._id}`}
          key={book._id}
          className="rounded-2xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl border-2 border-green-200 dark:border-green-700 bg-white dark:bg-gray-800"
        >
          <img
            src={book.imageUrl || "https://via.placeholder.com/300x200?text=No+Image"}
            alt={book.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 truncate">{book.title}</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">by {book.author}</p>
            {book.department && (
              <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold mt-1">📚 {book.department}</p>
            )}
            {book.category && (
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">{book.category}</p>
            )}
            <div className="mt-2 flex">
              {Array.from({ length: 5 }).map((_, index) => (
                <span
                  key={index}
                  className={index < (book.rating || 0) ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

BookList.propTypes = {
  searchQuery: PropTypes.string,
  selectedCategories: PropTypes.array,
  selectedRating: PropTypes.number,
  sortBy: PropTypes.string,
};

export default BookList;