"use client"
// pages/404.js
import { useState, useEffect } from 'react';
import Link from 'next/link';

const generateCards = () => {
  const icons = ['🍎', '🍌', '🍇', '🍉', '🍓', '🍒'];
  const cards = [...icons, ...icons]
    .sort(() => Math.random() - 0.5)
    .map((icon, index) => ({ id: index, icon, flipped: false, matched: false }));
  return cards;
};

const MemoryGame = () => {
  const [cards, setCards] = useState(generateCards());
  const [flippedCards, setFlippedCards] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      if (cards[first].icon === cards[second].icon) {
        const newCards = [...cards];
        newCards[first].matched = true;
        newCards[second].matched = true;
        setCards(newCards);
        setScore(score + 1);
      } else {
        setTimeout(() => {
          const newCards = [...cards];
          newCards[first].flipped = false;
          newCards[second].flipped = false;
          setCards(newCards);
        }, 1000);
      }
      setFlippedCards([]);
    }
  }, [flippedCards, cards, score]);

  const handleCardClick = (index) => {
    if (flippedCards.length < 2 && !cards[index].flipped && !cards[index].matched) {
      const newCards = [...cards];
      newCards[index].flipped = true;
      setCards(newCards);
      setFlippedCards([...flippedCards, index]);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#F5F5F5] text-white">
      <h1 className="text-2xl mb-8 text-center text-gray-500">You've landed on the <span className='text-4xl font-bold text-[#E61D64]'>Wrong</span> page! Go back, or stay here and play this <span className='text-4xl font-bold text-[#E61D64]'>Game!</span></h1>
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`w-16 h-16 flex items-center justify-center bg-[#E61D64] rounded cursor-pointer text-2xl ${
              card.flipped || card.matched ? 'bg-white text-black' : ''
            }`}
            onClick={() => handleCardClick(index)}
          >
            {card.flipped || card.matched ? card.icon : ''}
          </div>
        ))}
      </div>
      <p className="mt-8 text-2xl text-gray-500">Score: {score}</p>
      <Link href="/">
        <p className="mt-4 px-6 py-3 bg-[#E61D64] rounded-full text-white hover:bg-[#ba4870]">Go back home</p>
      </Link>
    </div>
  );
};

export default MemoryGame;

