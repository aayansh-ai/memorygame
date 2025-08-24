"use client";

import { cn } from "@/lib/utils";
import { Star, type LucideIcon } from "lucide-react";

interface CardProps {
  Icon: LucideIcon;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
}

export function GameCard({ Icon, isFlipped, isMatched, onClick }: CardProps) {
  const isInteractable = !isMatched && !isFlipped;

  return (
    <div
      className="rounded-lg [perspective:1000px] aspect-square"
      onClick={isInteractable ? onClick : undefined}
      role="button"
      aria-pressed={isFlipped}
      aria-label="Game card"
    >
      <div
        className={cn(
          "relative h-full w-full rounded-lg shadow-xl transition-all duration-700 [transform-style:preserve-3d]",
          isFlipped && "[transform:rotateY(180deg)]",
          isMatched && "opacity-0 [transform:rotateY(180deg)_scale(0.9)]",
          isInteractable && "cursor-pointer hover:scale-105"
        )}
      >
        {/* Card Back */}
        <div className="absolute flex h-full w-full items-center justify-center rounded-lg bg-accent [backface-visibility:hidden]">
          <Star className="h-1/2 w-1/2 text-white fill-white" />
        </div>
        {/* Card Front */}
        <div className="absolute flex h-full w-full items-center justify-center rounded-lg bg-card [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <Icon className="h-3/4 w-3/4 text-primary" />
        </div>
      </div>
    </div>
  );
}
