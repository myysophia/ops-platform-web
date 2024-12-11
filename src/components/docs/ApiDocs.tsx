'use client';

import React from 'react';
import { Layout, Typography, Button } from 'antd';

const { Header, Content } = Layout;
const { Title } = Typography;

export const ApiDocs = () => {
    return (
        <Layout>
            <Header className="bg-white">
                <Title level={3} className="m-0">API 文档</Title>
                <div className="float-right">
                    <Button 
                        type="default" 
                        className="text-blue-500 hover:text-white hover:bg-blue-500"
                        onClick={() => window.close()}
                    >
                        关闭
                    </Button>
                </div>
            </Header>
            <Content>
                <iframe 
                    src="/doc/index.html" 
                    className="w-full h-[calc(100vh-64px)] border-0"
                />
            </Content>
        </Layout>
    );
}; 