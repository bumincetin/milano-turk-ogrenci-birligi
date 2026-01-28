// Static mode authentication utilities

interface RegisterData {
    name: string;
    email: string;
    password: string;
}

interface LoginData {
    email: string;
    password: string;
}

// Demo user response
const DEMO_RESPONSE = {
    jwt: 'static-demo-token',
    user: {
        id: 1,
        username: 'demo_user',
        email: 'demo@mtob.org',
        name: 'Demo',
        lastname: 'Kullanıcı'
    }
};

export const register = async (userData: RegisterData) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log('Static mode: Registration simulated for', userData.email);
    
    // Return success with demo user
    return DEMO_RESPONSE;
};

export const login = async (userData: LoginData) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log('Static mode: Login simulated for', userData.email);
    
    // Return success with demo user
    return DEMO_RESPONSE;
};
