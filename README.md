# Google-Books-Search
React-based Google Books Search is an app to search for books using Google Books API with an option to save the user's favorite books in one place.

It is a MERN stack application using React as front-end with an Express server storing the user's favorite books in a Mongo database.

When the user loads the Google Books Search App, they can -
   * __Search for a book__ - This invokes the Google Books API and renders the search results on the screen. 
   * __View a book__ - The 'Read More' button brings the user to the book on Google Books.
   * __Save a book__ - Clicking on the :heart: button saves the book to the favorite books in Mongo database.
   * __View Favorites__ - Displays all favorite books saved in the favorites database. 
   * __Delete from favorites__ - Removes the book from the favorites database.

## User Story

* As a user, I want to search for books from Google Books and save my favorite books in the app for referring back to them in the future.

## Technologies Used

 * React
 * Node & Express server
 * Mongodb using Mongoose 
 * Deployed on Heroku

## Deployed Application URL 

https://fav-books-app.herokuapp.com/

## Application Screenshot
![Project Snapshot](https://github.com/ananya92/My-Portfolio/blob/master/src/components/projects/img/pr3_1.PNG)
***
![Project Snapshot](https://github.com/ananya92/My-Portfolio/blob/master/src/components/projects/img/pr3_2.PNG)
