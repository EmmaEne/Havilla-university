const firstNames = ['Adebayo', 'Chioma', 'Emeka', 'Fatima', 'Grace', 'Hassan', 'Ifeoma', 'Jamal', 'Kemi', 'Ladi', 'Musa', 'Ngozi', 'Obinna', 'Precious', 'Rasheed', 'Sade', 'Tunde', 'Uche', 'Victoria', 'Wale', 'Yusuf', 'Zainab', 'Adaobi', 'Bola', 'Chidi', 'Damilola', 'Ese', 'Folake', 'Godwin', 'Hadiza', 'Ikenna', 'Jumoke', 'Kunle', 'Lilian', 'Mohammed', 'Nnamdi', 'Oluwaseun', 'Patience', 'Quadri', 'Ronke', 'Seyi', 'Temitope', 'Umar', 'Vivian', 'Wasiu', 'Xander', 'Yetunde', 'Zara', 'Aisha', 'Bayo'];
const lastNames = ['Okonkwo', 'Adeyemi', 'Ibrahim', 'Okafor', 'Balogun', 'Yusuf', 'Eze', 'Abdullahi', 'Nwosu', 'Mohammed', 'Akinola', 'Okoro', 'Adewale', 'Garba', 'Alabi', 'Achebe', 'Osinbajo', 'Musa', 'Nwosu', 'Ogundipe', 'Ekwueme', 'Adeola', 'Chukwuma', 'Babangida', 'Igwe', 'Fashola', 'Obasanjo', 'Dikko', 'Amaechi', 'Soludo', 'Wike', 'Amadi', 'Okechukwu', 'Adeleke', 'Sanusi', 'Obi', 'Tinubu', 'Umahi', 'Fayemi', 'Oyetola', 'Abubakar', 'Dangote', 'Oshiomhole', 'Uba', 'Orji', 'Ibe', 'Kalu', 'Danjuma', 'Atiku', 'Saraki'];
const depts = ['DEP-001', 'DEP-002', 'DEP-003', 'DEP-005', 'DEP-006', 'DEP-009', 'DEP-010', 'DEP-013', 'DEP-014', 'DEP-016', 'DEP-017'];
const deptNames = { 'DEP-001': 'Computer Science', 'DEP-002': 'Information Technology', 'DEP-003': 'Cyber Security', 'DEP-005': 'Electrical Engineering', 'DEP-006': 'Mechanical Engineering', 'DEP-009': 'Mathematics', 'DEP-010': 'Physics', 'DEP-013': 'English Language', 'DEP-014': 'Economics', 'DEP-016': 'Business Administration', 'DEP-017': 'Accounting' };
const facNames = { 'DEP-001': 'Faculty of Computing & Information Technology', 'DEP-002': 'Faculty of Computing & Information Technology', 'DEP-003': 'Faculty of Computing & Information Technology', 'DEP-005': 'Faculty of Engineering & Technology', 'DEP-006': 'Faculty of Engineering & Technology', 'DEP-009': 'Faculty of Sciences', 'DEP-010': 'Faculty of Sciences', 'DEP-013': 'Faculty of Arts & Social Sciences', 'DEP-014': 'Faculty of Arts & Social Sciences', 'DEP-016': 'Faculty of Management Sciences', 'DEP-017': 'Faculty of Management Sciences' };
const levels = ['100', '200', '300', '400'];
const statuses = ['Active', 'Active', 'Active', 'Active', 'Active', 'Active', 'Active', 'Active', 'Graduated', 'Suspended'];
const states = ['Lagos', 'Abuja', 'Rivers', 'Kano', 'Oyo', 'Enugu', 'Delta', 'Kaduna', 'Anambra', 'Ogun', 'Edo', 'Imo', 'Benue', 'Kwara', 'Osun'];
const genders = ['Male', 'Female'];

function randomPick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function randomBetween(min, max) { return Math.round((Math.random() * (max - min) + min) * 100) / 100; }

export const students = Array.from({ length: 50 }, (_, i) => {
  const fn = firstNames[i % firstNames.length];
  const ln = lastNames[i % lastNames.length];
  const deptId = depts[i % depts.length];
  const level = levels[i % levels.length];
  const year = 2024 - (parseInt(level) / 100 - 1);
  const gender = genders[i % 2];

  return {
    id: `STU-${String(i + 1).padStart(3, '0')}`,
    matricNo: `STU/${year}/${String(i + 1).padStart(3, '0')}`,
    firstName: fn,
    lastName: ln,
    email: `${fn.toLowerCase()}.${ln.toLowerCase()}@stu.havilla.edu`,
    phone: `+234 80${Math.floor(Math.random() * 10)} ${Math.floor(1000000 + Math.random() * 9000000)}`,
    gender,
    dateOfBirth: `${1998 + (i % 6)}-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
    stateOfOrigin: randomPick(states),
    address: `${Math.floor(1 + Math.random() * 200)} ${randomPick(['Ademola', 'Herbert', 'Awolowo', 'Nnamdi', 'Bello'])} Street, ${randomPick(states)}`,
    departmentId: deptId,
    department: deptNames[deptId],
    faculty: facNames[deptId],
    level,
    programme: `B.Sc. ${deptNames[deptId]}`,
    session: '2024/2025',
    semester: 'First Semester',
    gpa: randomBetween(1.5, 5.0),
    cgpa: randomBetween(1.8, 4.8),
    totalCredits: parseInt(level) === 100 ? 24 : parseInt(level) === 200 ? 52 : parseInt(level) === 300 ? 82 : 120,
    status: statuses[i % statuses.length],
    admissionDate: `${year}-09-15`,
    expectedGraduation: `${year + 4}-07-15`,
    parentName: `Mr./Mrs. ${ln}`,
    parentPhone: `+234 70${Math.floor(Math.random() * 10)} ${Math.floor(1000000 + Math.random() * 9000000)}`,
    parentEmail: `parent.${ln.toLowerCase()}@email.com`,
    role: 'student',
    avatar: null,
  };
});

// Override first student to match auth user
students[0] = {
  ...students[0],
  firstName: 'Adebayo',
  lastName: 'Oluwaseun',
  email: 'adebayo.oluwaseun@stu.havilla.edu',
  gender: 'Male',
  dateOfBirth: '2001-03-15',
  stateOfOrigin: 'Lagos',
  departmentId: 'DEP-001',
  department: 'Computer Science',
  faculty: 'Faculty of Computing & Information Technology',
  level: '300',
  programme: 'B.Sc. Computer Science',
  gpa: 4.33,
  cgpa: 4.15,
  totalCredits: 98,
  status: 'Active',
  matricNo: 'STU/2024/001',
  admissionDate: '2022-09-15',
  expectedGraduation: '2026-07-15',
  parentName: 'Mr. Oluwaseun Adebayo',
  parentPhone: '+234 803 456 7890',
  parentEmail: 'oluwaseun.adebayo@email.com',
  address: '45 Victoria Island, Lagos',
};

export default students;
