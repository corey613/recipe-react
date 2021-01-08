
import React, {useEffect, useState} from "react";
import Recipe from './recipe';
import './App.css';



const App = () => {

const APP_ID = '653e3418';
const APP_KEY = '6092e68edb6d9a42d24301e71009ba84	';


const [recipes, setRecipes] = useState([]);
const [search, setSearch] = useState("");
const [query, setQuery] = useState("chicken")

  useEffect(() => {
    // eslint-disable-next-line
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits)
  };

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search)
    setSearch('');
  }

  return(
    <div className="App">
      <form onSubmit={getSearch} className='search-form'>
      <input className='search-bar' type="text" value={search} onChange={updateSearch} placeholder="Search for an ingredient or a recipe"/>
  <button className='search-btn' type='submit'> Search</button>
      </form>
      <div className="recipes">
      {recipes.map(recipe =>(
        <Recipe 
        key={recipe.recipe.label}
         title={recipe.recipe.label}
         calories={recipe.recipe.calories}
         image={recipe.recipe.image}
         ingredients={recipe.recipe.ingredients}
        />
      ))}
      </div>
    </div>
  );
};

export default App;
