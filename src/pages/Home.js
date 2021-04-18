import React, { useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';
import { getAPI } from '../misc/config';

import ShowGrid from '../components/show/ShowGrid';
import ActorGrid from '../components/actor/ActorGrid';
 
const Home = () => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState(null);
  const [radioOption, setRadioOption] = useState('shows');

  const isRadioOption = radioOption === 'shows';

  const inputOnChange = (ev) => {
    setInput(ev.target.value);
  };

  const onClickSearch = () => {
    getAPI(`/search/${radioOption}?q=${input}`)
    .then(result => {
      setResults(result);
    });
  };

  const onRadioSearch = (ev) => {
    setRadioOption(ev.target.value);
  }

  console.log(radioOption);

  const onKeyPress = (ev) => {
    if(ev.keyCode === 13) {
      onClickSearch();
    }
  };

  const renderResults = () => {
    if(results && results.length === 0) {
      return <div>
        No Result
      </div>
    };

    if(results && results.length > 0) {
      return results[0].show ? 
        <ShowGrid data={results} />
        : <ActorGrid data={results} />
    };

    return null;
  }

  return (
    <MainPageLayout>
      <input 
        type="text" 
        placeholder="Search for something"
        onKeyDown={onKeyPress} 
        onChange={inputOnChange} 
        value={input}
        />
      <button 
        type="button" 
        onClick={onClickSearch}
      >
        Search
      </button>
      <label htmlFor="shows-search">
        Shows
        <input 
        id="shows-search" 
        type="radio" 
        value="shows"
        checked={isRadioOption}
        onChange={onRadioSearch}
        />
      </label>
      <label htmlFor="actor-search">
        Actors
        <input 
        id="actor-search" 
        type="radio"
        value="people"
        checked={!isRadioOption}
        onChange={onRadioSearch}
        />
      </label>
      {renderResults()}
    </MainPageLayout>
  )
}

export default Home
