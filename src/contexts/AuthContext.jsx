import { createContext, useContext, useReducer, useCallback } from 'react';

const AuthContext = createContext(null);

const DEMO_USERS = {
  student: {
    id: 'STU-001',
    matricNo: 'STU/2024/001',
    firstName: 'Adebayo',
    lastName: 'Oluwaseun',
    email: 'adebayo.oluwaseun@stu.havilla.edu',
    role: 'student',
    level: '300',
    department: 'Computer Science',
    faculty: 'Faculty of Computing & Information Technology',
    programme: 'B.Sc. Computer Science',
    avatar: null,
    session: '2024/2025',
    semester: 'First Semester',
    gpa: 4.33,
    cgpa: 4.15,
    totalCredits: 98,
    status: 'Active',
  },
  lecturer: {
    id: 'LEC-001',
    staffId: 'LEC/001',
    firstName: 'Dr. Nkechi',
    lastName: 'Okonkwo',
    email: 'n.okonkwo@havilla.edu',
    role: 'lecturer',
    title: 'Senior Lecturer',
    department: 'Computer Science',
    faculty: 'Faculty of Computing & Information Technology',
    avatar: null,
    phone: '+234 801 234 5678',
    coursesCount: 4,
    studentsCount: 186,
    status: 'Active',
  },
  admin: {
    id: 'ADM-001',
    staffId: 'ADM/001',
    firstName: 'Prof. Emeka',
    lastName: 'Adeyemi',
    email: 'admin@havilla.edu',
    role: 'admin',
    title: 'Registrar',
    department: 'Administration',
    avatar: null,
    permissions: ['all'],
    status: 'Active',
  }
};

const CREDENTIALS = {
  'STU/2024/001': { password: 'student123', role: 'student' },
  'LEC/001': { password: 'lecturer123', role: 'lecturer' },
  'admin@havilla.edu': { password: 'admin123', role: 'admin' },
};

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true, error: null };
    case 'LOGIN_SUCCESS':
      return { ...state, isLoading: false, user: action.payload, isAuthenticated: true, error: null };
    case 'LOGIN_ERROR':
      return { ...state, isLoading: false, error: action.payload };
    case 'LOGOUT':
      return { ...initialState };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState, () => {
    const saved = localStorage.getItem('havilla_auth');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...initialState, user: parsed, isAuthenticated: true };
      } catch { return initialState; }
    }
    return initialState;
  });

  const login = useCallback(async (username, password) => {
    dispatch({ type: 'LOGIN_START' });

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1200));

    const cred = CREDENTIALS[username];
    if (!cred || cred.password !== password) {
      dispatch({ type: 'LOGIN_ERROR', payload: 'Invalid credentials. Please try again.' });
      return false;
    }

    const user = DEMO_USERS[cred.role];
    localStorage.setItem('havilla_auth', JSON.stringify(user));
    dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    return true;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('havilla_auth');
    dispatch({ type: 'LOGOUT' });
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

export { DEMO_USERS };
export default AuthContext;
