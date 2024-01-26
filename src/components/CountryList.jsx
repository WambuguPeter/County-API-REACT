// CountryList.jsx
import React from 'react';
import '../styles/CountryList.scss'

const CountryList = ({ countries }) => {
  return (
    <div className="countries-list">
      {countries.map((country) => (
        <div key={country.name} className="country-card">
          <img src={country.flag} alt={`${country.name} Flag`} />
          <div className="country-info">
            <h2>{country.name}</h2>
            <p>Population: {country.population}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CountryList;
