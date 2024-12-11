'use client';

import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

export const Login = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleSubmit = (values: { username: string; password: string }) => {
        if (values.username === 'admin' && values.password === 'admin') {
            localStorage.setItem('isLoggedIn', 'true');
            window.location.reload();
        } else {
            message.error('用户名或密码错误');
        }
    };

    // 在组件挂载前不渲染内容
    if (!mounted) {
        return null;
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-900 to-blue-800 relative overflow-hidden opacity-0 animate-fadeIn">
            <div className="absolute inset-0 bg-radial-gradient animate-pulse opacity-50" />
            
            <Card className="w-[400px] rounded-lg shadow-xl bg-white/98">
                <div className="text-center mb-8">
                    <h2 className="text-2xl text-blue-900 mb-2 font-medium">
                        运维管理平台
                    </h2>
                    <p className="text-gray-600 text-sm">
                        欢迎登录运维管理平台
                    </p>
                </div>

                <Form
                    name="login"
                    onFinish={handleSubmit}
                    size="large"
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: '请输入用户名' }]}
                    >
                        <Input 
                            prefix={<UserOutlined className="text-gray-400" />}
                            placeholder="用户名"
                            className="h-10"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: '请输入密码' }]}
                    >
                        <Input.Password 
                            prefix={<LockOutlined className="text-gray-400" />}
                            placeholder="密码"
                            className="h-10"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button 
                            type="primary" 
                            htmlType="submit"
                            className="w-full h-10 text-base bg-gradient-to-r from-blue-900 to-blue-800 border-none"
                        >
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}; 