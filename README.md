# OPS Platform Web

运维管理平台前端项目，基于 React + TypeScript + Ant Design 构建的现代化运维管理系统。

## 技术栈

### 核心框架
- **React 18**: 用于构建用户界面的 JavaScript 库
- **TypeScript 5**: JavaScript 的超集，添加了类型系统
- **Next.js 14**: React 框架，提供服务端渲染、路由等功能

### UI 框架
- **Ant Design 5.x**: 企业级 UI 设计语言和 React 组件库
- **TailwindCSS 3.x**: 原子化 CSS 框架
- **Shadcn/ui**: 高质量可定制化组件库

### 状态管理
- **Zustand**: 轻量级状态管理库
- **React Query**: 服务端状态管理

### 工具库
- **Axios**: HTTP 客户端
- **Day.js**: 轻量级日期处理库
- **Lodash**: 实用工具库
- **React Hook Form**: 表单处理
- **Zod**: 类型验证

### 开发工具
- **ESLint**: 代码检查
- **Prettier**: 代码格式化
- **Husky**: Git Hooks 工具
- **Commitlint**: Git 提交信息规范化

## 项目结构

```bash
ops-platform-web/
├── src/
│   ├── app/                 # Next.js 应用目录
│   ├── components/          # 通用组件
│   ��── components/         # 基础 UI 组件
│   │   └── business/       # 业务组件
│   ├── hooks/              # 自定义 Hooks
│   ├── layouts/            # 布局组件
│   ├── lib/                # 工具函数
│   ├── services/           # API 服务
│   ├── stores/             # 状态管理
│   ├── styles/             # 全局样式
│   └── types/              # TypeScript 类型定义
├── public/                 # 静态资源
└── tests/                  # 测试文件
```

## 功能模块

### 1. 认证与授权
- 登录/登出
- 权限控制
- 用户管理

### 2. 仪表盘
- 系统概览
- 资源使用统计
- 告警信息展示

### 3. 数据库备份管理
- RDS 备份列表
- IoTDB 备份管理
- 备份任务监控
- 备份恢复操作

### 4. K8s集群管理
- 集群概览
- 节点管理
- 备份管理
- 资源监控

### 5. 系统管理
- 用户管理
- 角色权限
- 系统配置
- 操作日志

## 开发规范

### 1. 组件开发规范
- 使用函数组件和 Hooks
- 实现组件类型定义
- 添加必要的注释
- 遵循 SOLID 原则

### 2. 状态管理规范
- 按功能模块划分 store
- 使用 TypeScript 定义 store 类型
- 遵循 immutable 原则

### 3. API 调用规范
- 统一的错��处理
- 请求响应拦截
- 类型定义
- 缓存策略

### 4. 样式开发规范
- 优先使用 Tailwind CSS
- 组件级别样式隔离
- 主题定制
- 响应式设计

## 开发流程

1. 安装依赖
```bash
pnpm install
```

2. 启动开发服务器
```bash
pnpm dev
```

3. 构建生产版本
```bash
pnpm build
```

4. 运行测试
```bash
pnpm test
```

## 部署说明

### 开发环境
```bash
# 构建镜像
docker build -t ops-platform-web:dev .

# 运行容器
docker run -d -p 3000:3000 ops-platform-web:dev
```

### 生产环境
```bash
# 使用多阶段构建优化镜像大小
docker build -t ops-platform-web:prod -f Dockerfile.prod .
```

## 性能优化

1. 代码分割
- 路由级别的代码分割
- 组件懒加载
- 第三方库按需引入

2. 缓存优化
- API 响应缓存
- 静态资源缓存
- 状态持久化

3. 打包优化
- Tree Shaking
- 压缩资源
- 图片优化

## 后续规划

1. 功能增强
- 多语言支持
- 黑暗模式
- 更多的图表展示
- 导出功能

2. 性能优化
- 首屏加载优化
- 组件性能优化
- 网络请求优化

3. 开发体验
- 组件文档完善
- 测试覆盖率提升
- CI/CD 完善

## 技术实现说明

### 1. 类型定义 (src/types/backup.ts)
```typescript
// 备份记录接口
export interface BackupRecord {
  key: string;          // 唯一标识
  instance: string;     // 实例名称
  env: string;         // 环境标识
  backupTime: string;  // 备份时间
  size: string;        // 备份大小
  status: string;      // 备份状态
  downloadUrl?: string; // 下载链接(可选)
  intranetDownloadUrl?: string; // 内网下载链接(可选)
}

// 导出参数接口
export interface ExportParams {
  env: string;         // 环境标识
  downloadUrl: string; // 下载链接
  instance: string;    // 实例名称
}
```

### 2. HTTP 客户端配置 (src/lib/axios.ts)
- 基于 axios 创建实例,配置基础 URL 和超时时间
- 请求拦截器: 添加认证 token
- 响应拦截器: 统一错误处理
```typescript
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
});
```

### 3. API 服务层 (src/services/backup.ts)
封装所有与备份相关的 API 请求:
- getAliBackups: 获取阿里云 RDS 备份列表
- getAwsBackups: 获取 AWS RDS 备份列表
- exportToS3: 导出备份到 S3

特点:
- 使用 TypeScript 类型约束
- 统一的错误处理
- Promise 异步处理

### 4. 备份列表组件 (src/components/backup/BackupList.tsx)
主要功能:
- 使用 React Query 管理服务端状态
- 支持阿里云和 AWS 备份数据展示
- 实现下载和导出功能
- 响应式表格展示

关键实现:
```typescript
// 使用 React Query 获取数据
const { data: aliData, isLoading: aliLoading } = useQuery(
  'aliBackups',
  backupApi.getAliBackups
);

// 导出到 S3 的 mutation
const exportMutation = useMutation(backupApi.exportToS3);
```

### 5. 应用配置
#### 环境变量 (.env.development)
```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

#### 后端跨域配置
```go
router.Use(cors.New(cors.Config{
  AllowOrigins:     []string{"http://localhost:3000"},
  AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
  AllowHeaders:     []string{"Origin", "Content-Type", "Accept"},
  ExposeHeaders:    []string{"Content-Length"},
  AllowCredentials: true,
  MaxAge:           12 * time.Hour,
}))
```

### 6. 状态管理
- 使用 React Query 管理服务端状态
- 使用 React Hooks 管理本地状态
- 支持数据缓存和自动重新获取

### 7. 错误处理
- API 层统一错误处理
- 友好的错误提示
- 请求重试机制

### 8. 性能优化
- 按需加载组件
- 数据缓存
- 防抖和节流
- 延迟加载

## 前后端分离实现

### 1. 类型系统设计
在 `src/types/backup.ts` 中定义了核心的数据类型：

```typescript
// 备份记录接口 - ��一阿里云和AWS的备份数据结构
export interface BackupRecord {
  key: string;          // 唯一标识，用于React列表渲染
  instance: string;     // 实例名称，如 rm-xxx(阿里云) 或 db-xxx(AWS)
  env: string;         // 环境标识，如 prod/staging
  backupTime: string;  // 备份时间，统一格式化
  size: string;        // 备份大小，如 2.5GB
  status: string;      // 备份状态：成功/失败
  downloadUrl?: string; // 可选的下载链接
  intranetDownloadUrl?: string; // 可选的内网下载链接
}

// 导出参数接口 - 用于S3导出操作
export interface ExportParams {
  env: string;         // 目标环境
  downloadUrl: string; // 源下载链接
  instance: string;    // 目标实例
}
```

类型设计考虑：
- 统一数据结构：兼容阿里云和AWS的不同数据格式
- 可选字段：使用TypeScript可选属性处理可能缺失的字段
- 类型复用：导出参数复用备份记录中的字段

### 2. HTTP客户端封装
在 `src/lib/axios.ts` 中封装了统一的HTTP客户端：

```typescript
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // 从环境变量获取API地址
  timeout: 10000, // 10秒超时
});

// 请求拦截器 - 统一处理认证
axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 响应拦截器 - 统一错误处理
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    message.error(error.response?.data?.message || '请求失败');
    return Promise.reject(error);
  }
);
```

封装特点：
- 统一配置：基础URL、超时时间等
- 认证处理：自动添加token
- 错误处理：统一的错误提示
- 类型支持：完整的TypeScript类型定义

### 3. API服务层设计
在 `src/services/backup.ts` 中实现了业务API封装：

```typescript
export const backupApi = {
  // 获取阿里云备份列表
  getAliBackups: async (): Promise<BackupRecord[]> => {
    const { data: instances } = await axios.get('/instances');
    return Promise.all(
      instances.aliyun.map(async (env: string) => {
        const { data } = await axios.get(`/alirds/${env}`);
        return {
          key: env,
          instance: data.instance || env,
          env,
          backupTime: data.backup_time || '-',
          size: data.backup_size || '-',
          status: data.status || '成功',
          downloadUrl: data.BackupDownloadURL
        };
      })
    ).then(results => results.filter(Boolean));
  },

  // 导出到S3
  exportToS3: async (params: ExportParams) => {
    return axios.post(`/alirds/export/s3/${params.env}`, params);
  }
};
```

设计特点：
- 职责单一：每个方法只负责一个具体功能
- 错误处理：try-catch捕获具体错误
- 数据转换：统一的数据格式转换
- 类型安全：完整的入参和返回值类型定义

### 4. 组件实现
在 `src/components/backup/BackupList.tsx` 中实现了备份列表组件：

```typescript
export const BackupList = () => {
  // 服务端状态管理
  const { data: aliData, isLoading } = useQuery(
    'aliBackups',
    backupApi.getAliBackups
  );

  // 导出操作
  const exportMutation = useMutation(backupApi.exportToS3, {
    onSuccess: () => message.success('导出任务已创建'),
    onError: () => message.error('导出失败')
  });

  // 表格列定义
  const columns = [
    {
      title: '实例名称',
      dataIndex: 'instance'
    },
    {
      title: '环境',
      render: (env: string) => (
        <Tag color={env === 'prod' ? 'red' : 'green'}>{env}</Tag>
      )
    }
    // ... 其他列定义
  ];

  return (
    <Tabs activeKey={activeTab} onChange={setActiveTab}>
      <TabPane tab="阿里云RDS备份" key="1">
        <Table columns={columns} dataSource={aliData} loading={isLoading} />
      </TabPane>
      {/* ... AWS备份标签页 */}
    </Tabs>
  );
};
```

实现特点：
- 状态管理：使用React Query管理远程数据
- 用户交互：完整的加载状态和错误处理
- 组件复用：通用的表格和标签页组件
- 类型安全：完整的Props和状态类型定义

### 前后端交互流程
1. 前端请求流程：
   - 组件挂载 → React Query触发请求 → API服务层处理 → 更新UI
2. 数据处理流程：
   - 后端返回数据 → API层转换 → 组件渲染
3. 错误处理流程：
   - 异常发生 → 拦截器捕获 → 统一提示 → 组件错误边界处理
4. 状态同步流程：
   - 用户操作 → 触发Mutation → 后端处理 → 自动重新获取数据

## 问题处理记录

### 1. Next.js 配置文件问题
**问题**: Configuring Next.js via 'next.config.ts' is not supported

**解决方案**:
```javascript
// next.config.js - 使用 JS 而不是 TS
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['antd', '@ant-design/icons'],
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8080/:path*',
      },
    ];
  },
};
```

**说明**:
- Next.js 不支持 TypeScript 格式的配置文件
- 需要使用 .js 或 .mjs 格式
- 可以通过 JSDoc 添加类型提示

### 2. React Query v5 API 变更
**问题**: Bad argument type. Starting with v5, only the "Object" form is allowed

**旧代码**:
```typescript
useQuery('aliBackups', backupApi.getAliBackups);

useMutation(backupApi.exportToS3, {
  onSuccess: () => message.success('导出任务已创建')
});
```

**新代码**:
```typescript
useQuery({
  queryKey: ['aliBackups'],
  queryFn: backupApi.getAliBackups
});

useMutation({
  mutationFn: backupApi.exportToS3,
  onSuccess: () => message.success('导出任务已创建')
});
```

**说明**:
- v5 版本要求使用对象形式传参
- queryKey 和 queryFn 需要明确指定
- mutation 也需要使用 mutationFn 指定函数

### 3. 开发环境配置问题
**问题**: --turbopack 选项不支持

**解决方案**:
```json
{
  "scripts": {
    "dev": "next dev",  // 移除 --turbopack
    "build": "next build",
    "start": "next start"
  }
}
```

**说明**:
- 较早版本的 Next.js 不支持 Turbopack
- 需要使用标准的开发服务器配置

### 4. 依赖版本兼容性
**问题**: 类型定义文件找不到和版本不匹配

**解决方案**:
```json
{
  "dependencies": {
    "@tanstack/react-query": "^5.0.0",
    "antd": "^5.0.0",
    "next": "14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "typescript": "^5.0.0"
  }
}
```

**说明**:
- 确保 React 和类型定义版本匹配
- 使用稳定版本的依赖
- 避免使用 beta 或 canary 版本

### 5. 前后端联调注意事项
1. 后端 CORS 配置：
```go
router.Use(cors.New(cors.Config{
  AllowOrigins: []string{"http://localhost:3000"},
  AllowMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
  AllowHeaders: []string{"Origin", "Content-Type", "Accept"},
  AllowCredentials: true,
}))
```

2. 前端 API 配置：
```typescript
// .env.development
NEXT_PUBLIC_API_URL=http://localhost:8080

// next.config.js
async rewrites() {
  return [
    {
      source: '/api/:path*',
      destination: 'http://localhost:8080/:path*',
    },
  ];
}
```

3. 开发流程：
- 先启动后端服务 (8080端口)
- 再启动前端服务 (3000端口)
- 使用 React Query DevTools 调试请求
- 使用浏览器开发工具监控网络请求
