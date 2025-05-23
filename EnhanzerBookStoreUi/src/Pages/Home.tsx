import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getBooks, deleteBook } from "../Services/bookService";

interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  publicationDate: string;
}

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const data = await getBooks();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    try {
      await deleteBook(id);
      alert("Book deleted successfully");
      fetchBooks();
    } catch (error) {
      console.error("Error deleting book:", error);
      alert("Failed to delete book");
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/edit-book/${id}`);
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">📚 Book List</h1>
        <Link to="/add-book">
          <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-5 py-2 rounded-lg shadow hover:from-green-600 hover:to-green-700 transition">
            ➕  Add Book
          </button>
        </Link>
      </div>

      {/* Table View (Desktop) */}
      <div className="hidden md:block overflow-x-auto shadow rounded-lg border">
        <table className="min-w-full table-auto text-sm text-left text-gray-600">
          <thead className="bg-gray-100 text-gray-700 uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Author</th>
              <th className="px-6 py-3">ISBN</th>
              <th className="px-6 py-3">Publication Date</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {books.map((book) => (
              <tr key={book.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">{book.id}</td>
                <td className="px-6 py-4">{book.title}</td>
                <td className="px-6 py-4">{book.author}</td>
                <td className="px-6 py-4">{book.isbn}</td>
                <td className="px-6 py-4">
                  {new Date(book.publicationDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-center space-x-2">
                  <button
                    onClick={() => handleEdit(book.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded shadow-sm"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(book.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow-sm"
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card View (Mobile) */}
      <div className="block md:hidden space-y-4 mt-4">
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-white rounded-lg shadow border p-4 space-y-2"
          >
            <p><span className="font-semibold">ID:</span> {book.id}</p>
            <p><span className="font-semibold">Title:</span> {book.title}</p>
            <p><span className="font-semibold">Author:</span> {book.author}</p>
            <p><span className="font-semibold">ISBN:</span> {book.isbn}</p>
            <p><span className="font-semibold">Publication Date:</span>{" "}
              {new Date(book.publicationDate).toLocaleDateString()}
            </p>
            <div className="flex justify-end space-x-2 mt-3">
              <button
                onClick={() => handleEdit(book.id)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded shadow-sm text-sm"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => handleDelete(book.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow-sm text-sm"
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
