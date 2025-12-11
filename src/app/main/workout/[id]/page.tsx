'use client';

import WorkoutPage from '@/components/WorkoutPage/WorkoutPage';

import { useAuthHook } from '@/services/hooks/useAuthHook';
import useSelectedAndProgress from '@/services/hooks/useSelectedAndProgress';
import useCoursesWorkouts from '@/services/hooks/useCoursesWorkouts';

export default function CoursePagePage() {
  useAuthHook();
  useSelectedAndProgress();
  useCoursesWorkouts();

  return <WorkoutPage />;
}
