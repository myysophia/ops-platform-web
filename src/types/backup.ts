export interface BackupRecord {
  key: string;
  instance: string;
  env: string;
  backupTime: string;
  size: string;
  status: string;
  downloadUrl?: string;
  intranetDownloadUrl?: string;
}

export interface ExportParams {
  env: string;
  downloadUrl: string;
  instance: string;
} 