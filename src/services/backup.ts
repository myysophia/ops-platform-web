import { axios } from '@/lib/axios';
import type { BackupRecord, ExportParams } from '@/types/backup';

export const backupApi = {
  // 获取阿里云备份列表
  getAliBackups: async (): Promise<BackupRecord[]> => {
    const { data: instances } = await axios.get('/instances');
    const aliInstances = instances.aliyun || [];
    
    const backupData = await Promise.all(
      aliInstances.map(async (env: string) => {
        try {
          const { data } = await axios.get(`/alirds/${env}`);
          return {
            key: env,
            instance: data.instance || env,
            env,
            backupTime: data.backup_time || '-',
            size: data.backup_size || '-',
            status: data.status || '成功',
            downloadUrl: data.BackupDownloadURL,
            intranetDownloadUrl: data.BackupIntranetDownloadURL
          };
        } catch (error) {
          console.error(`Error fetching backup for ${env}:`, error);
          return null;
        }
      })
    );
    
    return backupData.filter(Boolean) as BackupRecord[];
  },

  // 获取AWS备份列表
  getAwsBackups: async (): Promise<BackupRecord[]> => {
    const { data: instances } = await axios.get('/instances');
    const awsInstances = instances.aws || [];
    
    const backupData = await Promise.all(
      awsInstances.map(async (env: string) => {
        try {
          const { data } = await axios.get(`/awsrds/${env}`);
          return {
            key: env,
            instance: data.DBSnapshotIdentifier,
            env,
            backupTime: data.SnapshotCreateTime,
            status: 'Success',
          };
        } catch (error) {
          console.error(`Error fetching AWS backup for ${env}:`, error);
          return null;
        }
      })
    );
    
    return backupData.filter(Boolean) as BackupRecord[];
  },

  // 导出到S3
  exportToS3: async (params: ExportParams) => {
    return axios.post(`/alirds/export/s3/${params.env}`, params);
  },
}; 