import { useState } from 'react';
import { Table, Card, Button, Space, Tag, Tabs, message } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { useQuery, useMutation } from '@tanstack/react-query';
import { backupApi } from '@/services/backup';
import type { BackupRecord } from '@/types/backup';

export const BackupList = () => {
  const [activeTab, setActiveTab] = useState('1');
  
  // 更新查询方式
  const { 
    data: aliData, 
    isLoading: aliLoading, 
    refetch: refetchAli 
  } = useQuery({
    queryKey: ['aliBackups'],
    queryFn: backupApi.getAliBackups
  });

  const { 
    data: awsData, 
    isLoading: awsLoading, 
    refetch: refetchAws 
  } = useQuery({
    queryKey: ['awsBackups'],
    queryFn: backupApi.getAwsBackups,
    enabled: activeTab === '2' // 只在AWS标签页激活时获取数据
  });

  // 更新mutation方式
  const exportMutation = useMutation({
    mutationFn: backupApi.exportToS3,
    onSuccess: () => {
      message.success('导出任务已创建');
    },
    onError: () => {
      message.error('导出失败');
    }
  });

  // 处理下载操作
  const handleDownload = (record: BackupRecord) => {
    if (!record.downloadUrl) {
      message.error('下载链接不可用');
      return;
    }

    window.open(record.downloadUrl, '_blank');
    message.success(`开始下载备份: ${record.instance}`);
  };

  // 处理导出到S3操作
  const handleExport = async (record: BackupRecord) => {
    if (!record.downloadUrl) {
      message.error('导出链接不可用');
      return;
    }

    exportMutation.mutate({
      env: record.env,
      downloadUrl: record.downloadUrl,
      instance: record.instance,
    });
  };

  const columns = [
    {
      title: '实例名称',
      dataIndex: 'instance',
      key: 'instance',
    },
    {
      title: '环境',
      dataIndex: 'env',
      key: 'env',
      render: (env: string) => (
        <Tag color={env === 'prod' ? 'red' : 'green'}>
          {env}
        </Tag>
      ),
    },
    {
      title: '备份时间',
      dataIndex: 'backupTime',
      key: 'backupTime',
    },
    {
      title: '备份大小',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === '成功' ? 'success' : 'error'}>
          {status}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: unknown, record: BackupRecord) => (
        <Space>
          <Button 
            type="primary" 
            onClick={() => handleDownload(record)}
            loading={exportMutation.isLoading}
          >
            下载
          </Button>
          <Button 
            onClick={() => handleExport(record)}
            loading={exportMutation.isLoading}
          >
            导出到S3
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Tabs 
        activeKey={activeTab} 
        onChange={setActiveTab}
        tabBarExtraContent={
          <Button 
            onClick={() => activeTab === '1' ? refetchAli() : refetchAws()}
            icon={<ReloadOutlined />}
          >
            刷新数据
          </Button>
        }
      >
        <Tabs.TabPane tab="阿里云RDS备份" key="1">
          <Card>
            <Table
              columns={columns}
              dataSource={aliData}
              loading={aliLoading}
            />
          </Card>
        </Tabs.TabPane>
        <Tabs.TabPane tab="AWS RDS快照" key="2">
          <Card>
            <Table
              columns={columns}
              dataSource={awsData}
              loading={awsLoading}
            />
          </Card>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}; 