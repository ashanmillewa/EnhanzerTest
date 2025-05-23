import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBookById, updateBook } from "../Services/bookService";

interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  publicationDate: string;
}

const EditBook: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book>({
    id: 0,
    title: "",
    author: "",
    isbn: "",
    publicationDate: "",
  });

  useEffect(() => {
    if (!id) return;

    getBookById(Number(id))
      .then((data) => {
        setBook({
          id: data.id,
          title: data.title,
          author: data.author,
          isbn: data.isbn,
          publicationDate: data.publicationDate.split("T")[0],
        });
      })
      .catch((error) => {
        console.error("Error fetching book:", error);
        alert("Failed to load book");
      });
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!id) return;

    updateBook(Number(id), book)
      .then(() => {
        alert("Book updated successfully");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error updating book:", error);
        alert("Failed to update book");
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-md w-full mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-6 rounded-lg shadow-md border">
        <h2 className="text-xl font-bold mb-6 text-center">Edit Book</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={book.title}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Author</label>
            <input
              type="text"
              name="author"
              value={book.author}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">ISBN</label>
            <input
              type="text"
              name="isbn"
              value={book.isbn}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">
              Publication Date
            </label>
            <input
              type="date"
              name="publicationDate"
              value={book.publicationDate}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            ⟳ Update Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBook;
