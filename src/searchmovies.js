import React, {useState, useEffect} from 'react';
import MovieCards from './moviecards'

export default function SearchMovies(){

    const [query, setQuery] =useState('');
    const [movies, setMovies]= useState([]);
    const [defaultMovies, setDefault]= useState([]);
    const [display, setDisplay]= useState(-1);

    const searchMovies =async (event) => {
        if(query.length>0){
        event.preventDefault();
        
        const key= "3df89d5f7a00725f3d14a8948fb94c1b";

        const url= `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${query}&page=1&include_adult=false`;
        
        try{
            const res=await fetch(url);
            const data=await res.json();
            //console.log(data);
            if(data.total_results>0){
            setMovies(data.results);
            console.log(data);
            setDisplay(3);
        }
            else{
                setDisplay(2);
                
            }
        }catch (err){
            console.error(err);
        }
        }
        else{
            setDisplay(1);
        }
    }
    useEffect(async() =>{
        const key= "3df89d5f7a00725f3d14a8948fb94c1b";

        const url= `https://api.themoviedb.org/3/discover/movie?api_key=${key}&sort_by=popularity.desc&language=en-US&page=1&include_adult=false`;
        try{
            const res=await fetch(url);
            const data=await res.json();
            //console.log(data);
            setDefault(data.results);
            setDisplay(1);
            console.log(data);
        }catch (err){
            console.error(err);
        }
        
    }, [])
    
    const cards=movies.filter(movie => movie.poster_path).map(movie => (
       <MovieCards key={movie.id} movie={movie} />
    ))
    const defaultCards=defaultMovies.filter(movie => movie.poster_path).map(movie => (
        <MovieCards key={movie.id} movie={movie} />
     ))

    return(
        <div>
            <form className="form" onSubmit={searchMovies}>
                <input type="text" name="query" placeholder="Search Movie" className="input" 
                value={query} onChange={(event)=> setQuery(event.target.value)}/>
                <button className="button" type="submit">Search</button>
            </form>
            <h2 className="Text">{display==-1?"Loading...":display==1?"Popular Movies":display==2?"No search result :(": "Search results"}</h2>
            <div className="card-list">
                {display==3?cards:display!=2?defaultCards:""}
            </div>
        </div>
    );
}