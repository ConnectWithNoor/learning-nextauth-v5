## Learning how to use NextAuth V5 (Auth.js V5)

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

#### Features

- Login user
- Register user
- AuthGuard (public and private route/page)
- [Edge compatibility](https://authjs.dev/guides/upgrade-to-v5?authentication-method=middleware#edge-compatibility) for Auth.js to work with OEM (Prisma) [//]: # "Next route/middleware runs on edge while Prisma dones't support egde yet, by forcing a JWT session strategy"
- Callbacks jwt and session (The flow goes from JWT to Session, meaning whatever we encoding in jwt will be recieved in session)
- Callback for signin (custom signin logic ex: block signin of particular user)
- Role based Authentication (Admin and User)

#### Authentication Strategies used

- By using email and password

Made by [Noor Muhammad](https://www.linkedin.com/in/connectwithnoor)
