import { Providers } from './providers';
import { ConfigProvider, theme } from 'antd';
import zhCN from 'antd/locale/zh_CN';

// 导入样式
import 'antd/dist/reset.css';
import '@/styles/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>
        <Providers>
          <ConfigProvider
            locale={zhCN}
            theme={{
              algorithm: theme.defaultAlgorithm,
              token: {
                colorPrimary: '#1890ff',
              },
            }}
          >
            {children}
          </ConfigProvider>
        </Providers>
      </body>
    </html>
  );
}
