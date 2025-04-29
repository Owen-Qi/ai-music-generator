import { API_BASE_URL } from '@/config'

interface ApiResponse<T> {
  code: number
  message: string
  data: T | null
}

interface LoginResponse {
  access_token: string
  expires_in: number
}

interface RegisterResponse {
  user_id: number
  email: string
}

interface ApiError {
  message: string
  code?: string
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    const data: ApiResponse<LoginResponse> = await response.json()

    if (data.code !== 1000) {
      throw new Error(data.message || '登录失败，请检查邮箱和密码')
    }

    return data.data!
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error('登录失败，请稍后重试')
  }
}

export async function register(email: string, password: string, username: string, code: string): Promise<RegisterResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, username, code }),
    })

    const data: ApiResponse<RegisterResponse> = await response.json()

    if (data.code !== 1000) {
      throw new Error(data.message || '注册失败')
    }

    return data.data!
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error('注册失败，请稍后重试')
  }
}

export async function sendVerificationCode(email: string, type: 'register' | 'reset_password'): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/send_code/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, type }),
    })

    const data: ApiResponse<null> = await response.json()

    if (data.code !== 1000) {
      throw new Error(data.message || '发送验证码失败')
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error('发送验证码失败，请稍后重试')
  }
}

export async function resetPassword(email: string, newPassword: string, code: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/reset_password/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, new_password: newPassword, code }),
    })

    const data: ApiResponse<null> = await response.json()

    if (data.code !== 1000) {
      throw new Error(data.message || '重置密码失败')
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error('重置密码失败，请稍后重试')
  }
} 