import Link from "next/link"
import { Button } from "@/components/ui/button"
import HeroSection from "@/components/home/hero-section"
import FeaturesSection from "@/components/home/features-section"
import TestimonialsSection from "@/components/home/testimonials-section"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <MusicIcon className="h-6 w-6 text-purple-600" />
            <span className="text-xl font-bold">AI音乐创作家</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4">
              功能特点
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:underline underline-offset-4">
              用户评价
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:underline underline-offset-4">
              价格方案
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" passHref>
              <Button variant="outline">登录</Button>
            </Link>
            <Link href="/login?register=true" passHref>
              <Button className="bg-purple-600 hover:bg-purple-700">注册</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <section id="pricing" className="py-16 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tight">价格方案</h2>
              <p className="text-gray-500 mt-4 max-w-md mx-auto">选择适合您需求的方案，开始创作属于您的AI音乐</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* 免费方案 */}
              <div className="border rounded-lg p-6 bg-white shadow-sm">
                <h3 className="text-xl font-bold">免费方案</h3>
                <div className="mt-4 text-3xl font-bold">
                  ¥0<span className="text-base font-normal text-gray-500">/月</span>
                </div>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                    <span>每月5首AI生成音乐</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                    <span>基础音乐编辑功能</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                    <span>标准音质导出</span>
                  </li>
                </ul>
                <Button className="w-full mt-6" variant="outline">
                  开始使用
                </Button>
              </div>

              {/* 进阶方案 */}
              <div className="border rounded-lg p-6 bg-purple-50 shadow-sm border-purple-200">
                <div className="bg-purple-600 text-white text-xs font-medium px-2 py-1 rounded-full w-fit mb-4">
                  最受欢迎
                </div>
                <h3 className="text-xl font-bold">进阶方案</h3>
                <div className="mt-4 text-3xl font-bold">
                  ¥49<span className="text-base font-normal text-gray-500">/月</span>
                </div>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                    <span>每月50首AI生成音乐</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                    <span>高级音乐编辑功能</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                    <span>高品质音频导出</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                    <span>优先客户支持</span>
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-purple-600 hover:bg-purple-700">立即订阅</Button>
              </div>

              {/* 专业方案 */}
              <div className="border rounded-lg p-6 bg-white shadow-sm">
                <h3 className="text-xl font-bold">专业方案</h3>
                <div className="mt-4 text-3xl font-bold">
                  ¥99<span className="text-base font-normal text-gray-500">/月</span>
                </div>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                    <span>无限AI生成音乐</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                    <span>专业音乐编辑套件</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                    <span>无损音质导出</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                    <span>商业版权使用</span>
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                    <span>24/7专属客户支持</span>
                  </li>
                </ul>
                <Button className="w-full mt-6" variant="outline">
                  联系销售
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-10">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 px-4 md:px-6">
          <div className="flex items-center gap-2">
            <MusicIcon className="h-5 w-5 text-purple-600" />
            <span className="text-sm font-medium">© 2025 AI音乐创作家. 保留所有权利.</span>
          </div>
          <nav className="flex gap-4 sm:gap-6">
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              隐私政策
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              服务条款
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              联系我们
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

function CheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function MusicIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  )
}
