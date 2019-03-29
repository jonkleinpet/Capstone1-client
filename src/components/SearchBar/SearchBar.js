import React from 'react';
import './styles/search-bar.css';

export default function SearchBar(props)  {
  const { updateTitle } = props

  return (
    <div className="search-bar-container">
      <label htmlFor="search-bar">Search </label>
      <input className="search" name="search-bar" id="search-bar" type='text' onChange={ (e) => updateTitle(e) } />
    </div>
  );
  

};