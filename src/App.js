import React, {useEffect, useState} from 'react';
import Tmdb from './helpers/Tmdb';
import MovieRow from './components/MovieRow';
import './App.css';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [ featureData, setFeatureData] = useState(null);
  const [ blackHeader, setBlackHeader] = useState(false);

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


  useEffect(()=>{
    const scrollListenner = () => {
      if(window.scrollY > 15){
        setBlackHeader(true);
      }else{
        setBlackHeader(false);
      }
    }
    window.addEventListener('scroll',scrollListenner);
    return() => {
      window.removeEventListener('scroll', scrollListenner);
    }

  }, [])

  return(
    
    <div className="page">
      <Header black={blackHeader}/>
      {featureData &&
        <FeaturedMovie item={featureData}/>
      }

      
      <section className="lists">
        {movieList.map((item, key)=>(
          <div key={key}>
              <MovieRow  title={item.title} items={item.items}/>
          </div>
        ))}
      </section>

    </div>
  );


}


