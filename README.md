## convex

> Reference

https://docs.convex.dev/quickstart/nextjs

> Set Up

```
bunx convex dev

bun add @convex-dev/auth @auth/core

bunx @convex-dev/auth
```

> Auth

- 다음 경로로 이동해서 url가져오기

  Convex Dashboard > Personal Deployment Settings > URL & Deploy Key > HTTP Actions URL

- 깃허브에서 OAuth설정하기

  client id, secret 가져오기

- convex에 환경변수 등록하기
  ```
  bunx convex env set AUTH_GITHUB_ID=
  bunx convex env set AUTH_GITHUB_SECRET=
  ```
