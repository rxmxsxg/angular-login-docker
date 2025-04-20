# angular-login-docker

ng new login-app --routing --style=scss
cd login-app

ng generate component auth/login
ng generate component auth/register

src/app/
├── auth/
│ ├── auth.service.ts
│ ├── auth.guard.ts
│ ├── login/
│ │ └── login.component.ts/html/scss
│ ├── register/
│ │ └── register.component.ts/html/scss
├── core/
│ └── token.interceptor.ts
├── app-routing.module.ts
├── app.module.ts
