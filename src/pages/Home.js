import React, { useState } from 'react'
import MainPageLayout from '../components/MainPageLayout'

const Home = () => {
  const [input, setInput] = useState('')

  const inputOnChange = (ev) => {
    setInput(ev.target.value);
  };

  const onClickSearch = () => {
    fetch(`https://api.tvmaze.com/search/shows?q=${input}`)
      .then(response => response.json())
      .then(result => console.log(result))
  };

  const onKeyPress = (ev) => {
    if(ev.keyCode === 13) {
      onClickSearch();
    }
  };

  return (
    <MainPageLayout>
      <input type="text" onKeyDown={onKeyPress} onChange={inputOnChange} value={input}></input>
      <button type="button" onClick={onClickSearch}>Search</button>
    </MainPageLayout>
  )
}

export default Home
