import { sendEmail } from '@/app/api/lib/email';
import { NextResponse } from 'next/server';

export async function GET(request: Request, response: Response) {
  try {
    await sendEmail({
      to: 'gerardramonp@gmail.com',
      subject: 'test',
      text: 'test text inside email',
    });

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
