'use client';

import React from 'react';
import { Card, Table, Button, Space, Modal, Form, Select, Input, message, Tag } from 'antd';
import { CloudUploadOutlined, ReloadOutlined } from '@ant-design/icons';
import type { TableColumnsType } from 'antd';

interface BackupRecord {
    key: string;
    cluster: string;
    namespace: string;
    content: string;
    time: string;
    status: string;
    size: string;
}

export const K8sBackup = () => {
    const [loading, setLoading] = React.useState(false);
    const [backupModalVisible, setBackupModalVisible] = React.useState(false);
    const [restoreModalVisible, setRestoreModalVisible] = React.useState(false);
    const [selectedRecord, setSelectedRecord] = React.useState<BackupRecord | null>(null);

    const backupData: BackupRecord[] = [
        {
            key: '1',
            cluster: 'prod-cluster',
            namespace: 'default',
            content: 'Full Backup',
            time: '2024-01-20 10:30:00',
            status: 'Success',
            size: '2.5GB'
        }
    ];

    const columns: TableColumnsType<BackupRecord> = [
        { title: '集群名称', dataIndex: 'cluster' },
        { title: '命名空间', dataIndex: 'namespace' },
        { title: '备份内容', dataIndex: 'content' },
        { title: '备份大小', dataIndex: 'size' },
        { title: '备份时间', dataIndex: 'time' },
        {
            title: '状态',
            dataIndex: 'status',
            render: status => (
                <Tag color={status === 'Success' ? 'success' : 'error'}>
                    {status}
                </Tag>
            )
        },
        {
            title: '操作',
            render: (_, record) => (
                <Space>
                    <Button 
                        type="primary"
                        onClick={() => {
                            setSelectedRecord(record);
                            setRestoreModalVisible(true);
                        }}
                    >
                        恢复
                    </Button>
                    <Button onClick={() => handleDownload(record)}>
                        下载
                    </Button>
                    <Button 
                        danger
                        onClick={() => handleDelete(record)}
                    >
                        删除
                    </Button>
                </Space>
            )
        }
    ];

    const handleBackup = (values: any) => {
        setLoading(true);
        // 模拟备份操作
        setTimeout(() => {
            message.success('备份任务已创建');
            setBackupModalVisible(false);
            setLoading(false);
        }, 1500);
    };

    const handleRestore = (values: any) => {
        setLoading(true);
        // 模拟恢复操作
        setTimeout(() => {
            message.success('恢复任务已创建');
            setRestoreModalVisible(false);
            setLoading(false);
        }, 1500);
    };

    const handleDownload = (record: BackupRecord) => {
        message.info('开始下载备份文件');
    };

    const handleDelete = (record: BackupRecord) => {
        Modal.confirm({
            title: '确认删除',
            content: `确定要删除集群 ${record.cluster} 的备份吗？`,
            onOk() {
                message.success('备份已删除');
            }
        });
    };

    return (
        <div>
            <Card 
                title="K8s集群备份" 
                extra={
                    <Space>
                        <Button 
                            type="primary" 
                            icon={<CloudUploadOutlined />}
                            onClick={() => setBackupModalVisible(true)}
                        >
                            创建备份
                        </Button>
                        <Button 
                            icon={<ReloadOutlined />}
                            onClick={() => setLoading(true)}
                        >
                            刷新
                        </Button>
                    </Space>
                }
            >
                <Table
                    columns={columns}
                    dataSource={backupData}
                    loading={loading}
                />
            </Card>

            {/* 创建备份模态框 */}
            <Modal
                title="创建备份"
                open={backupModalVisible}
                onCancel={() => setBackupModalVisible(false)}
                footer={null}
            >
                <Form onFinish={handleBackup}>
                    <Form.Item
                        label="集群"
                        name="cluster"
                        rules={[{ required: true }]}
                    >
                        <Select>
                            <Select.Option value="prod-cluster">生产集群</Select.Option>
                            <Select.Option value="staging-cluster">预发集群</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="命名空间"
                        name="namespace"
                        rules={[{ required: true }]}
                    >
                        <Select>
                            <Select.Option value="default">default</Select.Option>
                            <Select.Option value="app-ns">app-ns</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            创建
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            {/* 恢复备份模态框 */}
            <Modal
                title="恢复备份"
                open={restoreModalVisible}
                onCancel={() => setRestoreModalVisible(false)}
                footer={null}
            >
                <Form onFinish={handleRestore}>
                    <Form.Item
                        label="目标集群"
                        name="targetCluster"
                        rules={[{ required: true }]}
                    >
                        <Select>
                            <Select.Option value="prod-cluster">生产��群</Select.Option>
                            <Select.Option value="staging-cluster">预发集群</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="目标命名空间"
                        name="targetNamespace"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            开始恢复
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}; 