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

interface SubmitMusicRequest {
  is_custom_mode: boolean
  gpt_description_prompt?: string
  mv: string
  make_instrumental: boolean
  prompt?: string
  tags?: string
  title?: string
}

interface SubmitMusicResponse {
  code: number
  data: string
  message: string
}

// 不需要认证的接口路径列表
const PUBLIC_APIS = [
  '/auth/login/',
  '/auth/register/',
  '/auth/send_code/',
  '/auth/reset_password/'
]

// 获取认证 token
function getAuthToken(): string {
  const token = sessionStorage.getItem('token')
  if (!token) {
    throw new Error('未登录，请先登录')
  }
  return token
}

// 保存 token
function saveToken(token: string, expiresIn: number): void {
  sessionStorage.setItem('token', token)
  // 设置过期时间
  sessionStorage.setItem('token_expires', (Date.now() + expiresIn * 1000).toString())
}

// 统一的请求拦截器
async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
  const isPublicApi = PUBLIC_APIS.some(api => url.endsWith(api))
  
  // 设置基础请求头
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers
  }

  // 如果不是公开接口，添加认证信息
  if (!isPublicApi) {
    try {
      // 检查 token 是否过期
      const expiresAt = sessionStorage.getItem('token_expires')
      if (expiresAt && Date.now() > parseInt(expiresAt)) {
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('token_expires')
        throw new Error('登录已过期，请重新登录')
      }
      headers['Authorization' as keyof HeadersInit] = `Bearer ${getAuthToken()}`
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
      throw new Error('认证失败')
    }
  }

  const response = await fetch(url, {
    ...options,
    headers
  })

  return response
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  try {
    const response = await fetchWithAuth(`${API_BASE_URL}/auth/login/`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })

    const data: ApiResponse<LoginResponse> = await response.json()

    if (data.code !== 1000) {
      throw new Error(data.message || '登录失败，请检查邮箱和密码')
    }

    // 保存 token 到 sessionStorage
    saveToken(data.data!.access_token, data.data!.expires_in)
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
    const response = await fetchWithAuth(`${API_BASE_URL}/auth/register/`, {
      method: 'POST',
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
    const response = await fetchWithAuth(`${API_BASE_URL}/auth/send_code/`, {
      method: 'POST',
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
    const response = await fetchWithAuth(`${API_BASE_URL}/auth/reset_password/`, {
      method: 'POST',
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

export async function submitMusic(requestData: SubmitMusicRequest): Promise<ApiResponse<SubmitMusicResponse>> {
  try {
    const response = await fetchWithAuth(`${API_BASE_URL}/music/submit/`, {
      method: 'POST',
      body: JSON.stringify(requestData),
    })
    const data: ApiResponse<SubmitMusicResponse> = await response.json()
    return data
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error('生成音乐失败，请稍后重试')
  }
}

export interface MusicListResponse {
  count: number
  next: string | null
  previous: string | null
  results: MusicItem[]
}

export interface MusicItem {
  clip_id: string
  task_id: string
  audio_url: string
  concat_history: string | null
  duration: number
  history: string | null
  image_large_url: string
  image_url: string
  prompt: string
  state: string
  status: string
  tags: string
  title: string
  video_url: string
  created_at: string
  updated_at: string
  description: string
  // is_deleted: boolean
  vocal_url: string | null
  drums_url: string | null
  bass_url: string | null
  piano_url: string | null
  other_url: string | null
  has_sheet: boolean
  sheet_url: string | null
  sheet_pdf_url: string | null
  sheet_success: boolean
  task_start_time: string | null
  task_finish_time: string | null
  // user: number
}

export async function getMusicList(): Promise<MusicListResponse> {
  const response = await fetchWithAuth(`${API_BASE_URL}/music/`, {
    method: 'GET',
  })
  const data: MusicListResponse = await response.json()
  return data
}


// 删除音乐的接口
export async function deleteMusic(clip_id: string): Promise<ApiResponse<null>> {
  const response = await fetchWithAuth(`${API_BASE_URL}/music/${clip_id}/`, {
    method: 'DELETE',
  })
  const data: ApiResponse<null> = await response.json()
  return data
}