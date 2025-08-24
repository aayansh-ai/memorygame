
"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { PartyPopper } from "lucide-react";
import Confetti from "react-confetti";
import { useWindowSize } from "@uidotdev/usehooks";

interface LevelCompleteScreenProps {
  open: boolean;
  onNextLevel: () => void;
  level: number;
}

export function LevelCompleteScreen({ open, onNextLevel, level }: LevelCompleteScreenProps) {
  const { width, height } = useWindowSize();

  return (
    <AlertDialog open={open}>
      {open && width && height && <Confetti width={width} height={height} />}
      <AlertDialogContent className="max-w-sm">
        <AlertDialogHeader className="items-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-accent/20 mb-4">
            <PartyPopper className="h-12 w-12 text-accent-foreground" />
          </div>
          <AlertDialogTitle className="text-center text-3xl font-bold font-headline">
            Level {level} Complete!
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-base pt-2">
            Great job! You're ready for the next challenge.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button onClick={onNextLevel} className="w-full" size="lg">
            Next Level
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
