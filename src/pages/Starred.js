import React, { useEffect, useState } from 'react'
import MainPageLayout from '../components/MainPageLayout'
import ShowGrid from '../components/show/ShowGrid';
import { getAPI } from '../misc/config';
import { useShows } from '../misc/custom-hooks'

const Starred = () => {
  const [starred] = useShows();

  const [isLodaing, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [shows, setShows] = useState(null);

  useEffect( () => {
    if(starred && starred.length > 1) {
      const promises = starred.map(showId => getAPI(`/shows/${showId}`));

      Promise.all(promises)
        .then(apiData => apiData.map(show => ({ show })))
        .then(results => {
          setShows(results);
          setIsLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setIsLoading(false);
        })
    } else {
      setIsLoading(false);
    }
  }, [starred] );

  return (
    <MainPageLayout>
      {isLodaing && <div>Shows is Loading</div>}
      {error && <div>Error Occured: {error}</div>}
      {!isLodaing && !shows && <div>No shows were added</div>}
      {!isLodaing && !error && shows && <div><ShowGrid data={shows} /></div>}
    </MainPageLayout>
  )
}

export default Starred
