import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 获取浏览器中名为 auth 的 Cookie
  const auth = request.cookies.get('auth');
  
  // 如果没有登录 Cookie，且访问的不是 /login 页面，强制重定向到 /login
  if (!auth && request.nextUrl.pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // 如果已经登录，且访问的是 /login 页面，自动跳转回首页 /
  if (auth && request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  return NextResponse.next();
}

// 配置需要被中间件拦截的路由，排除静态文件和 API 路由
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
