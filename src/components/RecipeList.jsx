import React from 'react';
import Recipe from './Recipe';
import { useContext } from 'react';

import { RecipeContext } from '../App';

export default function RecipeList({ recipes }) {
  const { handleRecipeAdd } = useContext(RecipeContext);

  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <Recipe key={recipe.id} recipe={recipe} />
      ))}
      <div className="recipe-list__add-recipe-btn-container">
        <button onClick={handleRecipeAdd} className="btn btn--primary">
          Add Recipe
        </button>
      </div>
    </div>
  );
}
