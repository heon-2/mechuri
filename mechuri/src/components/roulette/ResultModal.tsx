import React, { useEffect } from 'react';
import { FoodData } from '@/app/roulette/page';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface ResultModalProps {
  onClose: () => void;
  result: FoodData | null;
  open: boolean;
}

export default function ResultModal({ onClose, result, open }: ResultModalProps) {
  return (
    <div>
      <AlertDialog open={open} onOpenChange={onClose}>
        {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>오늘의 추천 메뉴는?</AlertDialogTitle>
            <AlertDialogDescription>{result?.name}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onClose}>다시</AlertDialogCancel>
            <AlertDialogAction>결정</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
