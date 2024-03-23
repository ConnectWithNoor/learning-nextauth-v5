## Learning how to use NextAuth V5 (Auth.js V5)

![Preview](https://i.imgur.com/KlfXvY2.png)

#### Now Known as [Auth.js](https://authjs.dev/)

First, run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

#### Packages Used

- Next.js 14
- [Auth.js v5](https://authjs.dev/)
- Prisma ORM
- PostgresDB [Neon.tech](https://console.neon.tech/)
- ShaedCN
- [Resend](https://resend.com/)

#### Features

- Login user
- Register user
- AuthGuard (public and private route/page)
- [Edge compatibility](https://authjs.dev/guides/upgrade-to-v5?authentication-method=middleware#edge-compatibility) for Auth.js to work with OEM (Prisma) ["Next route/middleware runs on edge while Prisma dones't support edge yet, by using the JWT session strategy"]
- Callbacks jwt and session (The flow goes from JWT to Session, meaning whatever we encoding in jwt will be recieved in session)
- Callback for signin (custom signin logic ex: block signin of particular user)
- Role based Authentication (Admin and User)
- Authentication on server components and client components
- Created custom prisma adapter to support custom logic OAuth account creation
- Restrict unverified users (without email verification) to login.
- Send verification email on signup by credentials.

#### Authentication Strategies used

- By using email and password
- OAuth (Github and Google)

Made by [Noor Muhammad](https://www.linkedin.com/in/connectwithnoor)
