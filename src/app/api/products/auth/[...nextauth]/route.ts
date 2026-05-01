import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    })
  ],
  callbacks: {
  session({ session, token }) {
    (session.user as any).role = token.role
    return session
  }
}
})

export { handler as GET, handler as POST }