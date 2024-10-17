import { type NextRequest, NextResponse } from "next/server";
import { jwtVerify, createRemoteJWKSet } from "jose";

const JWKS = createRemoteJWKSet(
  new URL(
    "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com"
  )
);

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const headers = new Headers(req.headers);
  headers.set("x-current-path", req.nextUrl.pathname);

  if (!token) {
    return NextResponse.redirect(`${req.nextUrl.origin}/login`);
  }
  
  try {
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: `https://securetoken.google.com/${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}`,
      audience: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    });
    
    return NextResponse.next({ headers });
  } catch (error) {
    return NextResponse.redirect(`${req.nextUrl.origin}/login`);
  }
}

export const config = {
  matcher: ["/customers/:path*", "/billing/:path*", "/"], // Añade aquí rutas protegidas
};
