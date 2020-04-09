import React from "react";
import {useEffect, useState} from "react";
import API from "../utils/API";
function favorite(props) {

    const [favouriteBook, setFavouriteBook] = useState({
        favbook: ""
    });
    const [isFavoriteBook, setIsFavoriteBook] = useState({
        isFavorite: false
    });
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
                    isFavorite = true;
                    // The book is already and the favorite button has been clicked, hence removing it from favorites
                    API.deleteBook(userfavBooks.favBooks[i]._id)
                    .then(result => {
                        console.log("Removed from favortites:" + book.title);
                        setUserfavBooks(state => {
                            const list = state.favBooks.filter(favBook => (favBook.title !== book.title && favBook.authors.join() !== book.authors.join() && favBook.description !== book.description));
                            return {
                                favBooks: list
                            };
                          });
                        setIsFavoriteBook({isFavorite: false});
                    })
                    .catch(err => console.log(err));
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