import React, {useEffect, useState} from 'react';
import Tmdb from './helpers/Tmdb';
import MovieRow from './components/MovieRow';
import './App.css';
import FeaturedMovie from './components/FeaturedMovie';

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [ featureData, setFeatureData] = useState(null);

  useEffect(()=> {
    const loadAll = async () => {
      //Pegando a lista Total
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      //Pegando o Featured
      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      //Pegando o item 
      let chosen = originals[0].items.results[randomChosen];

      //Função de pegar um filme
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      //Armazenar na minha state
      // console.log(chosenInfo);
      setFeatureData(chosenInfo);
    }

    loadAll();

  }, []);


  return(
    <div className="page">
      {featureData &&
        <FeaturedMovie item={featureData}/>
      }

      
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


