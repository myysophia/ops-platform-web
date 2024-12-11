'use client';

import React from 'react';
import { Card, Table, Space, Button, Tabs } from 'antd';
import type { TableColumnsType } from 'antd';

interface BackupRecord {
    instance: string;
    backupTime: string;
    size: string;
    location: string;
}

interface RestoreRecord {
    taskId: string;
    instance: string;
    restorePoint: string;
    status: string;
    duration: string;
}

export const IoTDBBackup = () => {
    const [activeTab, setActiveTab] = React.useState('backup');

    const backupColumns: TableColumnsType<BackupRecord> = [
        { title: '实例名称', dataIndex: 'instance' },
        { title: '备份时间', dataIndex: 'backupTime' },
        { title: '备份大小', dataIndex: 'size' },
        { title: '存储位置', dataIndex: 'location' },
        { 
            title: '操作',
            render: (_, record) => (
                <Space>
                    <Button type="primary">恢复</Button>
                    <Button>下载</Button>
                    <Button danger>删除</Button>
                </Space>
            )
        }
    ];

    const restoreColumns: TableColumnsType<RestoreRecord> = [
        { title: '任务ID', dataIndex: 'taskId' },
        { title: '实例名称', dataIndex: 'instance' },
        { title: '恢复时间点', dataIndex: 'restorePoint' },
        { title: '状态', dataIndex: 'status' },
        { title: '耗时', dataIndex: 'duration' }
    ];

    const backupData: BackupRecord[] = [
        {
            instance: 'iotdb-prod-1',
            backupTime: '2024-01-20 10:00',
            size: '2.5GB',
            location: 'S3://backups/iotdb/'
        }
    ];

    return (
        <Card>
            <Tabs activeKey={activeTab} onChange={setActiveTab}>
                <Tabs.TabPane tab="备份管理" key="backup">
                    <Table
                        columns={backupColumns}
                        dataSource={backupData}
                    />
                </Tabs.TabPane>
                <Tabs.TabPane tab="恢复记录" key="restore">
                    <Table
                        columns={restoreColumns}
                        dataSource={[]}
                    />
                </Tabs.TabPane>
            </Tabs>
        </Card>
    );
}; 