import React, {useRef, useState, useEffect} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import API from "../utils/API";
function Search() {
    const searchRef = useRef();
    const [searchedBooks, setSearchedBooks] = useState({
        books: []
    });
    const [favouriteBook, setFavouriteBook] = useState({
        favbook: ""
    });
    const handleSubmit = e => {
        e.preventDefault();
        searchBooks();
    };
    useEffect(()=>{
        searchRef.current.value = "Harry Potter";
        searchBooks();
    },[]);

    useEffect(() => {
        if(favouriteBook.favbook !== "") {
            var book = favouriteBook.favbook;
            var isFavorite = false;
            API.getFavBooks().then(result => {
                for(var i=0; i< result.data.length; i++) {
                    if(result.data[i].authors === book.volumeInfo.authors && result.data[i].title === book.volumeInfo.title) {
                        console.log("Book is already a favorite");
                        isFavorite = true;
                        break;
                    }
                }
                if(!isFavorite) {
                    var desc = book.volumeInfo.description !== undefined ? book.volumeInfo.description : "";
                    var imageSrc = book.volumeInfo.imageLinks !== undefined ? book.volumeInfo.imageLinks.smallThumbnail : "default.png";
                    API.saveBook({
                        authors: book.volumeInfo.authors,
                        description: desc,
                        image: imageSrc,
                        link: book.volumeInfo.infoLink,
                        title: book.volumeInfo.title,
                    })
                    .then(result => {
                        console.log(result.data);
                    })
                    .catch(err => console.log(err));
                }
            })
            .catch(err => console.log(err));
        }
    }, [favouriteBook]);

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
    function handleFavouriteChange(book) {
        setFavouriteBook({favbook: book});
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
                                <span className="favButton blueHeart" onClick = {() => handleFavouriteChange(book)}>
                                    <i class="fa fa-heart"></i>
                                </span>
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
                                <button className="viewButton">
                                    <a href={book.volumeInfo.infoLink} target="_blank">Read more</a>
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