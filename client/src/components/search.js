import React, {useRef, useState, useEffect} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import API from "../utils/API";
import Favorite from "./favorite";
function Search() {
    const searchRef = useRef();
    // Storing the state of the searched books, the error msg if no search results are found and the isSearching state to indicate the waiting period when results are being fetched
    const [searchedBooks, setSearchedBooks] = useState({
        books: [],
        errorMsg: "",
        isSearching: false
    });

    const handleSubmit = e => {
        e.preventDefault();
        searchBooks();
    };
    // Function to get the search results from the Google Books API on the search key entered by user
    function searchBooks() {
        // Setting the isSearching state to true so that the loader icon starts rendering on screen
        setSearchedBooks({...searchedBooks, errorMsg: "", isSearching: true});
        API.getBooks(searchRef.current.value)
        .then(result => {
            // Setting the isSearching state to false to stop the loader icon from rendering as the search results have been returned from the API
            setSearchedBooks({...searchedBooks, isSearching: false});
            console.log(result.data);
            // Set the error message if no search results are returned
            if(result.data.totalItems === 0)
                setSearchedBooks({...searchedBooks, books: [], errorMsg: "No search results found"});
            else {
                // Retrieve the book information from the API result for populating on screen
                var resultBooks = [];
                for(var i=0; i<result.data.items.length; i++) {
                    var book = result.data.items[i];
                    var desc = book.volumeInfo.description !== undefined ? book.volumeInfo.description : "";
                    var imageSrc = book.volumeInfo.imageLinks !== undefined ? book.volumeInfo.imageLinks.smallThumbnail : "default.png";
                    var authors = book.volumeInfo.authors !== undefined ? book.volumeInfo.authors : ["NA"];
                    var searchedBook = {
                        authors: authors,
                        description: desc,
                        image: imageSrc,
                        link: book.volumeInfo.infoLink,
                        title: book.volumeInfo.title,
                    }
                    resultBooks.push(searchedBook);
                }
                //Set the list of searched books to the searchedBooks state which will be rendered on the screen
                setSearchedBooks({...searchedBooks, books: resultBooks});
            }
                
        })
        .catch(err => console.log(err));
    }
    return(
        <div>
            <Container>
                <Row className="styleRow">    
                <Col xs={12}>      
                    <form className="styleForm" onSubmit={handleSubmit}>
                        <input 
                            type="text"
                            placeholder="Search Book"
                            ref={searchRef}
                        ></input>
                            <button
                            type="submit"
                            >Search</button>
                            <div className={searchedBooks.isSearching ? "loader" : ""}></div>
                    </form>   
                    </Col>            
                </Row>
                
                    {searchedBooks.books.length ? (
                        <Row className="styleRow">
                        {searchedBooks.books.map(book => (
                            <Col className="styleBook">
                                <h5>{book.title}</h5>
                                <Favorite book={book} search={searchRef.current.value}></Favorite>
                                <p>Author: {book.authors.join(", ")}</p>
                                <div className="styleGrid"> 
                                    <img className="styleImage" src={book.image} alt="book image"></img>
                                    <div>
                                        <p>{book.description}</p>   
                                    </div>
                                </div>  
                                <button className="viewButton">
                                    <a href={book.link} target="_blank">Read more</a>
                                </button>
                            </Col>
                        ))}
                        </Row>
                    ) : (
                            (searchedBooks.errorMsg !== "") ? 
                            <Row className="styleRow">
                            <h6>{searchedBooks.errorMsg}</h6> 
                            </Row>
                            : ""      
                    )}
                
            </Container>
        </div>
    )
}

export default Search;