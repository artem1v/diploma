'use client';
import Profile from '@/components/Profile/Profile';

import { useAuthHook } from '@/services/useAuthHook';

export default function ProfilePage() {
  useAuthHook();
  return <Profile />;
}
