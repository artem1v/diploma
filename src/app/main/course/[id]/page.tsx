'use client';

import CoursePage from '@/components/CoursePage/CoursePage';

import { useAuthHook } from '@/services/hooks/useAuthHook';
import useSelectedAndProgress from '@/services/hooks/useSelectedAndProgress';

export default function CoursePagePage() {
  useAuthHook();
  useSelectedAndProgress();

  return <CoursePage />;
}
