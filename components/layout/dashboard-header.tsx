"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MusicIcon, Menu, X } from "lucide-react"

export default function DashboardHeader() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    // 模拟登出操作
    document.cookie = "token=; path=/"
    router.push("/")
  }

  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="flex items-center gap-2">
            <MusicIcon className="h-6 w-6 text-purple-600" />
            <span className="text-xl font-bold">AI音乐创作家</span>
          </Link>
        </div>

        {/* <nav className="hidden md:flex items-center gap-6">
          <Link href="/dashboard" className="text-sm font-medium hover:text-purple-600">
            仪表盘
          </Link>
          <Link href="/dashboard/create" className="text-sm font-medium hover:text-purple-600">
            创建音乐
          </Link>
          <Link href="/dashboard/library" className="text-sm font-medium hover:text-purple-600">
            我的作品
          </Link>
          <Link href="/dashboard/tutorials" className="text-sm font-medium hover:text-purple-600">
            教程
          </Link>
        </nav> */}

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="用户头像" />
                  <AvatarFallback>用户</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">用户名</p>
                  <p className="text-xs leading-none text-gray-500">user@example.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>账号设置</DropdownMenuItem>
              <DropdownMenuItem>订阅管理</DropdownMenuItem>
              <DropdownMenuItem>帮助中心</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>退出登录</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* 移动端菜单 */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4 px-4 md:px-6">
            <nav className="flex flex-col space-y-4">
              <Link href="/dashboard" className="text-sm font-medium hover:text-purple-600">
                仪表盘
              </Link>
              <Link href="/dashboard/create" className="text-sm font-medium hover:text-purple-600">
                创建音乐
              </Link>
              <Link href="/dashboard/library" className="text-sm font-medium hover:text-purple-600">
                我的作品
              </Link>
              <Link href="/dashboard/tutorials" className="text-sm font-medium hover:text-purple-600">
                教程
              </Link>
              <div className="pt-4 border-t">
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 px-2"
                >
                  退出登录
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
