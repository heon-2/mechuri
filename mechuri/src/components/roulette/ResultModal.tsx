import React, { useEffect } from 'react';
import { FoodData } from '@/app/roulette/Roulette';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();

  return (
    <div>
      <AlertDialog open={open} onOpenChange={onClose}>
        {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex justify-center text-3xl fond-bold mb-4">
              오늘의 추천 메뉴는?
            </AlertDialogTitle>
            <div className="flex justify-center">
              {result?.imageUrl && (
                <img
                  src={result.imageUrl}
                  alt={result.name}
                  className="w-4/5 aspect-[40/31] my-4 rounded-3xl"
                ></img>
              )}
            </div>
            <AlertDialogDescription className="flex justify-center text-xl">
              {result?.name}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-center items-center space-x-4">
            <AlertDialogFooter>
              <AlertDialogCancel onClick={onClose} className="py-3 px-10 rounded-lg">
                다시
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => router.push(`/map?search=${result?.name}`)}
                className="py-3 px-10 rounded-lg"
              >
                지도
              </AlertDialogAction>
            </AlertDialogFooter>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
