import React, {useState} from 'react';
import MovieCards from './moviecards'

export default function SearchMovies(){

    const [query, setQuery] =useState('');
    const [movies, setMovies]= useState([]);

    const searchMovies =async (event) => {
        event.preventDefault();
        
        const key= "3df89d5f7a00725f3d14a8948fb94c1b";

        const url= `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${query}&page=1&include_adult=false`;
        
        try{
            const res=await fetch(url);
            const data=await res.json();
            //console.log(data);
            setMovies(data.results);
        }catch (err){
            console.error(err);
        }

    }
    
    const cards=movies.filter(movie => movie.poster_path).map(movie => (
       <MovieCards key={movie.id} movie={movie} />
    ))

    return(
        <div>
            <form className="form" onSubmit={searchMovies}>
                <label htmlFor="query" className="label">Movie Name</label>
                <input type="text" name="query" placeholder="Search Movie" className="input" 
                value={query} onChange={(event)=> setQuery(event.target.value)}/>
                <button className="button" type="submit">Search</button>
            </form>
            <div className="card-list">
                {cards}
            </div>
        </div>
    );
}