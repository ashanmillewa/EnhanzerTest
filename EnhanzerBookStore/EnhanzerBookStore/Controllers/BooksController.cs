using Microsoft.AspNetCore.Mvc;
using EnhanzerBookStore.Models;

namespace EnhanzerBookStore.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BooksController : ControllerBase
    {
        private static List<Book> books = new List<Book>
        {
            new Book { Id = 1, Title = "Sample Book", Author = "John Doe", ISBN = "123456", PublicationDate = DateOnly.Parse("2025/05/21") }
        };

        [HttpGet("GetAllBooks")]
        public ActionResult<IEnumerable<Book>> GetAllBooks()
        {
            try
            {
                return Ok(books);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("GetBookById/{id}")]
        public ActionResult<Book> GetBookById(int id)
        {
            try
            {
                var book = books.FirstOrDefault(b => b.Id == id);
                if (book != null)
                {
                    return Ok(book);
                }
                else
                {
                    return NotFound($"Book with ID {id} not found.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        
        [HttpPost("AddBook")]
        public ActionResult AddBook(Book newBook)
        {
            try
            {
                if (newBook != null)
                {
                    newBook.Id = books.Count > 0 ? books.Max(b => b.Id) + 1 : 1;

                    books.Add(newBook);
                    return Ok(newBook);

                }
                else
                { 
                    return BadRequest("Book data is null.");
                }

                
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut("UpdateBook/{id}")]
        public ActionResult UpdateBook(int id, Book updatedBook)
        {
            try
            {
                if (updatedBook == null)
                {
                    return BadRequest("Updated book data is null.");
                }

                var book = books.FirstOrDefault(b => b.Id == id);
                if (book != null)
                {
                    book.Title = updatedBook.Title;
                    book.Author = updatedBook.Author;
                    book.ISBN = updatedBook.ISBN;
                    book.PublicationDate = updatedBook.PublicationDate;

                    return Ok(book);
                }
                else
                {
                    return NotFound($"Book with ID {id} not found.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpDelete("DeleteBook/{id}")]
        public ActionResult DeleteBook(int id)
        {
            try
            {
                var book = books.FirstOrDefault(b => b.Id == id);
                if (book != null)
                {
                    books.Remove(book);
                    return Ok($"Book with ID {id} deleted successfully.");
                }
                else
                {
                    return NotFound($"Book with ID {id} not found.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
