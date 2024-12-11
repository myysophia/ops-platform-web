'use client';

import React from 'react';
import { Card, Row, Col, Statistic, Table, Progress, Alert, Space, Tag, Button } from 'antd';
import { CloudServerOutlined, ReloadOutlined } from '@ant-design/icons';
import type { TableColumnsType } from 'antd';

interface NodeRecord {
    key: string;
    name: string;
    status: string;
    cpu: number;
    memory: number;
    role: string;
}

export const K8sInfo = () => {
    const [loading, setLoading] = React.useState(false);
    const [clusterData, setClusterData] = React.useState({
        nodes: 12,
        pods: 156,
        namespaces: 8,
        deployments: 45,
        services: 38,
        cpu_usage: 75,
        memory_usage: 60,
        storage_usage: 45
    });

    const nodeColumns: TableColumnsType<NodeRecord> = [
        { title: '节点名称', dataIndex: 'name' },
        {
            title: '状态',
            dataIndex: 'status',
            render: status => (
                <Tag color={status === 'Ready' ? 'success' : 'error'}>
                    {status}
                </Tag>
            )
        },
        {
            title: 'CPU使用率',
            dataIndex: 'cpu',
            render: cpu => <Progress percent={cpu} size="small" />
        },
        {
            title: '内存使用率',
            dataIndex: 'memory',
            render: memory => <Progress percent={memory} size="small" />
        },
        {
            title: '角色',
            dataIndex: 'role',
            render: role => (
                <Tag color={role === 'master' ? 'blue' : 'green'}>
                    {role}
                </Tag>
            )
        }
    ];

    const nodeData: NodeRecord[] = [
        { key: '1', name: 'node-1', status: 'Ready', cpu: 65, memory: 70, role: 'master' },
        { key: '2', name: 'node-2', status: 'Ready', cpu: 45, memory: 50, role: 'worker' },
        { key: '3', name: 'node-3', status: 'Ready', cpu: 55, memory: 60, role: 'worker' }
    ];

    return (
        <div>
            <Card 
                title="集群概览" 
                extra={
                    <Button icon={<ReloadOutlined />} onClick={() => setLoading(true)}>
                        刷新
                    </Button>
                }
            >
                <Row gutter={[16, 16]}>
                    <Col span={6}>
                        <Card>
                            <Statistic 
                                title="节点数量" 
                                value={clusterData.nodes}
                                prefix={<CloudServerOutlined />}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic 
                                title="Pod数量" 
                                value={clusterData.pods}
                                prefix={<CloudServerOutlined />}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic 
                                title="命名空间数量" 
                                value={clusterData.namespaces}
                                prefix={<CloudServerOutlined />}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic 
                                title="部署数量" 
                                value={clusterData.deployments}
                                prefix={<CloudServerOutlined />}
                            />
                        </Card>
                    </Col>
                </Row>
            </Card>
            
            <Card title="资源使用情况" className="mt-4">
                <Row gutter={16}>
                    <Col span={8}>
                        <Progress
                            type="dashboard"
                            percent={clusterData.cpu_usage}
                            title="CPU使用率"
                        />
                        <div className="text-center mt-2">CPU使用率</div>
                    </Col>
                    <Col span={8}>
                        <Progress
                            type="dashboard"
                            percent={clusterData.memory_usage}
                            title="内存使用率"
                        />
                        <div className="text-center mt-2">内存使用率</div>
                    </Col>
                    <Col span={8}>
                        <Progress
                            type="dashboard"
                            percent={clusterData.storage_usage}
                            title="存储使用率"
                        />
                        <div className="text-center mt-2">存储使用率</div>
                    </Col>
                </Row>
            </Card>

            <Card title="节点状���" className="mt-4">
                <Table
                    columns={nodeColumns}
                    dataSource={nodeData}
                    loading={loading}
                    pagination={false}
                />
            </Card>

            <Card title="告警信息" className="mt-4">
                <Alert
                    message="节点资源告警"
                    description="node-1 的内存使用率超过 70%，请注意关注。"
                    type="warning"
                    showIcon
                    className="mb-4"
                />
                <Alert
                    message="Pod 状态告警"
                    description="命名空间 default 中的 Pod mysql-0 重启次数过多。"
                    type="error"
                    showIcon
                />
            </Card>
        </div>
    );
}; 