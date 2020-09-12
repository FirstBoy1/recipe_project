import React, { useContext } from 'react';
import Ingredient from './Ingredient';

import { RecipeContext } from '../App';

export default function Recipe({ recipe }) {
  const { id, name, cookTime, servings, instructions, ingredients } = recipe;
  const { handleRecipeEdit, handleRecipeDelete } = useContext(RecipeContext);

  return (
    <div className="recipe">
      <div className="recipe__header">
        <h2 className="recipe__title">{name}</h2>
        <div>
          <button
            className="btn btn--primary mr-1"
            onClick={() => handleRecipeEdit(id)}
          >
            Edit
          </button>
          <button
            onClick={() => handleRecipeDelete(id)}
            className="btn btn--danger"
          >
            Delete
          </button>
        </div>
      </div>
      <div className="recipe__row">
        <span className="recipe__label">Cook Time:</span>
        <span className="recipe__value">{cookTime}</span>
      </div>
      <div className="recipe__row">
        <span className="recipe__label">Servings:</span>
        <span className="recipe__value">{servings}</span>
      </div>
      <div className="recipe__row">
        <span className="recipe__label">Instructions:</span>
        <div className="recipe__value recipe__value--indented recipe__instructions--value">
          {instructions}
        </div>
      </div>
      <div className="recipe__row">
        <span className="recipe__label">Ingredients:</span>
        <div className="recipe__value recipe__value--indented">
          <div className="recipe__ingredient-grid">
            {ingredients.map((i) => (
              <Ingredient key={i.id} {...i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
