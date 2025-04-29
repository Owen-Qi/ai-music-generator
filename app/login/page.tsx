"use client"

import { useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MusicIcon } from "lucide-react"
import LoginForm from "@/components/auth/login-form"
import RegisterForm from "@/components/auth/register-form"
import ResetPasswordForm from "@/components/auth/reset-password-form"

export default function LoginPage() {
  const searchParams = useSearchParams()
  const register = searchParams.get("register")
  const reset = searchParams.get("reset")
  const [activeTab, setActiveTab] = useState(reset ? "reset" : register ? "register" : "login")

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center mb-8">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <MusicIcon className="h-6 w-6 text-purple-600" />
              <span className="text-xl font-bold">AI音乐创作家</span>
            </Link>
            <h1 className="text-2xl font-bold text-center">欢迎回来</h1>
            <p className="text-gray-500 mt-2 text-center">登录您的账户以继续创作音乐之旅</p>
          </div>
          <div className="bg-white p-8 rounded-lg border shadow-sm">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="login">登录</TabsTrigger>
                <TabsTrigger value="register">注册</TabsTrigger>
                <TabsTrigger value="reset">找回密码</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <LoginForm />
              </TabsContent>
              <TabsContent value="register">
                <RegisterForm />
              </TabsContent>
              <TabsContent value="reset">
                <ResetPasswordForm />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      <footer className="border-t py-4">
        <div className="container flex justify-center">
          <p className="text-sm text-gray-500">© 2025 AI音乐创作家. 保留所有权利.</p>
        </div>
      </footer>
    </div>
  )
}
