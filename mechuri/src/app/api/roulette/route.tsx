import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/connectDB';

export async function GET(request: NextRequest) {
  try {
    const { db } = await connectDB();
    const foodsCollection = db.collection('foods');
    const foods = await foodsCollection.find({}).toArray();

    return new Response(JSON.stringify(foods), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching foods: ', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch foods' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
