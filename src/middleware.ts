import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  isAuthenticatedNextjs,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

// 인증없이 접근 가능한 페이지
const publicUrlMather = createRouteMatcher(["/auth"]);

export default convexAuthNextjsMiddleware(async (req) => {
  // 인증없이 접근한 경우, 로그인 페이지로 redirect
  if (!publicUrlMather(req) && !(await isAuthenticatedNextjs())) {
    return nextjsMiddlewareRedirect(req, "/auth");
  }
  // TODO : 이미 로그인했는데 인증페이지로 접근한 경우 redirec
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
