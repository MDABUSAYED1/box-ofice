import React, { useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';
import { getAPI } from '../misc/config'
 
const Home = () => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState(null);

  const inputOnChange = (ev) => {
    setInput(ev.target.value);
  };

  const onClickSearch = () => {
    getAPI(`/search/shows?q=${input}`)
    .then(result => {
      setResults(result);
    });
  };

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
      return <div>
        {results.map( (item) =>
          <div key={item.show.id}>
            {item.show.name}
          </div>
        )}
      </div>
    };

    return null;
  }

  return (
    <MainPageLayout>
      <input type="text" onKeyDown={onKeyPress} onChange={inputOnChange} value={input}></input>
      <button type="button" onClick={onClickSearch}>Search</button>
      {renderResults()}
    </MainPageLayout>
  )
}

export default Home
