'use client';

import Main from '@/components/Main/Main';

import { useAuthHook } from '@/services/hooks/useAuthHook';
import useSelectedAndProgress from '@/services/hooks/useSelectedAndProgress';

export default function MainPage() {
  useAuthHook();
  useSelectedAndProgress();

  return <Main />;
}
