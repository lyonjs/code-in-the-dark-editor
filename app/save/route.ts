import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename')!;
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm : number | string = today.getMonth() + 1; // Months start at 0!
  let dd : number | string = today.getDate();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  const formattedToday = `${yyyy}-${mm}-${dd}/`;


  const blob = await put(`${formattedToday}${filename}-${Date.now()}.html`, request.body!, {
    access: 'public',
  });

  return NextResponse.json(blob);
}