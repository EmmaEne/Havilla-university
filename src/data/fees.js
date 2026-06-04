export const feeStructure = {
  tuition: 350000,
  laboratory: 25000,
  library: 15000,
  ict: 20000,
  sportsDev: 10000,
  medicalFee: 12000,
  examinationFee: 15000,
  studentUnion: 5000,
  departmentalFee: 18000,
  registrationFee: 10000,
  total: 480000,
};

export const feePayments = [
  { id: 'PAY-001', studentId: 'STU-001', session: '2024/2025', semester: 'First Semester', amount: 480000, amountPaid: 480000, balance: 0, status: 'Paid', method: 'Bank Transfer', reference: 'HVL-2024-00001', date: '2024-09-20T10:30:00', receiptNo: 'RCP-2024-001' },
  { id: 'PAY-002', studentId: 'STU-001', session: '2023/2024', semester: 'Second Semester', amount: 480000, amountPaid: 480000, balance: 0, status: 'Paid', method: 'Online Payment', reference: 'HVL-2024-00045', date: '2024-02-15T14:22:00', receiptNo: 'RCP-2024-045' },
  { id: 'PAY-003', studentId: 'STU-001', session: '2023/2024', semester: 'First Semester', amount: 450000, amountPaid: 450000, balance: 0, status: 'Paid', method: 'Bank Transfer', reference: 'HVL-2023-00089', date: '2023-09-18T09:15:00', receiptNo: 'RCP-2023-089' },
  { id: 'PAY-004', studentId: 'STU-001', session: '2022/2023', semester: 'Second Semester', amount: 450000, amountPaid: 450000, balance: 0, status: 'Paid', method: 'Bank Transfer', reference: 'HVL-2023-00002', date: '2023-02-10T11:45:00', receiptNo: 'RCP-2023-002' },
  { id: 'PAY-005', studentId: 'STU-001', session: '2022/2023', semester: 'First Semester', amount: 420000, amountPaid: 420000, balance: 0, status: 'Paid', method: 'Cash', reference: 'HVL-2022-00156', date: '2022-09-22T08:30:00', receiptNo: 'RCP-2022-156' },

  // Other students' payments for admin view
  { id: 'PAY-006', studentId: 'STU-002', session: '2024/2025', semester: 'First Semester', amount: 480000, amountPaid: 240000, balance: 240000, status: 'Partial', method: 'Bank Transfer', reference: 'HVL-2024-00012', date: '2024-09-25T13:10:00', receiptNo: 'RCP-2024-012' },
  { id: 'PAY-007', studentId: 'STU-003', session: '2024/2025', semester: 'First Semester', amount: 480000, amountPaid: 0, balance: 480000, status: 'Unpaid', method: null, reference: null, date: null, receiptNo: null },
  { id: 'PAY-008', studentId: 'STU-004', session: '2024/2025', semester: 'First Semester', amount: 480000, amountPaid: 480000, balance: 0, status: 'Paid', method: 'Online Payment', reference: 'HVL-2024-00034', date: '2024-09-21T16:50:00', receiptNo: 'RCP-2024-034' },
  { id: 'PAY-009', studentId: 'STU-005', session: '2024/2025', semester: 'First Semester', amount: 480000, amountPaid: 480000, balance: 0, status: 'Paid', method: 'Bank Transfer', reference: 'HVL-2024-00056', date: '2024-10-01T10:05:00', receiptNo: 'RCP-2024-056' },
  { id: 'PAY-010', studentId: 'STU-006', session: '2024/2025', semester: 'First Semester', amount: 480000, amountPaid: 350000, balance: 130000, status: 'Partial', method: 'Bank Transfer', reference: 'HVL-2024-00078', date: '2024-09-28T15:30:00', receiptNo: 'RCP-2024-078' },
  { id: 'PAY-011', studentId: 'STU-007', session: '2024/2025', semester: 'First Semester', amount: 480000, amountPaid: 0, balance: 480000, status: 'Unpaid', method: null, reference: null, date: null, receiptNo: null },
  { id: 'PAY-012', studentId: 'STU-008', session: '2024/2025', semester: 'First Semester', amount: 480000, amountPaid: 480000, balance: 0, status: 'Paid', method: 'Online Payment', reference: 'HVL-2024-00091', date: '2024-09-19T09:20:00', receiptNo: 'RCP-2024-091' },
];

// Revenue data for charts
export const revenueData = [
  { month: 'Jan', revenue: 18500000 },
  { month: 'Feb', revenue: 22400000 },
  { month: 'Mar', revenue: 8200000 },
  { month: 'Apr', revenue: 5600000 },
  { month: 'May', revenue: 3200000 },
  { month: 'Jun', revenue: 2800000 },
  { month: 'Jul', revenue: 1500000 },
  { month: 'Aug', revenue: 4200000 },
  { month: 'Sep', revenue: 45600000 },
  { month: 'Oct', revenue: 28900000 },
  { month: 'Nov', revenue: 12300000 },
  { month: 'Dec', revenue: 6800000 },
];

export const revenueSummary = {
  totalRevenue: 160000000,
  totalCollected: 142500000,
  totalOutstanding: 17500000,
  collectionRate: 89.1,
  studentsFullyPaid: 1250,
  studentsPartiallyPaid: 180,
  studentsUnpaid: 320,
};

export default feePayments;
