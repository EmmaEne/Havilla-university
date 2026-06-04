import DashboardLayout from '../../components/layout/DashboardLayout';
import { Card, CardHeader, Button, Badge } from '../../components/ui';
import { FileText, Download, Eye, ExternalLink, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';

export default function Documents() {
  const { user } = useAuth();
  const { success } = useNotification();

  const handleDownload = (docName) => {
    success(`Downloading ${docName} slip...`);
  };

  const docs = [
    { name: 'Semester Course Registration Slip', code: 'CSC-301-REG', date: '2024-09-22', category: 'Registration', size: '142 KB' },
    { name: 'First Semester Tuition Receipt', code: 'RCP-2024-001', date: '2024-09-20', category: 'Receipt', size: '89 KB' },
    { name: 'Statement of Academic Grades (Transcript)', code: 'TRANS-CSC-300', date: '2024-08-15', category: 'Result', size: '312 KB' },
    { name: 'Student Identity Card Request Slip', code: 'ID-REQ-300', date: '2024-09-18', category: 'Identity', size: '64 KB' },
  ];

  return (
    <DashboardLayout title="Documents & Downloads">
      <div className="flex flex-col gap-6">

        {/* Secure Document Information Card */}
        <Card className="border-success" style={{ borderLeft: '4px solid var(--color-success)' }}>
          <div className="flex gap-3">
            <ShieldCheck className="text-success flex-shrink-0" size={24} />
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-sm">Secure Digitally Signed Documents</span>
              <span className="text-xs text-secondary">All downloadable slips are cryptographically verified by Havilla Registry. Check QR codes on printouts to verify authenticity in external portals.</span>
            </div>
          </div>
        </Card>

        {/* Downloads Grid */}
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-6)' }}>
          {docs.map((doc, idx) => (
            <Card key={idx} hover>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-tertiary" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--color-primary)' }}>
                    <FileText size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm truncate" style={{ maxWidth: '200px' }}>{doc.name}</h4>
                    <span className="text-muted" style={{ fontSize: '10px' }}>Ref: {doc.code} • {doc.size}</span>
                  </div>
                </div>
                <Badge variant={doc.category === 'Receipt' ? 'success' : doc.category === 'Result' ? 'accent' : 'primary'}>
                  {doc.category}
                </Badge>
              </div>

              <div className="flex justify-between items-center text-xs mt-6" style={{ borderTop: '1px solid var(--divider)', paddingTop: '12px' }}>
                <span className="text-muted">Generated: {doc.date}</span>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" icon={Eye} onClick={() => success(`Previewing ${doc.name}...`)}>
                    Preview
                  </Button>
                  <Button variant="outline" size="sm" icon={Download} onClick={() => handleDownload(doc.name)}>
                    Download
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

      </div>
    </DashboardLayout>
  );
}
