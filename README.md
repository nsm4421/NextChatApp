## convex

### Reference

https://docs.convex.dev/quickstart/nextjs

### Set Up

```
bunx convex dev

bun add @convex-dev/auth @auth/core

bunx @convex-dev/auth
```

### OAuth

- 다음 경로로 이동해서 Convex HTTP Actions URL가져오기

  Convex Dashboard > Personal Deployment Settings > URL & Deploy Key > HTTP Actions URL

- 깃허브에서 OAuth설정하기

  - 깃허브 로그인 후 OAuth앱 만들기
  - client id, secret 가져오기

- GCP 프로젝트 생성하기

  - OAuth동의화면
  - 사용자 인증정보에서 Client ID 생성    
    - 승인된 javascript원본 : [:Convex HTTP Actions URL]/api/auth/callback/google
  - client id, secret 가져오기

- convex에 환경변수 등록하기
  ```
  bunx convex env set AUTH_GITHUB_ID=
  bunx convex env set AUTH_GITHUB_SECRET=
  bunx convex env set AUTH_GOOGLE_ID=
  bunx convex env set AUTH_GOOGLE_SECRET=
  ```