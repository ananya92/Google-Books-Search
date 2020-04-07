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
        API.getBooks(searchRef.current.value)
          .then(result => {
              console.log(result.data);
            setSearchedBooks({books: result.data})
          })
          .catch(err => console.log(err));
    
          searchRef.current.value = "";
    };

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
            </Container>
        </div>
    )
}

export default Search;