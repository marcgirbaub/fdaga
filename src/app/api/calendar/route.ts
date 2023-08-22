import { NextResponse } from 'next/server';

export async function GET(request: Request, response: Response) {
  try {
    // Auth
    // Validacio
    // Peticio a microsoft
    // calculs dies free
    // Calculs hores de cada dia
    // montar la data
    // retornar

    return NextResponse.json('This is working');
  } catch (error) {
    return NextResponse.json(
      {
        error: error,
      },
      {
        status: 400,
      }
    );
  }
}
