'use client';

import Main from '@/components/Main/Main';

import { useAuthHook } from '@/services/useAuthHook';

export default function MainPage() {
  useAuthHook();
  return <Main />;
}
