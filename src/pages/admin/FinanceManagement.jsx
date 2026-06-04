import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Card, CardHeader, Badge, Button, DataTable, Select } from '../../components/ui';
import StatCard from '../../components/charts/StatCard';
import AreaChart from '../../components/charts/AreaChart';
import { DollarSign, Download, TrendingUp, Filter, Receipt } from 'lucide-react';
import { feePayments, revenueData, revenueSummary } from '../../data/fees';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { exportToCSV } from '../../utils/exportUtils';
import { useNotification } from '../../contexts/NotificationContext';
import { students } from '../../data/students';

export default function FinanceManagement() {
  const [filterStatus, setFilterStatus] = useState('');
  const { success } = useNotification();

  // Map student name to payment records
  const paymentDetails = feePayments.map(pay => {
    const student = students.find(s => s.id === pay.studentId) || { firstName: 'Demo', lastName: 'Student' };
    return {
      ...pay,
      studentName: `${student.firstName} ${student.lastName}`,
    };
  });

  const filteredPayments = filterStatus === '' ? paymentDetails : paymentDetails.filter(p => p.status === filterStatus);

  const handleExportFinance = () => {
    const csvData = filteredPayments.map(p => ({
      ReceiptNo: p.receiptNo || '—',
      StudentName: p.studentName,
      Session: p.session,
      Semester: p.semester,
      Amount: p.amount,
      AmountPaid: p.amountPaid,
      Balance: p.balance,
      Status: p.status,
      Method: p.method || '—',
    }));
    exportToCSV(csvData, `finance_payments_report`);
    success('Exported financial payments ledger to CSV.');
  };

  const statusOptions = [
    { label: 'Paid in Full', value: 'Paid' },
    { label: 'Partial Payment', value: 'Partial' },
    { label: 'Unpaid / Outstanding', value: 'Unpaid' },
  ];

  const columns = [
    { key: 'receiptNo', label: 'Receipt No', width: '120px', render: (val) => val ? <span className="font-semibold">{val}</span> : '—' },
    { key: 'studentName', label: 'Student Name' },
    { key: 'session', label: 'Session' },
    { key: 'amountPaid', label: 'Amount Paid', render: (val) => formatCurrency(val) },
    { key: 'balance', label: 'Balance Owed', render: (val) => (
      <span className={val > 0 ? 'text-error font-semibold' : 'text-success'}>
        {formatCurrency(val)}
      </span>
    )},
    { key: 'status', label: 'Status', width: '120px', render: (val) => (
      <Badge variant={val === 'Paid' ? 'success' : val === 'Partial' ? 'warning' : 'error'}>{val}</Badge>
    )},
  ];

  return (
    <DashboardLayout title="Bursary & Financial Control Ledger">
      <div className="flex flex-col gap-6">

        {/* Finance summaries */}
        <div className="stats-grid">
          <StatCard
            title="Total Billing Expected"
            value={formatCurrency(revenueSummary.totalRevenue)}
            icon={DollarSign}
            description="total invoiced billings"
          />
          <StatCard
            title="Total Revenue Settled"
            value={formatCurrency(revenueSummary.totalCollected)}
            icon={DollarSign}
            trend={`${revenueSummary.collectionRate}%`}
            trendDirection="up"
            description="collection settlement rate"
            className="border-success"
          />
          <StatCard
            title="Total Outstanding Owed"
            value={formatCurrency(revenueSummary.totalOutstanding)}
            icon={DollarSign}
            description="receivable debt outstanding"
            className="border-error"
          />
          <StatCard
            title="Fully Paid Students"
            value={`${revenueSummary.studentsFullyPaid} Active`}
            icon={DollarSign}
            description="no outstanding fees balances"
          />
        </div>

        {/* Revenue progress and payments */}
        <div className="content-grid">
          <div className="col-span-4 flex flex-col gap-4">
            <Card>
              <CardHeader>
                <h3 className="heading-3">Billing Allocation Breakdown</h3>
              </CardHeader>
              <div className="flex flex-col gap-3 text-sm">
                <div className="flex justify-between py-1 border-bottom" style={{ borderBottom: '1px solid var(--divider)' }}>
                  <span className="text-muted">Total Collections Collected</span>
                  <span className="font-semibold text-success">{formatCurrency(revenueSummary.totalCollected)}</span>
                </div>
                <div className="flex justify-between py-1 border-bottom" style={{ borderBottom: '1px solid var(--divider)' }}>
                  <span className="text-muted">Outstanding Owed</span>
                  <span className="font-semibold text-error">{formatCurrency(revenueSummary.totalOutstanding)}</span>
                </div>
                <div className="flex justify-between py-2 font-bold text-primary-color mt-3" style={{ borderTop: '2px solid var(--color-primary-100)' }}>
                  <span>Total Invoiced billing</span>
                  <span>{formatCurrency(revenueSummary.totalRevenue)}</span>
                </div>
              </div>
            </Card>
          </div>

          <div className="col-span-8 flex flex-col gap-4">
            <Card>
              <CardHeader action={
                <div className="flex items-center gap-3">
                  <Select
                    placeholder="All payment statuses"
                    options={statusOptions}
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="mb-0"
                    style={{ width: '180px', height: '36px' }}
                  />
                  <Button variant="outline" size="sm" icon={Download} onClick={handleExportFinance}>
                    Export CSV
                  </Button>
                </div>
              }>
                <div className="flex items-center gap-2">
                  <Receipt className="text-primary-color" />
                  <h3 className="heading-3">Student Accounts ledger ({filteredPayments.length} Records)</h3>
                </div>
              </CardHeader>

              <DataTable
                columns={columns}
                data={filteredPayments}
              />
            </Card>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
