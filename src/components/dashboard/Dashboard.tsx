'use client';

import React from 'react';
import { Card, Row, Col, Statistic, Table, Alert, Progress } from 'antd';
import { DatabaseOutlined, CloudServerOutlined, AlertOutlined } from '@ant-design/icons';
import type { TableColumnsType } from 'antd';

interface RecentTask {
    key: string;
    name: string;
    type: string;
    status: string;
    time: string;
}

export const Dashboard = () => {
    // 统计数据
    const statistics = [
        { title: 'RDS备份总数', value: 128, icon: <DatabaseOutlined />, color: '#1890ff' },
        { title: 'IoTDB实例', value: 15, icon: <CloudServerOutlined />, color: '#52c41a' },
        { title: 'K8s集群', value: 8, icon: <CloudServerOutlined />, color: '#722ed1' },
        { title: '告警数量', value: 3, icon: <AlertOutlined />, color: '#faad14' }
    ];

    // 最近备份任务数据
    const recentTasks: RecentTask[] = [
        { key: '1', name: 'prod-rds-backup', type: 'RDS', status: '成功', time: '2024-01-20 10:30' },
        { key: '2', name: 'iotdb-daily', type: 'IoTDB', status: '成功', time: '2024-01-20 09:15' },
        { key: '3', name: 'k8s-backup', type: 'K8s', status: '进行中', time: '2024-01-20 11:00' }
    ];

    const columns: TableColumnsType<RecentTask> = [
        { title: '任务名称', dataIndex: 'name' },
        { title: '类型', dataIndex: 'type' },
        { 
            title: '状态', 
            dataIndex: 'status',
            render: status => (
                <span className={status === '成功' ? 'text-green-500' : 'text-blue-500'}>
                    {status}
                </span>
            )
        },
        { title: '完成时间', dataIndex: 'time' }
    ];

    return (
        <div>
            {/* 统计卡片 */}
            <Row gutter={[16, 16]}>
                {statistics.map((stat, index) => (
                    <Col span={6} key={index}>
                        <Card bordered={false} className="dashboard-stat-card">
                            <Statistic 
                                title={stat.title}
                                value={stat.value}
                                prefix={React.cloneElement(stat.icon, { style: { color: stat.color } })}
                                valueStyle={{ color: stat.color }}
                            />
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* 任务列表和系统状态 */}
            <Row gutter={[16, 16]} className="mt-6">
                <Col span={16}>
                    <Card title="最近备份任务" extra={<a href="#">更多</a>}>
                        <Table 
                            dataSource={recentTasks}
                            columns={columns}
                            pagination={false}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="系统状态">
                        <div className="text-center py-5">
                            <Progress
                                type="dashboard"
                                percent={75}
                                format={percent => `${percent}%`}
                            />
                            <div className="mt-4">
                                <Alert
                                    message="存储空间警告"
                                    description="S3存储空间使用率超过75%，请及时清理"
                                    type="warning"
                                    showIcon
                                />
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>

            {/* 备份统计 */}
            <Row gutter={[16, 16]} className="mt-6">
                <Col span={24}>
                    <Card title="备份任务统计">
                        <Row gutter={16}>
                            <Col span={8}>
                                <Progress
                                    percent={100}
                                    success={{ percent: 95 }}
                                    type="circle"
                                    format={() => '95%'}
                                />
                                <div className="mt-2 text-center">
                                    备份成功率
                                </div>
                            </Col>
                            <Col span={8}>
                                <Progress
                                    percent={80}
                                    type="circle"
                                    format={() => '80%'}
                                />
                                <div className="mt-2 text-center">
                                    存储空间使用率
                                </div>
                            </Col>
                            <Col span={8}>
                                <Progress
                                    percent={60}
                                    type="circle"
                                    format={() => '60%'}
                                />
                                <div className="mt-2 text-center">
                                    系统负载
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}; 