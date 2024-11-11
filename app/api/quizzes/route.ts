// app/api/quizzes/route.ts

import { NextResponse } from 'next/server';
import { fetchQuizzes } from '../../projects/TekaTeki/utils/quizzesService';

export async function GET(request: Request) {
  try {
    const quizzes = await fetchQuizzes();
    return NextResponse.json(quizzes);
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch quizzes.' },
      { status: 500 }
    );
  }
}
