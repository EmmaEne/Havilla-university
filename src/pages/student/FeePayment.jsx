import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Card, CardHeader, Badge, Button, DataTable, Modal, Input } from '../../components/ui';
import { CreditCard, CheckCircle2, Receipt, Download, ShieldCheck, AlertCircle } from 'lucide-react';
import { feeStructure, feePayments } from '../../data/fees';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { useNotification } from '../../contexts/NotificationContext';
import { printElement } from '../../utils/exportUtils';

export default function FeePayment() {
  const [payments, setPayments] = useState(feePayments.filter(p => p.studentId === 'STU-001'));
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  
  // Form State
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [isPaying, setIsPaying] = useState(false);

  const { success, error } = useNotification();

  // Calculate outstanding balance
  // Since our student (STU-001) has paid all fees for current/past semesters in our mock, let's allow them to pay for Next Semester (First Semester 2025/2026) as a simulation.
  const unpaidFee = {
    session: '2025/2026',
    semester: 'First Semester',
    amount: feeStructure.total,
  };

  const handlePaySimulate = (e) => {
    e.preventDefault();
    if (!cardNumber || !expiry || !cvv) {
      error('Please fill in all credit card details.');
      return;
    }
    
    setIsPaying(true);
    setTimeout(() => {
      const newPay = {
        id: `PAY-${Date.now().toString().slice(-3)}`,
        studentId: 'STU-001',
        session: unpaidFee.session,
        semester: unpaidFee.semester,
        amount: unpaidFee.amount,
        amountPaid: unpaidFee.amount,
        balance: 0,
        status: 'Paid',
        method: 'Online Payment',
        reference: `HVL-2025-${Math.floor(10000 + Math.random() * 90000)}`,
        date: new Date().toISOString(),
        receiptNo: `RCP-2025-${Math.floor(100 + Math.random() * 900)}`
      };

      setPayments([newPay, ...payments]);
      setIsPaying(false);
      setIsPayModalOpen(false);
      
      // Reset form
      setCardNumber('');
      setExpiry('');
      setCvv('');

      success(`Successfully paid ${formatCurrency(unpaidFee.amount)} for ${unpaidFee.semester} ${unpaidFee.session}!`);
    }, 2000);
  };

  const handleOpenReceipt = (pay) => {
    setSelectedReceipt(pay);
    setIsReceiptModalOpen(true);
  };

  const printReceipt = () => {
    printElement('printable-receipt', `Fee Receipt — ${selectedReceipt.receiptNo}`);
  };

  const paymentColumns = [
    { key: 'receiptNo', label: 'Receipt No', width: '120px', render: (val) => val ? <span className="font-semibold">{val}</span> : '—' },
    { key: 'session', label: 'Academic Session' },
    { key: 'semester', label: 'Semester' },
    { key: 'amountPaid', label: 'Amount Paid', render: (val) => formatCurrency(val) },
    { key: 'date', label: 'Payment Date', render: (val) => formatDate(val) },
    { key: 'status', label: 'Status', render: (val) => (
      <Badge variant={val === 'Paid' ? 'success' : 'warning'}>{val}</Badge>
    )},
    { key: 'actions', label: '', width: '100px', render: (_, row) => row.receiptNo && (
      <Button variant="ghost" size="sm" icon={Receipt} onClick={() => handleOpenReceipt(row)}>
        Receipt
      </Button>
    )},
  ];

  return (
    <DashboardLayout title="Bursary & Fee Payments">
      <div className="flex flex-col gap-6">

        {/* Financial Balances Board */}
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-6)' }}>
          <Card className="flex flex-col gap-2 border-success" style={{ borderLeft: '4px solid var(--color-success)' }}>
            <span className="text-overline">Outstanding Balance (Current Session)</span>
            <h2 className="heading-1" style={{ fontSize: '2.5rem', color: 'var(--color-success-dark)' }}>
              {formatCurrency(0)}
            </h2>
            <span className="text-xs text-muted">All current fees are fully settled.</span>
          </Card>

          <Card className="flex flex-col gap-2 border-warning" style={{ borderLeft: '4px solid var(--color-warning)' }}>
            <span className="text-overline">Next Academic Session (Preview)</span>
            <h2 className="heading-1" style={{ fontSize: '2.5rem', color: 'var(--color-warning-dark)' }}>
              {formatCurrency(unpaidFee.amount)}
            </h2>
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-muted">{unpaidFee.semester} ({unpaidFee.session})</span>
              <Button variant="accent" size="sm" icon={CreditCard} onClick={() => setIsPayModalOpen(true)}>
                Pre-pay Now
              </Button>
            </div>
          </Card>
        </div>

        <div className="content-grid">
          {/* Fee Breakdown Structure */}
          <div className="col-span-4 flex flex-col gap-6">
            <Card>
              <CardHeader>
                <h3 className="heading-3">Session Fee Breakdown</h3>
              </CardHeader>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between text-sm py-1 border-bottom" style={{ borderBottom: '1px solid var(--divider)' }}>
                  <span className="text-muted">Tuition Fee</span>
                  <span className="font-semibold">{formatCurrency(feeStructure.tuition)}</span>
                </div>
                <div className="flex justify-between text-sm py-1 border-bottom" style={{ borderBottom: '1px solid var(--divider)' }}>
                  <span className="text-muted">Laboratory Fee</span>
                  <span className="font-semibold">{formatCurrency(feeStructure.laboratory)}</span>
                </div>
                <div className="flex justify-between text-sm py-1 border-bottom" style={{ borderBottom: '1px solid var(--divider)' }}>
                  <span className="text-muted">ICT Levy</span>
                  <span className="font-semibold">{formatCurrency(feeStructure.ict)}</span>
                </div>
                <div className="flex justify-between text-sm py-1 border-bottom" style={{ borderBottom: '1px solid var(--divider)' }}>
                  <span className="text-muted">Library Levy</span>
                  <span className="font-semibold">{formatCurrency(feeStructure.library)}</span>
                </div>
                <div className="flex justify-between text-sm py-1 border-bottom" style={{ borderBottom: '1px solid var(--divider)' }}>
                  <span className="text-muted">Medical Fee</span>
                  <span className="font-semibold">{formatCurrency(feeStructure.medicalFee)}</span>
                </div>
                <div className="flex justify-between text-sm py-1 border-bottom" style={{ borderBottom: '1px solid var(--divider)' }}>
                  <span className="text-muted">Departmental/Sports Levy</span>
                  <span className="font-semibold">{formatCurrency(feeStructure.sportsDev + feeStructure.departmentalFee)}</span>
                </div>
                <div className="flex justify-between text-base font-bold py-2 text-primary-color mt-2" style={{ borderTop: '2px solid var(--color-primary-100)' }}>
                  <span>Total Amount</span>
                  <span>{formatCurrency(feeStructure.total)}</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Payment History */}
          <div className="col-span-8 flex flex-col gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Receipt className="text-primary-color" />
                  <h3 className="heading-3">Payment Receipts Ledger</h3>
                </div>
              </CardHeader>
              <DataTable
                columns={paymentColumns}
                data={payments}
              />
            </Card>
          </div>
        </div>

        {/* Pay simulation Modal */}
        <Modal
          isOpen={isPayModalOpen}
          onClose={() => setIsPayModalOpen(false)}
          title={`Pay Session Fees — ${unpaidFee.session}`}
        >
          <form onSubmit={handlePaySimulate} className="flex flex-col gap-4">
            <div className="p-3 rounded flex items-center gap-2 mb-2" style={{ backgroundColor: 'var(--bg-tertiary)', borderLeft: '3px solid var(--color-accent)' }}>
              <AlertCircle size={18} className="text-accent-color" />
              <span className="text-xs font-semibold">Paying: {formatCurrency(unpaidFee.amount)} for {unpaidFee.semester}</span>
            </div>

            <Input
              label="Cardholder Name"
              placeholder="Adebayo Oluwaseun"
              required
              disabled={isPaying}
            />

            <Input
              label="Card Number"
              placeholder="4000 1234 5678 9010"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim())}
              maxLength={19}
              required
              disabled={isPaying}
            />

            <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              <Input
                label="Expiration Date"
                placeholder="MM/YY"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                maxLength={5}
                required
                disabled={isPaying}
              />
              <Input
                label="CVV"
                placeholder="123"
                type="password"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                maxLength={3}
                required
                disabled={isPaying}
              />
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-muted mt-2">
              <ShieldCheck size={16} className="text-success" />
              <span>Secure 256-bit SSL encrypted payment simulation</span>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <Button type="button" variant="ghost" onClick={() => setIsPayModalOpen(false)} disabled={isPaying}>
                Cancel
              </Button>
              <Button type="submit" variant="accent" loading={isPaying}>
                Pay {formatCurrency(unpaidFee.amount)}
              </Button>
            </div>
          </form>
        </Modal>

        {/* View Receipt Modal */}
        <Modal
          isOpen={isReceiptModalOpen}
          onClose={() => setIsReceiptModalOpen(false)}
          title="Official Fee Receipt"
          footer={
            <div className="flex gap-2">
              <Button variant="outline" size="sm" icon={Download} onClick={printReceipt}>
                Print Receipt
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setIsReceiptModalOpen(false)}>
                Close
              </Button>
            </div>
          }
        >
          {selectedReceipt && (
            <div id="printable-receipt" className="p-4" style={{ fontFamily: 'var(--font-family)' }}>
              <div className="flex justify-between items-start mb-6" style={{ borderBottom: '2px solid var(--color-primary-100)', paddingBottom: '16px' }}>
                <div>
                  <h3 className="font-bold text-lg text-primary-color">HAVILLA UNIVERSITY</h3>
                  <p className="text-xs text-muted">Official Payment Confirmation Receipt</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-muted">Receipt No:</span>
                  <p className="font-bold text-sm text-primary-color">{selectedReceipt.receiptNo}</p>
                </div>
              </div>

              <div className="grid mb-6" style={{ gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', fontSize: '0.8125rem' }}>
                <div>
                  <span className="text-muted block">Student Details</span>
                  <p className="font-semibold">Adebayo Oluwaseun</p>
                  <p className="text-xs text-secondary">Matric: STU/2024/001</p>
                  <p className="text-xs text-secondary">CSC Department | Level 300</p>
                </div>
                <div className="text-right">
                  <span className="text-muted block">Payment Details</span>
                  <p className="font-semibold">Session: {selectedReceipt.session}</p>
                  <p className="text-xs text-secondary">Semester: {selectedReceipt.semester}</p>
                  <p className="text-xs text-secondary">Ref: {selectedReceipt.reference}</p>
                  <p className="text-xs text-secondary">Date: {formatDate(selectedReceipt.date)}</p>
                </div>
              </div>

              <table style={{ width: '100%', fontSize: '0.8125rem', marginBottom: '24px' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-tertiary)' }}>
                    <th style={{ padding: '8px', borderBottom: '1px solid var(--border-color)' }}>Description</th>
                    <th style={{ padding: '8px', borderBottom: '1px solid var(--border-color)', textAlign: 'right' }}>Paid Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: '8px', borderBottom: '1px solid var(--border-color)' }}>University Tuition & Compulsory Levies</td>
                    <td style={{ padding: '8px', borderBottom: '1px solid var(--border-color)', textAlign: 'right', fontWeight: 600 }}>
                      {formatCurrency(selectedReceipt.amountPaid)}
                    </td>
                  </tr>
                  <tr style={{ fontWeight: 'bold', fontSize: '0.875rem' }}>
                    <td style={{ padding: '8px', paddingTop: '16px' }}>Total Settled</td>
                    <td style={{ padding: '8px', paddingTop: '16px', textAlign: 'right', color: 'var(--color-success-dark)' }}>
                      {formatCurrency(selectedReceipt.amountPaid)}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="flex flex-col items-center justify-center text-center mt-6 p-4 rounded" style={{ backgroundColor: 'var(--color-primary-50)' }}>
                <CheckCircle2 className="text-success mb-1" size={24} />
                <span className="font-bold text-xs text-primary-color">PAYMENT STATUS: COMPLETED & RECORDED</span>
                <span className="text-muted" style={{ fontSize: '10px' }}>This is a computer-generated confirmation. No physical signature required.</span>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </DashboardLayout>
  );
}
