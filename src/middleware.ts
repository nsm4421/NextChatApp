import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  isAuthenticatedNextjs,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

// 인증없이 접근 가능한 페이지
const publicUrlMather = createRouteMatcher(["/auth"]);

export default convexAuthNextjsMiddleware(async (req) => {
  const isAuth = await isAuthenticatedNextjs();
  const isInAuthPage = publicUrlMather(req);
  if (!isInAuthPage && !isAuth) {
    // 인증없이 접근한 경우, 로그인 페이지로 redirect
    return nextjsMiddlewareRedirect(req, "/auth");
  } else if (isInAuthPage && isAuth) {
    // 인증되었는데 인증페이지 접근한 경우, 홈화면으로 redirect
    return nextjsMiddlewareRedirect(req, "/");
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
