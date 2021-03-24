import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
  providers: [
    // OAuth authentication providers...
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: "read:user"
    })
  ],
  // Optional SQL or MongoDB database to persist users
  database: process.env.DATABASE_URL
})