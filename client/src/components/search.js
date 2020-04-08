import React, {useRef, useState, useEffect} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import API from "../utils/API";

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
    },[])

    function searchBooks() {
        API.getBooks(searchRef.current.value)
        .then(result => {
            console.log(result.data);
            if(result.data.totalItems === 0)
                setSearchedBooks({books: []});
            else
                setSearchedBooks({books: result.data.items});
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
                                <h5>{book.volumeInfo.title}</h5>
                                <p>Author: {book.volumeInfo.authors.join(", ")}</p>
                                <div className="styleGrid"> 
                                        {(book.volumeInfo.imageLinks === undefined) ? 
                                            <img className="styleImage" src="default.png" alt="book image"></img> :
                                            <img className="styleImage" src={book.volumeInfo.imageLinks.smallThumbnail} alt="book image"></img>
                                        }
                                    <div>
                                        <p>{book.volumeInfo.description}</p>   
                                    </div>
                                </div>  
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