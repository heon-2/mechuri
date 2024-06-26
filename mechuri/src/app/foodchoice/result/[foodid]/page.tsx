import NavBar from '@/components/commons/NavBar';
import TestResult from './TestResult';

export default function ResultPage({ params }: { params: { foodid: Number } }) {
  return (
    <div className="h-screen bg-backGroundColor">
      <NavBar />
      <TestResult foodId={params.foodid} />
    </div>
  );
}
