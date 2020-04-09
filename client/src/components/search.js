import React, {useRef, useState, useEffect} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import API from "../utils/API";
import Favorite from "./favorite";
function Search() {
    const searchRef = useRef();
    const [searchedBooks, setSearchedBooks] = useState({
        books: []
    });

    const handleSubmit = e => {
        e.preventDefault();
        searchBooks();
    };

    useEffect(()=>{
        searchRef.current.value = "Harry Potter";
        searchBooks();

    },[]);

    function searchBooks() {
        API.getBooks(searchRef.current.value)
        .then(result => {
            if(result.data.totalItems === 0)
                setSearchedBooks({books: []});
            else {
                var resultBooks = [];
                for(var i=0; i<result.data.items.length; i++) {
                    var book = result.data.items[i];
                    var desc = book.volumeInfo.description !== undefined ? book.volumeInfo.description : "";
                    var imageSrc = book.volumeInfo.imageLinks !== undefined ? book.volumeInfo.imageLinks.smallThumbnail : "default.png";
                    var searchedBook = {
                        authors: book.volumeInfo.authors,
                        description: desc,
                        image: imageSrc,
                        link: book.volumeInfo.infoLink,
                        title: book.volumeInfo.title,
                    }
                    resultBooks.push(searchedBook);
                }
                setSearchedBooks({books: resultBooks});
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
                    </form>   
                    </Col>            
                </Row>
                <Row className="styleRow">
                    {searchedBooks.books.length ? (
                        searchedBooks.books.map(book => (
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
                        ))
                    ) : (
                        <h6>No search results found!</h6>
                    )}
                </Row>
            </Container>
        </div>
    )
}

export default Search;