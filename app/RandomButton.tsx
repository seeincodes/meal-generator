import React, { useState } from "react";
import { Meal, MealApiResponse } from "./meals";

export default function RandomMealButton() {
  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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
      const data: MealApiResponse = await response.json();
      if (data.meals && data.meals.length > 0) {
        setMeal(data.meals[0]);
      } else {
        throw new Error("No meal data found");
      }
    } catch (err) {
      setError("An error occurred while fetching the meal.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4'>
      <button
        onClick={fetchRandomMeal}
        disabled={loading}
        className='mb-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out'
      >
        {loading ? "Loading..." : "Get Random Meal"}
      </button>

      {error && <p className='text-red-500 mb-4'>{error}</p>}

      {meal && (
        <div className='bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-lg'>
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className='w-full h-64 object-cover'
          />
          <div className='p-6'>
            <h2 className='text-2xl font-bold mb-2 text-gray-800'>
              {meal.strMeal}
            </h2>
            <p className='text-gray-600 mb-4'>
              <span className='font-semibold'>Category:</span>{" "}
              {meal.strCategory} |<span className='font-semibold'> Area:</span>{" "}
              {meal.strArea}
            </p>
            <h3 className='text-xl font-semibold mb-2 text-gray-800'>
              Instructions:
            </h3>
            <p className='text-gray-600 mb-4'>{meal.strInstructions}</p>
            <h3 className='text-xl font-semibold mb-2 text-gray-800'>
              Ingredients:
            </h3>
            <ul className='list-disc list-inside text-gray-600'>
              {Object.keys(meal)
                .filter(
                  (key) =>
                    key.startsWith("strIngredient") && meal[key as keyof Meal]
                )
                .map((key, index) => (
                  <li key={key}>
                    {meal[key as keyof Meal]} -{" "}
                    {meal[`strMeasure${index + 1}` as keyof Meal]}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
