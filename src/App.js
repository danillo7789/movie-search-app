import { useEffect, useState } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

// const API_URL = 'https://www.omdbapi.com?apikey=904f401f';

const App = () => {

  const [movies, setMovies] = useState([]);

  const [searchInput, setSearchInput] = useState('');
  

  const searchMovies = async (title, index) => {
    const response = await fetch(`https://www.omdbapi.com?i=${index}&apikey=${process.env.REACT_APP_API_KEY}&s=${title}`);
    const data = await response.json();
    // const output = data.Search
    setMovies(data.Search);
    // console.log(data.Search[0].imdbID);

  };


  useEffect(() => {
    //passing in action as title
    searchMovies('war');
  }, []);

  return (
    <div className='app'>
      <h1>MovieHouse</h1>

      <div className='search'>
        <input
          value={searchInput}
          placeholder='Search for Movies'
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt='Search'
          //passing in a new title to search "searchInput"
          onClick={() => searchMovies(searchInput)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className='container'>
          {movies.map((movie, index) => (
            <MovieCard movie={movie}
              key={index} />
          ))}
        </div>) :
        (
          <div className='empty'>
            <h2>No movies found</h2>
          </div>
        )}

    </div>
  );
}

export default App;
