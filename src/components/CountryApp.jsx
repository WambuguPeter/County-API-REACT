
import React, { useEffect, useReducer, useState } from 'react';
import CountryList from './CountryList';

// Import the JSON data
import countriesData from '../components/data.json'; 

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_COUNTRIES':
      return { ...state, countries: action.payload, filteredCountries: action.payload, loading: false };
    case 'TOGGLE_THEME':
      return { ...state, darkTheme: !state.darkTheme };
    case 'FILTER_COUNTRIES':
      return { ...state, filteredCountries: action.payload };
    default:
      return state;
  }
};

const initialState = {
  countries: [],
  filteredCountries: [],
  loading: true,
  darkTheme: false,
};

const CountryApp = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [searchTerm, setSearchTerm] = useState('');

  const { countries, filteredCountries, loading, darkTheme } = state;

  useEffect(() => {
    // Set initial country data from JSON
    dispatch({ type: 'SET_COUNTRIES', payload: countriesData });
  }, []);

  useEffect(() => {
    // Filter countries based on the search term
    const filtered = countries.filter((country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    dispatch({ type: 'FILTER_COUNTRIES', payload: filtered });
  }, [searchTerm, countries]);

  return (
    <div className={`App ${darkTheme ? 'dark-theme' : 'light-theme'}`}>
      <header>
        <h1>Where in the Planet??  😃</h1>
        <button onClick={() => dispatch({ type: 'TOGGLE_THEME' })}>
          Theme
        </button>
        <input
          type="text"
          placeholder="Search for a country..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </header>

      {loading && <p>Loading...</p>}

      <CountryList countries={filteredCountries} />
    </div>
  );
};

export default CountryApp;
