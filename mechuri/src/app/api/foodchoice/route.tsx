import { NextRequest, NextResponse } from 'next/server';
export function GET(request: NextRequest) {
  return NextResponse.json([
    { id: 1, name: '테스트1' },
    { id: 2, name: '테스트2' },
  ]);
}
