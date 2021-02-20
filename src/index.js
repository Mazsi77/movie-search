import React from 'react';
import ReactDOM from 'react-dom';
import SearchMovies from "./searchmovies"
function App (){
    return (
        <div className="container">
            <h1 className="title">React Movie Search</h1>
            <SearchMovies />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));