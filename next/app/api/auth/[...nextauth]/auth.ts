// auth.ts

import { Session, SessionStrategy } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { User as NextAuthUser } from 'next-auth';
import apiClient from '@/services/apiClient';
import { AdapterUser } from 'next-auth/adapters';
import { JWT } from 'next-auth/jwt';

interface User extends NextAuthUser {
  name: string;
  email: string;
  image: string;
}

export interface UserData {
  _id: string;
  name: string;
  username: string;
  events: string[];
  communities: string[];
  profileImage: string;
  email: string;
}

interface ModData {
  _id: string;
  username: string;
  profileImage: string;
  email: string;
}

const options = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
        mod: { label: 'Mod', type: 'boolean' },
      },
      authorize: async (credentials) => {
        if (!credentials) return null;

        const endpoint = credentials.mod === '1' ? '/mod/auth' : '/user/auth';

        if (credentials.mod === '1') {
          return await apiClient
            .post<ModData>(endpoint, {
              username: credentials.username,
              password: credentials.password,
            })
            .then((res) => {
              if (res.status === 200) {
                return {
                  name: res.data.username,
                  email: res.data.email,
                  image: res.data._id,
                } as User;
              } else {
                return null;
              }
            })
            .catch(() => null);
        } else {
          return await apiClient
            .post<UserData>(endpoint, {
              username: credentials.username,
              password: credentials.password,
            })
            .then((res) => {
              if (res.status === 200) {
                console.log("Creds match");
                return {
                  name: res.data.username,
                  email: credentials.mod,
                  image: res.data._id,
                } as User;
              } else {
                return null;
              }
            })
            .catch(() => null);
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt' as SessionStrategy,
  },
  callbacks: {
    async jwt({token, user}: {token: JWT, user: NextAuthUser}) {
      if (user) {
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: any }) {
      if (!session.user) return session;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.image = token.image;
      return session;
    },
  },
};

export default options;
