"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Cat,
  Dog,
  Fish,
  Bird,
  Star,
  Heart,
  Sun,
  Moon,
  type LucideIcon,
} from "lucide-react";
import { GameCard } from "@/components/game/GameCard";
import { WinScreen } from "@/components/game/WinScreen";
import { Button } from "@/components/ui/button";

type CardData = {
  id: number;
  Icon: LucideIcon;
  key: string;
};

const ICONS: LucideIcon[] = [Cat, Dog, Fish, Bird, Star, Heart, Sun, Moon];
const TOTAL_PAIRS = ICONS.length;

const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export default function Home() {
  const [cards, setCards] = useState<CardData[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedKeys, setMatchedKeys] = useState<string[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  const initializeGame = useCallback(() => {
    const cardPairs = ICONS.flatMap((Icon, index) => {
      const iconKey = Icon.displayName || `icon-${index}`;
      return [
        { id: index * 2, Icon, key: iconKey },
        { id: index * 2 + 1, Icon, key: iconKey },
      ];
    });
    setCards(shuffleArray(cardPairs));
    setFlippedIndices([]);
    setMatchedKeys([]);
    setIsChecking(false);
    setMoves(0);
    setGameWon(false);
  }, []);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);
  
  useEffect(() => {
    if (matchedKeys.length === TOTAL_PAIRS) {
      const timer = setTimeout(() => setGameWon(true), 800);
      return () => clearTimeout(timer);
    }
  }, [matchedKeys]);

  useEffect(() => {
    if (flippedIndices.length === 2) {
      setIsChecking(true);
      const [firstIndex, secondIndex] = flippedIndices;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];

      if (firstCard.key === secondCard.key) {
        setMatchedKeys((prev) => [...prev, firstCard.key]);
        setFlippedIndices([]);
        setIsChecking(false);
      } else {
        setTimeout(() => {
          setFlippedIndices([]);
          setIsChecking(false);
        }, 1200);
      }
      setMoves((prev) => prev + 1);
    }
  }, [flippedIndices, cards]);

  const handleCardClick = (index: number) => {
    if (isChecking || flippedIndices.includes(index) || matchedKeys.includes(cards[index].key)) {
      return;
    }
    setFlippedIndices((prev) => [...prev, index]);
  };
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 bg-background">
      <div className="w-full max-w-2xl mx-auto">
        <header className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-4xl sm:text-5xl font-bold font-headline text-primary">
            Flip & Match
          </h1>
          <div className="flex items-center gap-4">
            <div className="text-lg font-semibold text-foreground/80 rounded-lg bg-card px-4 py-2">Moves: {moves}</div>
            <Button onClick={initializeGame} variant="default">
              Reset Game
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-4 gap-2 sm:gap-4">
          {cards.map((card, index) => (
            <GameCard
              key={`${card.key}-${card.id}`}
              Icon={card.Icon}
              isFlipped={flippedIndices.includes(index)}
              isMatched={matchedKeys.includes(card.key)}
              onClick={() => handleCardClick(index)}
            />
          ))}
        </div>
        
        <footer className="text-center mt-8 text-muted-foreground">
            <p>A fun game by Firebase Studio</p>
        </footer>
      </div>
      <WinScreen open={gameWon} onPlayAgain={initializeGame} />
    </main>
  );
}
