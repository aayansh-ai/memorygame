
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
  Plane,
  Train,
  Car,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import { GameCard } from "@/components/game/GameCard";
import { WinScreen } from "@/components/game/WinScreen";
import { Button } from "@/components/ui/button";
import { LevelCompleteScreen } from "@/components/game/LevelCompleteScreen";
import { PlayerNameForm } from "@/components/game/PlayerNameForm";

type CardData = {
  id: number;
  Icon: LucideIcon;
  key: string;
};

const ALL_ICONS: LucideIcon[] = [
  Cat,
  Dog,
  Fish,
  Bird,
  Star,
  Heart,
  Sun,
  Moon,
  Plane,
  Train,
  Car,
  Rocket,
];

const MAX_LEVEL = 10;

const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export default function Home() {
  const [level, setLevel] = useState(1);
  const [cards, setCards] = useState<CardData[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedKeys, setMatchedKeys] = useState<string[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [levelComplete, setLevelComplete] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [gameStarted, setGameStarted] = useState(false);

  const getPairsForLevel = (level: number) => level + 1;

  const initializeGame = useCallback(
    (currentLevel: number) => {
      const numPairs = getPairsForLevel(currentLevel);
      const iconsForLevel = ALL_ICONS.slice(0, numPairs);

      const cardPairs = iconsForLevel.flatMap((Icon, index) => {
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
      setLevelComplete(false);
    },
    []
  );

  useEffect(() => {
    if(gameStarted) {
      initializeGame(level);
    }
  }, [level, initializeGame, gameStarted]);

  useEffect(() => {
    if(!gameStarted) return;
    const numPairs = getPairsForLevel(level);
    if (matchedKeys.length > 0 && matchedKeys.length === numPairs) {
      if (level === MAX_LEVEL) {
        const timer = setTimeout(() => setGameWon(true), 800);
        return () => clearTimeout(timer);
      } else {
        setLevelComplete(true);
      }
    }
  }, [matchedKeys, level, gameStarted]);

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
    if (
      isChecking ||
      flippedIndices.includes(index) ||
      matchedKeys.includes(cards[index].key)
    ) {
      return;
    }
    setFlippedIndices((prev) => [...prev, index]);
  };

  const handleResetGame = () => {
    setLevel(1);
    initializeGame(1);
  };
  
  const handleNextLevel = () => {
    if (level < MAX_LEVEL) {
      setLevel(prev => prev + 1);
    }
  }

  const handleStartGame = (name: string) => {
    setPlayerName(name);
    setGameStarted(true);
  }

  if (!gameStarted) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 bg-background">
        <PlayerNameForm onStartGame={handleStartGame} />
      </main>
    );
  }

  const gridCols = `grid-cols-${Math.ceil(Math.sqrt(getPairsForLevel(level) * 2))}`;
  const gridLayout = `grid ${gridCols} gap-2 sm:gap-4`;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 bg-background">
      <div className="w-full max-w-4xl mx-auto">
        <header className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-4xl sm:text-5xl font-bold font-headline text-primary">
            Flip & Match
          </h1>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="text-lg font-semibold text-foreground/80 rounded-lg bg-card px-4 py-2">Player: {playerName}</div>
            <div className="text-lg font-semibold text-foreground/80 rounded-lg bg-card px-4 py-2">Level: {level}</div>
            <div className="text-lg font-semibold text-foreground/80 rounded-lg bg-card px-4 py-2">Moves: {moves}</div>
            <Button onClick={handleResetGame} variant="default">
              Reset Game
            </Button>
          </div>
        </header>

        <div className={gridLayout}>
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
      <WinScreen open={gameWon} onPlayAgain={handleResetGame} />
      <LevelCompleteScreen open={levelComplete} onNextLevel={handleNextLevel} level={level} />
    </main>
  );
}
