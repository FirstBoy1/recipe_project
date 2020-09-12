import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import RecipeList from './components/RecipeList';
import RecipeEdit from './components/RecipeEdit';

import './css/app.css';

export const RecipeContext = React.createContext();
const recipeStorageKey = 'cookWithKyle.recipes';

function App() {
  const [recipes, setRecipes] = useState(sampleRecipe);
  const [editRecipeId, setEditRecipeId] = useState();
  const editRecipe = recipes.find((recipe) => recipe.id === editRecipeId);

  useEffect(() => {
    const retrievedRecipes = JSON.parse(localStorage.getItem(recipeStorageKey));
    if (retrievedRecipes) setRecipes(retrievedRecipes);
  }, []);

  useEffect(() => {
    localStorage.setItem(recipeStorageKey, JSON.stringify(recipes));
  }, [recipes]);

  const recipeContextValue = {
    handleRecipeEdit,
    handleRecipeChange,
    handleRecipeAdd,
    handleRecipeDelete,
  };

  function handleRecipeAdd() {
    const newRecipe = {
      id: uuidv4(),
      name: '',
      cookTime: '',
      servings: 1,
      instructions: '',
      ingredients: [],
    };

    setRecipes([...recipes, newRecipe]);
    setEditRecipeId(newRecipe.id);
  }

  function handleRecipeDelete(id) {
    setRecipes(recipes.filter((r) => r.id !== id));
    if (editRecipeId === id) handleRecipeEdit(null);
  }

  function handleRecipeEdit(id) {
    setEditRecipeId(id);
  }

  function handleRecipeChange(recipe) {
    const newRecipes = [...recipes];
    const recipeIndex = newRecipes.findIndex((r) => r.id === recipe.id);
    newRecipes[recipeIndex] = recipe;
    setRecipes(newRecipes);
  }

  return (
    <RecipeContext.Provider value={recipeContextValue}>
      <RecipeList recipes={recipes} />
      {editRecipeId && <RecipeEdit recipe={editRecipe} />}
    </RecipeContext.Provider>
  );
}

const sampleRecipe = [
  {
    id: uuidv4(),
    name: 'Plain Chicken',
    cookTime: '1:45',
    servings: 3,
    instructions:
      '1.Put salt on chicken\n2. Put chicken in oven\n3. Eat chicken',
    ingredients: [
      {
        id: uuidv4(),
        name: 'Chicken',
        value: '2 Pounds',
      },
      {
        id: uuidv4(),
        name: 'Salt',
        value: '1 Tbs',
      },
    ],
  },
  {
    id: uuidv4(),
    name: 'Plain Pork',
    cookTime: '0:45',
    servings: 5,
    instructions: '1.Put paprika on pork\n2. Put pork in oven\n3. Eat pork',
    ingredients: [
      {
        id: uuidv4(),
        name: 'Pork',
        value: '3 Pounds',
      },
      {
        id: uuidv4(),
        name: 'Paprika',
        value: '2 Tbs',
      },
    ],
  },
];

export default App;
