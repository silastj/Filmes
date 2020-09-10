import React, {useEffect, useState} from 'react';
import Tmdb from './helpers/Tmdb';
import MovieRow from './components/MovieRow';
import './App.css';

export default () => {

  const [movieList, setMovieList] = useState([]);

  useEffect(()=> {
    const loadAll = async () => {

      let list = await Tmdb.getHomeList();
      setMovieList(list);
    }

    loadAll();

  }, []);


  return(
    <div className="page">
      <section className="lists">
        {movieList.map((item, key)=>(
          <div>
              <MovieRow key={key} title={item.title} items={item.items}/>
          </div>
        ))}
      </section>

    </div>
  );


}


