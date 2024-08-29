"use client";
import Image from "next/image";
import React, { useState } from "react";
import { MealApiResponse } from "./meals";

const RandomMealButton = () => {
  const [meal, setMeal] = useState<MealApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRandomMeal = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch meal");
      }
      const data = await response.json();
      setMeal(data.meals[0]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        onClick={fetchRandomMeal}
        disabled={loading}
      >
        {loading ? "Loading..." : "Generate Meal"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {meal && (
        <div className='justify-content align-center'>
          <h2>{meal?.strMeal}</h2>
          <img src={meal.strMealThumb} alt={meal.strMeal} width='200' />
          <p>Category: {meal.strCategory}</p>
          <p>Area: {meal.strArea}</p>
          <h3>Instructions:</h3>
          <p>{meal.strInstructions}</p>
          <h3>Ingredients:</h3>
          <ul>
            {Array.from({ length: 20 }, (_, i) => i + 1)
              .filter((i) => meal[`strIngredient${i}`])
              .map((i) => (
                <li key={i}>
                  {meal[`strIngredient${i}`]} - {meal[`strMeasure${i}`]}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RandomMealButton;
