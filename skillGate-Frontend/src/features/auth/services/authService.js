import apiClient from '@/shared/services/apiClient.js';

const COLLECTION = 'sg_users';

const authService = {
  register: ({ name, email, password }) => {
    const normalizedEmail = email.toLowerCase();
    const existingUser = apiClient.getOne(COLLECTION, u => u.email === normalizedEmail);

    if (existingUser) {
      if (existingUser.role === null) {
        return { status: 'pending_role', user: existingUser };
      } else {
        return { 
          status: 'exists', 
          error: 'An account with this email already exists.' 
        };
      }
    }

    const newUser = {
      id: crypto.randomUUID(),
      name,
      email: normalizedEmail,
      password, 
      role: null,
      recruiterStatus: 'none',
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
    };

    apiClient.save(COLLECTION, newUser);
    return { status: 'success', user: newUser };
  },

  assignRole: (email, role) => {
    const updatedUser = apiClient.update(
      COLLECTION,
      u => u.email === email,
      u => ({ ...u, role })
    );

    if (updatedUser) {
      apiClient.setSession(updatedUser);
      return { status: 'success', user: updatedUser };
    }

    return { status: 'error', error: 'User not found.' };
  },

  login: ({ email, password }) => {
    const normalizedEmail = email.toLowerCase();
    const user = apiClient.getOne(COLLECTION, u => u.email === normalizedEmail);

    if (!user) {
      return { 
        status: 'not_found', 
        error: 'No account found with this email.' 
      };
    }

    if (user.password !== password) {
      return { 
        status: 'wrong_password', 
        error: 'Incorrect password. Please try again.' 
      };
    }

    if (user.role === null) {
      return { status: 'pending_role', user };
    }

    const updatedUser = apiClient.update(
      COLLECTION,
      u => u.email === normalizedEmail,
      u => ({ ...u, lastLoginAt: new Date().toISOString() })
    );

    apiClient.setSession(updatedUser || user);
    return { status: 'success', user: updatedUser || user };
  },

  logout: () => {
    apiClient.clearSession();
    return { status: 'success' };
  },

  getCurrentUser: () => {
    return apiClient.getSession();
  },

  sendVerificationEmail: (email) => {
    console.log('TODO: send verification email');
    return { status: 'not_implemented' };
  },

  verifyEmail: (token) => {
    console.log('TODO: verify email token');
    return { status: 'not_implemented' };
  },

  resetPassword: (email) => {
    console.log('TODO: reset password');
    return { status: 'not_implemented' };
  },

  loginWithGoogle: () => {
    console.log('TODO: Google OAuth');
    return { status: 'not_implemented' };
  },

  requestRecruiterAccess: (companyData) => {
    console.log('TODO: recruiter verification');
    return { status: 'not_implemented' };
  }
};

export default authService;
