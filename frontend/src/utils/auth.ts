interface RegisterData {
    name: string;
    email: string;
    password: string;
}

export const register = async (userData: RegisterData) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/auth/local/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: userData.name,
            email: userData.email,
            password: userData.password,
        }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error.message);
    }

    return response.json();
};

interface LoginData {
    email: string;
    password: string;
}

export const login = async (userData: LoginData) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/auth/local`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            identifier: userData.email,
            password: userData.password,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error?.message || 'Giriş başarısız');
    }

    return data;
}; 