"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { register, sendVerificationCode } from "@/lib/api"
import { toast } from "sonner"

export default function RegisterForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [verificationCode, setVerificationCode] = useState("")
  const [isCodeSent, setIsCodeSent] = useState(false)
  const [countdown, setCountdown] = useState(0)

  const handleSendCode = async (email: string) => {
    try {
      await sendVerificationCode(email, "register")
      setIsCodeSent(true)
      setCountdown(60)
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)
      toast.success("验证码已发送")
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("发送验证码失败，请稍后重试")
      }
    }
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(event.currentTarget)
    const email = formData.get("email") as string
    const username = email
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirm-password") as string
    const code = formData.get("code") as string

    if (password !== confirmPassword) {
      setError("两次输入的密码不一致")
      toast.error("两次输入的密码不一致")
      setIsLoading(false)
      return
    }

    try {
      await register(email, password, username, code)
      toast.success("注册成功，请登录")
      router.push("/login")
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
        toast.error(error.message)
      } else {
        setError("注册失败，请稍后重试")
        toast.error("注册失败，请稍后重试")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={onSubmit} className="space-y-4">
        {error && (
          <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
            {error}
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="email">邮箱</Label>
          <div className="flex gap-2">
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="请输入邮箱"
              required
              disabled={isLoading}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="code">验证码</Label>
          <div className="flex gap-2">
            <Input
              id="code"
              name="code"
              type="text"
              placeholder="请输入验证码"
              required
              disabled={isLoading}
              />
              <Button
                type="button"
                variant="outline"
                disabled={isLoading || countdown > 0}
                onClick={() => handleSendCode((document.getElementById("email") as HTMLInputElement).value)}
              >
              {countdown > 0 ? `${countdown}秒后重试` : "发送验证码"}
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">密码</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="请输入密码"
            required
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm-password">确认密码</Label>
          <Input
            id="confirm-password"
            name="confirm-password"
            type="password"
            placeholder="请再次输入密码"
            required
            disabled={isLoading}
          />
        </div>
        <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
          {isLoading ? "注册中..." : "注册"}
        </Button>
      </form>
      <div className="text-center text-sm">
        已有账号?{" "}
        <Link href="/login" className="text-purple-600 hover:underline">
          登录
        </Link>
      </div>
    </div>
  )
}
