import axios from "axios";
const myAPIkey = "&key=AIzaSyAWJ_2j6NPdAYuLB3EnZZAwZ_JKjhQOReQ";
const booksUrl = "https://www.googleapis.com/books/v1/volumes?q=";
export default {

    // Gets the books with the given search text
    getBooks: function (name) {
        return axios.get(booksUrl + name + myAPIkey);
    },
    // Gets all favorite books
    getFavBooks: function () {
        return axios.get("/api/books");
    },
    // Deletes the post with the given id
    deleteBook: function (id) {
        return axios.delete("/api/books/" + id);
    },
    // Saves a post to the database
    saveBook: function (postData) {
        return axios.post("/api/books", postData);
    }
};
