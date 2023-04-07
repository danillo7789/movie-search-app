import { useEffect, useState } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const API_KEY = process.env.REACT_APP_API_KEY
  
  const searchMovies = async (title) => {
    const response = await fetch(`https://www.omdbapi.com?i=${title.imdbID}&apikey=${API_KEY}&s=${title}`);
    const data = await response.json();
    console.log(data)
    // const output = data.Search
    setMovies(data.Search);
  };

  const enterKeySearch = (e) => {
    if (e.key === 'Enter') {
      searchMovies(searchInput);
    }
  }

  useEffect(() => {
    //passing in a search value
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
          onKeyUp={enterKeySearch} 
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
