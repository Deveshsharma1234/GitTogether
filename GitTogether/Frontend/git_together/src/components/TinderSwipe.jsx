import React, { useState } from 'react';
import TinderCard from 'react-tinder-card';

const cardsData = [
  { id: 1, name: 'Car 1', color: 'lightcoral' },
  { id: 2, name: 'Car 2', color: 'lightblue' },
  { id: 3, name: 'Car 3', color: 'lightgreen' },
];

const TinderSwipe = () => {
  const [cards, setCards] = useState(cardsData);

  const swiped = (direction, nameToDelete) => {
    console.log(`You swiped ${direction} on ${nameToDelete}`);
    setCards((prev) => prev.filter(card => card.name !== nameToDelete));
  };

  const outOfFrame = (name) => {
    console.log(`${name} left the screen`);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
      <div style={{ width: '300px', height: '500px', position: 'relative' }}>
        {cards.map((card) => (
          <TinderCard
            key={card.name}
            onSwipe={(dir) => swiped(dir, card.name)}
            onCardLeftScreen={() => outOfFrame(card.name)}
            preventSwipe={['up', 'down']}
          >
            <div
              style={{
                backgroundColor: card.color,
                width: '100%',
                height: '100%',
                borderRadius: '10px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
              }}
            >
              <h2>{card.name}</h2>
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  );
};

export default TinderSwipe;
