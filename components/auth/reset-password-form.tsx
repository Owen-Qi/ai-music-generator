"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { sendVerificationCode, resetPassword } from "@/lib/api"
import { toast } from "sonner"

export default function ResetPasswordForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [email, setEmail] = useState("")
  const [countdown, setCountdown] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const handleSendCode = async () => {
    try {
      await sendVerificationCode(email, "reset_password")
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const newPassword = formData.get("new-password") as string
    const confirmPassword = formData.get("confirm-password") as string
    const code = formData.get("code") as string

    if (newPassword !== confirmPassword) {
      setError("两次输入的密码不一致")
      toast.error("两次输入的密码不一致")
      setIsLoading(false)
      return
    }

    try {
      await resetPassword(email, newPassword, code)
      setIsSubmitted(true)
      toast.success("密码重置成功")
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
        toast.error(error.message)
      } else {
        setError("重置密码失败，请稍后重试")
        toast.error("重置密码失败，请稍后重试")
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="space-y-4">
        <Alert className="border-green-200 bg-green-50 text-green-800">
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle>密码重置成功</AlertTitle>
          <AlertDescription>您的密码已成功重置，请使用新密码登录。</AlertDescription>
        </Alert>
        <div className="text-center">
          <Link href="/login" className="text-purple-600 hover:underline">
            返回登录
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
            {error}
          </div>
        )}
        <div className="space-y-2">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>忘记密码?</AlertTitle>
            <AlertDescription>请输入您的邮箱地址，我们将向您发送验证码。</AlertDescription>
          </Alert>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">邮箱</Label>
          <div className="flex gap-2">
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
            <Button
              type="button"
              variant="outline"
              disabled={isLoading || countdown > 0}
              onClick={handleSendCode}
            >
              {countdown > 0 ? `${countdown}秒后重试` : "发送验证码"}
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="code">验证码</Label>
          <Input
            id="code"
            name="code"
            type="text"
            placeholder="请输入验证码"
            required
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="new-password">新密码</Label>
          <Input
            id="new-password"
            name="new-password"
            type="password"
            placeholder="请输入新密码"
            required
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm-password">确认新密码</Label>
          <Input
            id="confirm-password"
            name="confirm-password"
            type="password"
            placeholder="请再次输入新密码"
            required
            disabled={isLoading}
          />
        </div>
        <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
          {isLoading ? "重置中..." : "重置密码"}
        </Button>
        <div className="text-center text-sm">
          <Link href="/login" className="text-purple-600 hover:underline">
            返回登录
          </Link>
        </div>
      </form>
    </div>
  )
}
