# Google-Books-Search
React-based Google Books Search is an app to search for books using Google Books API with an option to save the user's favorite books in one place.

It is a MERN stack application using React as front-end with an Express server storing the user's favorite books in a Mongo database.

When the user loads the Google Books Search App, they can -
   * "Search for a book" - This invokes the Google Books API and renders the search results on the screen. 
   * "View a book" - The 'Read More' button brings the user to the book on Google Books.
   * "Save a book" - Clicking on the &#xf08a; button saves the book to the Mongo database.
   * "View Favorites" - Renders all favorite books saved in the Mongo database. 
   * "Delete a book" - Removes the book from the favorites database.

## User Story

* As a user, I want to search for books from Google Books and save my favorite books in the app for referring back to them in the future.

## Technologies Used

 * React
 * Node and Express server
 * Mongodb using Mongoose 
 * Deployed on Heroku

## Deployed Application URL 

https://fav-books-app.herokuapp.com/