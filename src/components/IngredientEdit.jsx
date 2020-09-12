import React from 'react';

export default function IngredientEdit({
  ingredient,
  handleIngredientChange,
  handleIngredientDelete,
}) {
  const { id, name, value } = ingredient;

  return (
    <>
      <input
        onChange={(e) =>
          handleIngredientChange({ ...ingredient, name: e.target.value })
        }
        className="recipe-edit__input"
        value={name}
        type="text"
      />
      <input
        onChange={(e) =>
          handleIngredientChange({ ...ingredient, value: e.target.value })
        }
        className="recipe-edit__input"
        value={value}
        type="text"
      />
      <button
        onClick={() => handleIngredientDelete(id)}
        className="btn btn--danger"
      >
        &times;
      </button>
    </>
  );
}
