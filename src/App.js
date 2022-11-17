import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import MovieList from './components/MovieList';
import AddFavourite from './components/AddFavourite';
import RemoveFavourites from './components/RemoveFavourites';

const App=()=>{
const [movies,setMovies]=useState([]);
const [searchMovie,setSearch]=useState('');
const [favourites,setFavourites]=useState([]);

const getMovieRequest= async (searchMovie) => {
    const url= `http://www.omdbapi.com/?s=${searchMovie}&apikey=9d80886d`;

    const response= await fetch(url);
    const responseJson= await response.json();
    console.log(responseJson.Search);
    if(responseJson.Search){
        setMovies(responseJson.Search);
    }

}

useEffect(()=>{
    getMovieRequest(searchMovie);
},[searchMovie])

useEffect(()=>{
    const movieFavourites = JSON.parse(
        localStorage.getItem('react-movie-app-favourites')
    );

    setFavourites(movieFavourites);
},[])

const saveToLocalStorage=(items)=>{
    localStorage.setItem('react-movie-app-favourites',JSON.stringify(items));
}

const addFavouriteMovie=(movie)=>{
const favouriteList=[...favourites,movie]
setFavourites(favouriteList);
saveToLocalStorage(favouriteList);
}

const removeFavouriteMovie=(movie)=>{
  const favouriteList=  favourites.filter((favourite)=>favourite.imdbID!==movie.imdbID);

  setFavourites(favouriteList);
saveToLocalStorage(favouriteList);
}

    return(
        <div className='container-fluid '>
        
        <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading Heading='Movies'/>
        <SearchBox  searchMovie={searchMovie} setSearch={setSearch} />
        </div>

        <div className='row movie'>
        <MovieList movies={movies} handleFavouritesClick={addFavouriteMovie} favouriteComponent={AddFavourite} />
        </div>

        <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading Heading='Favourites'/>
        </div>

        <div className='row movie'>
        <MovieList movies={favourites} handleFavouritesClick={removeFavouriteMovie} favouriteComponent={RemoveFavourites} />
        </div>
       

        </div>
    );
    };

export default App;