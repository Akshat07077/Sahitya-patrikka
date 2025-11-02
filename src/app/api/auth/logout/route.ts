import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  // Since we're using JWT tokens stored on the client side,
  // logout is handled client-side by removing the token.
  // This endpoint provides a consistent API response.
  return NextResponse.json({
    success: true,
    message: 'Logged out successfully',
  });
}
