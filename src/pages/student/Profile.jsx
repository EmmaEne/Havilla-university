import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Card, CardHeader, Button, Modal, Input, Badge } from '../../components/ui';
import { User, Edit, Phone, Mail, MapPin, School, FileText, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import { validateForm } from '../../utils/validators';

export default function Profile() {
  const { user } = useAuth();
  const { success, error } = useNotification();
  
  // Profile state
  const [profile, setProfile] = useState(user);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  // Form edit fields
  const [phone, setPhone] = useState(profile.phone);
  const [email, setEmail] = useState(profile.email);
  const [address, setAddress] = useState(profile.address);
  const [parentName, setParentName] = useState(profile.parentName);
  const [parentPhone, setParentPhone] = useState(profile.parentPhone);
  const [formErrors, setFormErrors] = useState({});

  const handleEditSubmit = (e) => {
    e.preventDefault();

    const rules = {
      phone: [{ required: true, message: 'Phone is required' }, { phone: true, value: phone, message: 'Must be a valid phone' }],
      email: [{ required: true, message: 'Email is required' }, { email: true, value: email, message: 'Must be a valid email' }],
      address: [{ required: true, value: address, message: 'Address is required' }],
      parentPhone: [{ required: true, message: 'Parent phone is required' }, { phone: true, value: parentPhone, message: 'Must be a valid phone' }],
    };

    const { isValid, errors } = validateForm(rules);
    if (!isValid) {
      setFormErrors(errors);
      error('Please correct the validation errors in the form.');
      return;
    }

    setFormErrors({});
    const updated = {
      ...profile,
      phone,
      email,
      address,
      parentName,
      parentPhone,
    };
    setProfile(updated);
    // Persist to simulated auth storage
    localStorage.setItem('havilla_auth', JSON.stringify(updated));
    
    setIsEditModalOpen(false);
    success('Profile updated successfully!');
  };

  const mockDocs = [
    { name: 'Admission Letter.pdf', type: 'Official', date: '2022-09-10', verified: true },
    { name: 'WAEC O-Level Results.pdf', type: 'Academic', date: '2022-09-12', verified: true },
    { name: 'First Semester Course Form.pdf', type: 'Registration', date: '2024-09-22', verified: true },
    { name: 'Proof of Origin Certificate.pdf', type: 'Personal', date: '2022-09-12', verified: false },
  ];

  return (
    <DashboardLayout title="My Student Profile">
      <div className="flex flex-col gap-6">

        {/* Profile Card Header */}
        <Card className="flex flex-col md:flex-row items-center gap-6 p-6">
          <div className="avatar-placeholder flex-shrink-0" style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-primary-50)',
            border: '3px solid var(--color-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-primary)',
            fontSize: '2.5rem',
            fontWeight: 'bold',
            overflow: 'hidden'
          }}>
            {/* Simulation of student passport photo */}
            <User size={60} />
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 flex-wrap mb-1">
              <h2 className="heading-2">{profile.firstName} {profile.lastName}</h2>
              <Badge variant="primary" size="sm">{profile.status}</Badge>
            </div>
            <p className="text-muted text-sm mb-2">{profile.matricNo} | Level {profile.level} | {profile.programme}</p>
            <div className="flex justify-center md:justify-start gap-4 flex-wrap text-xs text-secondary">
              <span className="flex items-center gap-1"><School size={14} /> {profile.department}</span>
              <span className="flex items-center gap-1"><MapPin size={14} /> {profile.stateOfOrigin} State, Nigeria</span>
            </div>
          </div>

          <Button variant="outline" size="sm" icon={Edit} onClick={() => setIsEditModalOpen(true)}>
            Edit Contacts
          </Button>
        </Card>

        <div className="content-grid">
          {/* Detailed Info Column */}
          <div className="col-span-8 flex flex-col gap-6">
            <Card>
              <CardHeader>
                <h3 className="heading-3">Academic & Personal Particulars</h3>
              </CardHeader>
              <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-4)' }}>
                <div>
                  <span className="text-overline block">Faculty</span>
                  <span className="font-semibold text-sm">{profile.faculty}</span>
                </div>
                <div>
                  <span className="text-overline block">Department</span>
                  <span className="font-semibold text-sm">{profile.department}</span>
                </div>
                <div>
                  <span className="text-overline block">Matriculation Number</span>
                  <span className="font-semibold text-sm">{profile.matricNo}</span>
                </div>
                <div>
                  <span className="text-overline block">Academic Session</span>
                  <span className="font-semibold text-sm">{profile.session}</span>
                </div>
                <div>
                  <span className="text-overline block">Date of Birth</span>
                  <span className="font-semibold text-sm">{profile.dateOfBirth}</span>
                </div>
                <div>
                  <span className="text-overline block">Gender</span>
                  <span className="font-semibold text-sm">{profile.gender}</span>
                </div>
                <div>
                  <span className="text-overline block">Home Address</span>
                  <span className="font-semibold text-sm">{profile.address}</span>
                </div>
              </div>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="heading-3">Parent / Guardian Particulars</h3>
              </CardHeader>
              <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-4)' }}>
                <div>
                  <span className="text-overline block">Guardian Name</span>
                  <span className="font-semibold text-sm">{profile.parentName}</span>
                </div>
                <div>
                  <span className="text-overline block">Contact Phone</span>
                  <span className="font-semibold text-sm">{profile.parentPhone}</span>
                </div>
                <div>
                  <span className="text-overline block">Email Address</span>
                  <span className="font-semibold text-sm">{profile.parentEmail}</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Uploaded Documents Column */}
          <div className="col-span-4 flex flex-col gap-6">
            <Card>
              <CardHeader>
                <h3 className="heading-3">Uploaded Documents</h3>
              </CardHeader>
              <div className="flex flex-col gap-3">
                {mockDocs.map((doc, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3 rounded" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                    <div className="flex gap-2 items-center">
                      <FileText size={18} className="text-muted" />
                      <div className="flex flex-col">
                        <span className="font-semibold text-xs truncate" style={{ maxWidth: '140px' }}>{doc.name}</span>
                        <span className="text-muted" style={{ fontSize: '9px' }}>{doc.type} • {doc.date}</span>
                      </div>
                    </div>
                    {doc.verified ? (
                      <Badge variant="success" size="sm" dot>Verified</Badge>
                    ) : (
                      <Badge variant="warning" size="sm" dot>Pending</Badge>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Edit Profile Modal */}
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Update Contacts Details"
        >
          <form onSubmit={handleEditSubmit} className="flex flex-col gap-4">
            <Input
              label="Phone Number"
              placeholder="+234..."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              error={formErrors.phone}
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="name@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={formErrors.email}
            />

            <Input
              label="Address"
              placeholder="Residential Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              error={formErrors.address}
            />

            <Input
              label="Guardian Name"
              placeholder="Guardian Full Name"
              value={parentName}
              onChange={(e) => setParentName(e.target.value)}
            />

            <Input
              label="Guardian Phone"
              placeholder="+234..."
              value={parentPhone}
              onChange={(e) => setParentPhone(e.target.value)}
              error={formErrors.parentPhone}
            />

            <div className="flex justify-end gap-3 mt-4">
              <Button type="button" variant="ghost" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Save Updates
              </Button>
            </div>
          </form>
        </Modal>

      </div>
    </DashboardLayout>
  );
}
