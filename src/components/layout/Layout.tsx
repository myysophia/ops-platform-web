'use client';

import React, { useState } from 'react';
import { Layout as AntLayout, Menu, Button } from 'antd';
import {
  HomeOutlined,
  DatabaseOutlined,
  CloudServerOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { BackupList } from '@/components/backup/BackupList';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { IoTDBBackup } from '@/components/backup/IoTDBBackup';
import { K8sBackup } from '@/components/k8s/K8sBackup';
import { K8sInfo } from '@/components/k8s/K8sInfo';

const { Header, Sider, Content } = AntLayout;

type MenuItem = Required<MenuProps>['items'][number];

interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('dashboard');

  const menuItems: MenuItem[] = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: '工作台',
    },
    {
      key: 'backup',
      icon: <DatabaseOutlined />,
      label: '数据库备份',
      children: [
        {
          key: 'rds-backup',
          label: 'RDS备份',
        },
        {
          key: 'iotdb-backup',
          label: 'IoTDB备份',
        }
      ]
    },
    {
      key: 'k8s',
      icon: <CloudServerOutlined />,
      label: 'K8s管理',
      children: [
        {
          key: 'k8s-backup',
          label: '集群备份',
        },
        {
          key: 'k8s-info',
          label: '集群信息',
        }
      ]
    }
  ];

  const getComponent = (key: string) => {
    switch (key) {
      case 'dashboard':
        return <Dashboard />;
      case 'rds-backup':
        return <BackupList />;
      case 'iotdb-backup':
        return <IoTDBBackup />;
      case 'k8s-backup':
        return <K8sBackup />;
      case 'k8s-info':
        return <K8sInfo />;
      default:
        return <Dashboard />;
    }
  };

  // 处理退出登录
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    window.location.reload();
  };

  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={setCollapsed}
        style={{
          background: '#001529',
        }}
      >
        <div style={{ 
          height: '64px', 
          lineHeight: '64px', 
          color: '#fff',
          paddingLeft: '24px',
          fontSize: '18px',
          fontWeight: '500',
          letterSpacing: '1px',
          borderBottom: '1px solid #1d3a5c'
        }}>
          运维管理平台
        </div>
        <Menu
          theme="dark"
          selectedKeys={[selectedKey]}
          mode="inline"
          items={menuItems}
          onClick={({key}) => setSelectedKey(key)}
        />
      </Sider>
      <AntLayout>
        <Header style={{ 
          padding: '0 24px', 
          display: 'flex', 
          justifyContent: 'flex-end',
          background: '#001529',
          borderBottom: '1px solid #1d3a5c'
        }}>
          <Button 
            type="link" 
            onClick={handleLogout} 
            style={{ 
              color: '#fff',
              fontSize: '14px',
              opacity: 0.85,
              transition: 'opacity 0.3s',
            }}
          >
            退出登录
          </Button>
        </Header>
        <Content style={{ margin: '16px' }}>
          <div className="bg-white p-6 min-h-[280px]">
            {getComponent(selectedKey)}
          </div>
        </Content>
      </AntLayout>
    </AntLayout>
  );
}; 