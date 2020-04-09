import React from "react";
import {useEffect, useState} from "react";
import API from "../utils/API";
function favorite(props) {

    const [favouriteBook, setFavouriteBook] = useState({
        favbook: ""
    });
    const [isFavoriteBook, setIsFavoriteBook] = useState({
        isFavorite: false
    })
    const [userfavBooks, setUserfavBooks] = useState({
        favBooks: []
    });

    useEffect(()=>{
        API.getFavBooks().then(result => {
            setUserfavBooks({favBooks: result.data});
            var isFavorite = false;
            for(var i=0; i< result.data.length; i++) {
                if(result.data[i].authors.join() === props.book.authors.join() && result.data[i].title === props.book.title && result.data[i].description === props.book.description) {
                    setIsFavoriteBook({isFavorite: true});
                    isFavorite = true;
                    break;
                }
            }
            if(!isFavorite) {
                setIsFavoriteBook({isFavorite: false});
            }
        })
        .catch(err => console.log(err));
    },[props.search]);

    useEffect(() => {
        if(favouriteBook.favbook !== "") {
            var book = favouriteBook.favbook;
            var isFavorite = false;
            for(var i=0; i< userfavBooks.favBooks.length; i++) {
                if(userfavBooks.favBooks[i].authors.join() === book.authors.join() && userfavBooks.favBooks[i].title === book.title && userfavBooks.favBooks[i].description === book.description) {
                    console.log("Book is already a favorite");
                    isFavorite = true;
                    break;
                }
            }
            if(!isFavorite) {
                API.saveBook({
                    authors: book.authors,
                    description: book.description,
                    image: book.image,
                    link: book.link,
                    title: book.title,
                })
                .then(result => {
                    console.log(result.data);
                    setUserfavBooks(state => {
                        const list = state.favBooks.concat(result.data);
                        return {
                            favBooks: list
                        };
                      });
                    setIsFavoriteBook({isFavorite: true});
                })
                .catch(err => console.log(err));
            }
        }
    }, [favouriteBook]);

    useEffect(() => {

    },[userfavBooks]);
    function handleFavouriteChange(book) {
        setFavouriteBook({favbook: book});
    }

    return (
        <span className={isFavoriteBook.isFavorite ? 'redHeart' : 'grayHeart'} onClick = {() => handleFavouriteChange(props.book)}>
            <i class="fa fa-heart"></i>
        </span>
    )
}

export default favorite;