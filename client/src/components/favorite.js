import React from "react";
import {useEffect, useState} from "react";
import API from "../utils/API";
function favorite(props) {
    // Storing the book passed in props to determine if it is a user's favorite book or not
    const [favouriteBook, setFavouriteBook] = useState({
        favbook: ""
    });
    // Storing the decision if the book is user's favorite book or not
    const [isFavoriteBook, setIsFavoriteBook] = useState({
        isFavorite: false
    });
    // Storing the list of all user's favorite books
    const [userfavBooks, setUserfavBooks] = useState({
        favBooks: []
    });

    // Hook to run whenever the user makes a new search
    useEffect(()=>{
        // Check if the book from the new search is among the user's favorite books in the database
        API.getFavBooks().then(result => {
            setUserfavBooks({favBooks: result.data});
            var isFavorite = false;
            for(var i=0; i< result.data.length; i++) {
                if(result.data[i].authors.join() === props.book.authors.join() && result.data[i].title === props.book.title && result.data[i].description === props.book.description) {
                    // setting the isFavorite state to true so as to change the color of the heart to red
                    setIsFavoriteBook({isFavorite: true});
                    isFavorite = true;
                    break;
                }
            }
            if(!isFavorite) {
                // the new searched book is not among the favorites so change the color of heart to gray by setting isFavorite state to false
                setIsFavoriteBook({isFavorite: false});
            }
        })
        .catch(err => console.log(err));
    },[props.search]);

    // This hook watches the favoriteBook state which changes when the favorite button is clicked
    useEffect(() => {
        if(favouriteBook.favbook !== "") {
            var book = favouriteBook.favbook;
            var isFavorite = false;
            for(var i=0; i< userfavBooks.favBooks.length; i++) {
                // Check if the book for which favorite button is clicked is already a favorite or not by checking the favorite books in the database
                if(userfavBooks.favBooks[i].authors.join() === book.authors.join() && userfavBooks.favBooks[i].title === book.title && userfavBooks.favBooks[i].description === book.description) {
                    isFavorite = true;
                    // The book is already a favorite and the favorite button has been clicked, hence removing it from favorites
                    API.deleteBook(userfavBooks.favBooks[i]._id)
                    .then(result => {
                        console.log("Removed from favorites:" + book.title);
                        // setting the userFavBooks state with the updated favorite books list
                        setUserfavBooks(state => {
                            const list = state.favBooks.filter(favBook => (favBook.title !== book.title && favBook.authors.join() !== book.authors.join() && favBook.description !== book.description));
                            return {
                                favBooks: list
                            };
                          });
                          // Resetting the isFavorite status to make the heart gray
                        setIsFavoriteBook({isFavorite: false});
                    })
                    .catch(err => console.log(err));
                    break;
                }
            }
            if(!isFavorite) {
                // The book is not among the favorites in the database, hence adding it to the database
                API.saveBook({
                    authors: book.authors,
                    description: book.description,
                    image: book.image,
                    link: book.link,
                    title: book.title,
                })
                .then(result => {
                    // setting the userFavBooks state with the updated favorite books list
                    setUserfavBooks(state => {
                        const list = state.favBooks.concat(result.data);
                        return {
                            favBooks: list
                        };
                      });
                      // Setting the isFavorite status to true to make the heart red
                    setIsFavoriteBook({isFavorite: true});
                })
                .catch(err => console.log(err));
            }
        }
    }, [favouriteBook]);

    // Setting the FavoriteBook state with the book on which favorite button has been clicked
    function handleFavouriteChange(book) {
        setFavouriteBook({favbook: book});
    }

    return (
        // Adding class redHeart if the isFavorite state is true else adding class grayHeart if isFavorite state is false
        <span className={isFavoriteBook.isFavorite ? 'redHeart' : 'grayHeart'} onClick = {() => handleFavouriteChange(props.book)}>
            <i class="fa fa-heart"></i>
        </span>
    )
}

export default favorite;