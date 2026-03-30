import NextAuth from "next-auth"
import Facebook from "next-auth/providers/facebook"
import Google from "next-auth/providers/google"


export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    Google({
        clientId:process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
})