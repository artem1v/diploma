'use client';

import { useParams } from 'next/navigation';

import CoursePage from '@/components/CoursePage/CoursePage';

import { useAuthHook } from '@/services/useAuthHook';

export default function CoursePagePage() {
  useAuthHook();
  const params = useParams<{ id: string }>();

  return <CoursePage currentCourseId={params.id} />;
}
