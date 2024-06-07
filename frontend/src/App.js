import React, { useState, useEffect } from 'react';

const App = () => {
  const [foods, setFoods] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await fetch(`http://${process.env.REACT_APP_END_POINT}:3000/foods`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFoods(data);
      } catch (err) {
        console.error('Error fetching foods:', err);
        setError('Failed to fetch foods');
      }
    };

    fetchFoods();
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Food Menu ::::</h1>
      <ul>
        {foods.map(food => (
          <li key={food._id}>
            <h2>{food.name}</h2>
            <p>Price: ${food.price}</p>
            <p>Review Count: {food.reviewCount}</p>
            <p>Review Stars: {food.reviewStars}</p>
            <p>No. of Orders: {food.noOfOrders}</p>
            <img src={food.image} alt={food.name} style={{ width: '200px', height: 'auto' }} />
            <p>Description: {food.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
