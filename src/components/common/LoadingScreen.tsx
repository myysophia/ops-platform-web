'use client';

import React from 'react';
import { Spin } from 'antd';

export const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-blue-800">
      <Spin size="large" />
    </div>
  );
}; 