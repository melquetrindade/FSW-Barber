import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/app/_lib/prisma"
import { Adapter } from "next-auth/adapters"

// ARQUIVO IMPORTANTE (FAZ A INTEGRAÇÃO COM O NEXTAUTH, PRISMA E AUTENTICAÇÃO COM O GOOLE)
const handler = NextAuth({
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({session, user}){
      session.user = {
        ...session.user,
        id: user.id
      } as any
      return session
    }
  }
})

export { handler as GET, handler as POST }
