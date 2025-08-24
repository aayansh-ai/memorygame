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

interface WinScreenProps {
  open: boolean;
  onPlayAgain: () => void;
  playerName: string;
}

export function WinScreen({ open, onPlayAgain, playerName }: WinScreenProps) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="max-w-sm">
        <AlertDialogHeader className="items-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-accent/20 mb-4">
            <PartyPopper className="h-12 w-12 text-accent-foreground" />
          </div>
          <AlertDialogTitle className="text-center text-3xl font-bold font-headline">
            Congratulations {playerName}!!
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-base pt-2">
            You've completed all the levels!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button onClick={onPlayAgain} className="w-full" size="lg">
            Play Again
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
