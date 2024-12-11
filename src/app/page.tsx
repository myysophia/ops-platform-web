'use client';

import { BackupList } from '@/components/backup/BackupList';
import { Layout } from '@/components/layout/Layout';

export default function Home() {
  return (
    <Layout>
      <BackupList />
    </Layout>
  );
}
