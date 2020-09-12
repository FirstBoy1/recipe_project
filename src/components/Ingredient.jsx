import React from 'react';

export default function Ingredient({ name, value }) {
  return (
    <>
      <span>{name}</span>
      <span>{value}</span>
    </>
  );
}
