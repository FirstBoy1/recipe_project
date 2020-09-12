import React, { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

import IngredientEdit from './IngredientEdit';

import { RecipeContext } from '../App';

export default function RecipeEdit({ recipe }) {
  const { name, cookTime, servings, instructions, ingredients } = recipe;
  const { handleRecipeEdit, handleRecipeChange } = useContext(RecipeContext);

  function handleChange(changes) {
    handleRecipeChange({ ...recipe, ...changes });
  }

  function handleIngredientChange(ingredient) {
    const newIngredients = [...ingredients];
    const ingredientIndex = newIngredients.findIndex(
      (i) => i.id === ingredient.id
    );
    newIngredients[ingredientIndex] = ingredient;
    handleChange({ ingredients: newIngredients });
  }

  function handleIngredientDelete(id) {
    const newIngredients = ingredients.filter((i) => i.id !== id);
    handleChange({ ingredients: newIngredients });
  }

  function handleIngredientAdd() {
    const newIngredient = { id: uuidv4(), name: '', value: '' };
    handleChange({ ingredients: [...ingredients, newIngredient] });
  }

  return (
    <div className="recipe-edit">
      <div className="recipe-edit__header">
        <button
          onClick={() => handleRecipeEdit(null)}
          className="btn recipe-edit__close-btn"
        >
          &times;
        </button>
      </div>
      <div className="recipe-edit__details-grid">
        <label className="recipe-edit__label" htmlFor="name">
          Name
        </label>
        <input
          className="recipe-edit__input"
          onChange={(e) => handleChange({ name: e.target.value })}
          value={name}
          type="text"
          id="name"
        />
        <label className="recipe-edit__label" htmlFor="cookTime">
          Cook Time
        </label>
        <input
          className="recipe-edit__input"
          onChange={(e) => handleChange({ cookTime: e.target.value })}
          value={cookTime}
          type="text"
          id="cookTime"
        />
        <label className="recipe-edit__label" htmlFor="servings">
          Servings
        </label>
        <input
          className="recipe-edit__input"
          onChange={(e) => handleChange({ servings: parseInt(e.target.value) })}
          value={servings}
          min={1}
          type="number"
          id="servings"
        />
        <label className="recipe-edit__label" htmlFor="instructions">
          Instructions
        </label>
        <textarea
          className="recipe-edit__input recipe-edit__textarea"
          id="instructions"
          onChange={(e) => handleChange({ instructions: e.target.value })}
          value={instructions}
        />
      </div>
      <div className="recipe-edit__ingredients">
        <label className="recipe-edit__label">Ingredients</label>
        <div className="recipe-edit__ingredients-grid">
          <div className="recipe-edit__ingredient-label">Name</div>
          <div className="recipe-edit__ingredient-label">Amount</div>
          <div></div>
          {ingredients.map((ing) => (
            <IngredientEdit
              key={ing.id}
              handleIngredientChange={handleIngredientChange}
              handleIngredientDelete={handleIngredientDelete}
              ingredient={ing}
            />
          ))}
        </div>
      </div>
      <div className="recipe-edit__add-ingredient-btn-container">
        <button onClick={handleIngredientAdd} className="btn btn--primary">
          Add Ingredient
        </button>
      </div>
    </div>
  );
}
