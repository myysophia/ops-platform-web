import { Layout as AntLayout, Menu } from 'antd';
import { ReactNode } from 'react';

const { Header, Sider, Content } = AntLayout;

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#fff', padding: '0 24px' }}>
        运维管理平台
      </Header>
      <AntLayout>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            style={{ height: '100%', borderRight: 0 }}
            items={[
              { key: '1', label: '备份管理' },
              { key: '2', label: 'K8s管理' },
            ]}
          />
        </Sider>
        <Content style={{ padding: '24px', minHeight: 280 }}>
          {children}
        </Content>
      </AntLayout>
    </AntLayout>
  );
}; 