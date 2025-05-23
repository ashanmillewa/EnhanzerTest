import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addBook } from '../Services/bookService';

const AddBook: React.FC = () => {
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: '',
    author: '',
    isbn: '',
    publicationDate: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addBook(book);
      alert('Book added successfully');
      navigate('/');
    } catch (error) {
      console.error('Error adding book:', error);
      alert('Failed to add book');
    }
  };

  return (
    <div className="max-w-md w-full mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-6 rounded-lg shadow-md border">
        <h2 className="text-xl font-bold mb-6 text-center">Add New Book</h2>
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
            <label className="block text-sm font-medium mb-1">Publication Date</label>
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
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition duration-200"
          >
            ➕ Add Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
