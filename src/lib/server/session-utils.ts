import 'server-only';
import { cache } from 'react';
import { createServerSupabaseClient } from '@/lib/server/server';
import { prisma } from '@/utils/prisma';

// Caches the session retrieval operation. This helps in minimizing redundant calls
// across server components for the same session data.
async function getSessionUser() {
  const supabase = await createServerSupabaseClient();
  try {
    const {
      data: { user }
    } = await supabase.auth.getUser();
    return user;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export const getUtilSession = cache(getSessionUser);

// Caches the user information retrieval operation. Similar to getSession,
// this minimizes redundant data fetching across components for the same user data.
export const getUserInfo = cache(async () => {

  const user = await getUtilSession(); // Use the cached session function here

  if (!user) {
    return null; // If there is no user, return null
  }
  try {
    const userInfo = await prisma.user.findUnique({
        where: {
          uid: user?.id,
        },
        select: {
          firstName: true,
          lastName: true,
          email: true,
          course: true,
          collegeYear: true,
        },
      });
    return userInfo;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
});