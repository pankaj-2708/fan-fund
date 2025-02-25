// "use client";
import NextAuth from 'next-auth'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import LinkedInProvider from "next-auth/providers/linkedin";
import GitHubProvider from "next-auth/providers/github";
import User from '@/models/User';
import TwitterProvider from "next-auth/providers/twitter";
import Payment from '@/models/Payment';
import mongoose from 'mongoose';
import connectDb from '@/db/connectDb'; 



export const authoptions = NextAuth({
  providers: [
    GitHubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET
      }),
      GoogleProvider({
        clientId: process.env.AUTH_GOOGLE_ID,
        clientSecret: process.env.AUTH_GOOGLE_SECRET,
        authorization: {
          params: {
            scope: "openid email profile",
            prompt: "select_account",
            access_type: "offline",
            response_type: "code",
          },
        },
      }),
    FacebookProvider({
      clientId: process.env.AUTH_FB_ID,
      clientSecret: process.env.AUTH_FB_SECRET
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      version: "2.0",
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
       if(account.provider == "github"  || account.provider=="google" || account.provider=="facebook"  || account.provider=="linkedin") { 
        await connectDb()
        const currentUser =  await User.findOne({email: email}) 
        if(!currentUser){
           const newUser = await User.create({
            email: user.email, 
            username: user.email.split("@")[0],
          })   
        } 
        return true
       }
    },
    
    async session({ session, user, token }) {
      session.user.id = token.sub;
      const dbUser = await User.findOne({email: session.user.email})
      console.log(dbUser)
      session.user.name = dbUser.username
      return session
    },
  } 
})



export { authoptions as GET, authoptions as POST }