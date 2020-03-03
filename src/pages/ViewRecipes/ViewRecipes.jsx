import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/auth';

const ViewRecipes = () => {
  const { authTokens } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    console.log('authTokens: ', authTokens.auth_token)
    axios.get('http://localhost:3001/recipes',
      { headers: { 
          'Content-Type': 'application/json',
          'Authorization': authTokens.auth_token,
        }
      },
    ).then(result => {
      if (result.status === 200 && result.data) {
        console.log('Setting recipes on state', result.data)
        setRecipes(result.data)
      } else {
        console.log('You really messed up', result)
      }
    }).catch(e => {
      console.log('You really messed up', e)
    });
  }, [authTokens.auth_token])

  return (
    <>
      <div>Recipes</div>
      { recipes && recipes.map(recipe => (
        <div key={recipe.id} onClick={() => setSelectedRecipe(recipe)}>{recipe.title}</div>
      ))}
      { selectedRecipe && (
        <>
          <div>{selectedRecipe.title}</div>
          <div>{selectedRecipe.ingredients}</div>
        </>
      )}
    </>
  );
}

export default ViewRecipes;

// TO-DO: 
// Fix visual formatting - yuck
// Make ingredients and directions arrays pretty
// Show titles are clickable
