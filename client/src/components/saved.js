import React, {useRef, useState, useEffect} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import API from "../utils/API";

function Saved() {
    const [userfavBooks, setUserfavBooks] = useState({
        favBooks: []
    });

    useEffect(()=>{
        API.getFavBooks().then(result => {
            setUserfavBooks({favBooks: result.data});
        })
        .catch(err => console.log(err));
    },[]);
    const handleRemove = (id) => {
        
    }

    return(
        <div>
            <Container> 
                <Row className="styleRow">
                    <h4 className="styleHeading">Your favorites:</h4>
                    {userfavBooks.favBooks.length ? (
                        userfavBooks.favBooks.map(book => (
                            <Col className="styleBook">
                                <h5>{book.title}</h5>
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
                                <span className="trashButton" onClick = {() => handleRemove(book._id)}>
                                    <i class="fa fa-trash"></i>
                                </span>
                            </Col>
                        ))
                    ) : (
                        <h6>No saved books found!</h6>
                    )}
                </Row>
            </Container>
        </div>
    )
}

export default Saved;