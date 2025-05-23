import axios from "axios";

const API_BASE_URL = 'https://localhost:7141/api/Books';
// const API_BASE_URL = 'http://localhost:5000/api/Books';


export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  publicationDate: string;
}

//Get all books
export const getBooks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/GetAllBooks`);
    console.log("Book list loaded successfully!");
    return response.data;
  } catch (error) {
    console.error("There was an error loading the book list", error);
    throw error;
  }
};

//Add a new Book
export const addBook = async (book: Book) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/AddBook`, book);
    console.log("Book added successfully!");
    return response.data; 
  } catch (error) {
    console.error("There was an error adding the book!", error);
    throw error;
  }
};

// Get a book by ID
export const getBookById = async (id: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/GetBookById/${id}`);
    console.log("Fetched book by ID successfully");
    return response.data;
  } catch (error) {
    console.error("Error fetching book by ID:", error);
    throw error;
  }
};

// Update a book by ID
export const updateBook = async (id: number, book: Book) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/UpdateBook/${id}`, book);
    console.log("Book updated successfully");
    return response.data;
  } catch (error) {
    console.error("Error updating book:", error);
    throw error;
  }
};


// Delete a Book by ID
export const deleteBook = async (id: number) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/DeleteBook/${id}`);
    console.log("Book deleted successfully!");
    return response.data;
  } catch (error) {
    console.error("There was an error deleting the book!", error);
    throw error;
  }
};



