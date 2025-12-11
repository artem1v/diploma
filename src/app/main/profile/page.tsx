'use client';

import Profile from '@/components/Profile/Profile';

import { useAuthHook } from '@/services/hooks/useAuthHook';
import useSelectedAndProgress from '@/services/hooks/useSelectedAndProgress';
import useCoursesWorkouts from '@/services/hooks/useCoursesWorkouts';

export default function ProfilePage() {
  useAuthHook();
  useSelectedAndProgress();
  useCoursesWorkouts();

  return <Profile />;
}
