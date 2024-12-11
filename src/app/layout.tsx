import { Providers } from './providers';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';

// 导入 antd 样式
import 'antd/dist/reset.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>
        <Providers>
          <ConfigProvider locale={zhCN}>
            {children}
          </ConfigProvider>
        </Providers>
      </body>
    </html>
  );
}
