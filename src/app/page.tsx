'use client';

import { Login } from '@/components/auth/Login';
import { Layout } from '@/components/layout/Layout';
import { LoadingScreen } from '@/components/common/LoadingScreen';
import { useEffect, useState } from 'react';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    // 检查登录状态
    const checkLoginStatus = () => {
      const loginStatus = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(loginStatus);
    };

    // 立即检查一次
    checkLoginStatus();

    // 监听存储变化
    window.addEventListener('storage', checkLoginStatus);

    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  // 如果登录状态还未确定，显示加载界面
  if (isLoggedIn === null) {
    return <LoadingScreen />;
  }

  // 确定登录状态后，显示相应界面
  return isLoggedIn ? <Layout /> : <Login />;
}
