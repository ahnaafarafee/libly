# Libly
##### _An API for a local small bookshop. Built with Node.js, Express and MongoDB_

## _From commit `0f6d85d` onwards, whole file system was changed for error handling feature and advanced coding practices. So for future references, copy the repo from commit `0f6d85d`_

### Core Features

For a beginner, a basic bookstore API should focus on the core functionalities of managing books and users. Here's a breakdown:

#### Books
* **CRUD operations:**
    * Create a book (title, author, description, price, ISBN, genre, image URL, quantity)
    * Read a book by ID
    * Update book information
    * Delete a book
* **Search and filtering:**
    * Search books by title, author, or genre
    * Filter books by price range, availability (in stock or out of stock)
* **Book recommendations:** (Optional for beginners)
    * Basic recommendation system based on genre or author

#### Users
* **User authentication:** (Optional for beginners)
    * User registration (name, email, password)
    * User login
    * JWT token-based authentication
* **User management:**
    * View user profile
    * Update user information
    * Password reset

#### Orders
* **Order creation:**
    * Add books to cart
    * Checkout and place order (user information, shipping address, payment details)
* **Order management:**
    * View order history
    * Order status (pending, shipped, delivered)

### API Endpoints

Here are some basic API endpoints to get you started:

**Books**
* `/books`: Get all books
* `/books/:id`: Get a book by ID
* `/books/search`: Search books by title, author, or genre
* `/books/filter`: Filter books by price range, availability
* `/books/create`: Create a new book (admin only)
* `/books/:id/update`: Update a book (admin only)
* `/books/:id/delete`: Delete a book (admin only)

**Users**
* `/users/register`: Register a new user
* `/users/login`: User login
* `/users/profile`: Get user profile
* `/users/update`: Update user information
* `/users/password-reset`: Password reset

**Orders**
* `/orders/cart`: Add/remove books from cart
* `/orders/checkout`: Place an order
* `/orders/history`: Get order history

### Database Structure

Your MongoDB database will have collections for:
* `books`: Store book information (title, author, description, price, ISBN, genre, image URL, quantity)
* `users`: Store user information (name, email, password, address, etc.)
* `orders`: Store order information (user ID, book IDs, quantities, total price, status)

### Additional Considerations

* **Error handling:** Implement proper error handling and return informative error messages.
* **Data validation:** Validate input data to prevent invalid data from being stored.
* **Security:** Protect user data with strong password hashing and encryption.
* **Pagination:** Implement pagination for large book lists.
* **Image handling:** Consider using a cloud storage service for book images and store image URLs in the database.
* **Testing:** Write unit and integration tests to ensure API reliability.
* **Code structure:** Organize your code into clear and maintainable modules.
