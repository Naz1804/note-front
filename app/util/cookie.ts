import { redirect } from "react-router";

export function getCookieValue(cookieHeader: string | null, name: string) {
  if (!cookieHeader) return null;
  
  const cookies = cookieHeader.split(';');
  const cookie = cookies.find(c => c.trim().startsWith(`${name}=`));
  
  return cookie ? cookie.split('=')[1].trim() : null;
}

export function getTokenFromRequest(request: Request) {
  const token = getCookieValue(request.headers.get('Cookie'), 'token');

  if (!token) {
    throw redirect('/login');
  }
  
  return token;
}