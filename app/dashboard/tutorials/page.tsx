import Link from "next/link"
import DashboardHeader from "@/components/layout/dashboard-header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Code, Play, BookOpen, Lightbulb, Layers, Server } from "lucide-react"

export default function TutorialsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />
      <main className="flex-1 container py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">教程中心</h1>
            <p className="text-gray-500">学习如何使用AI音乐创作家的各项功能和技巧</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* API文档教程卡片 */}
          <Card className="overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">开发者</Badge>
                <Server className="h-5 w-5 text-blue-600" />
              </div>
              <CardTitle className="mt-2">API接口文档</CardTitle>
              <CardDescription>完整的API接口参考，帮助开发者集成AI音乐创作功能</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Code className="h-4 w-4 text-gray-500" />
                  <span>RESTful API接口</span>
                </li>
                <li className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <span>详细的请求和响应示例</span>
                </li>
                <li className="flex items-center gap-2">
                  <Layers className="h-4 w-4 text-gray-500" />
                  <span>认证、音乐生成、管理等功能</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="pt-2">
              <Link href="/dashboard/tutorials/api-docs" className="w-full">
                <Button variant="outline" className="w-full">
                  查看文档
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {/* 入门指南卡片 */}
          <Card className="overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">新手</Badge>
                <BookOpen className="h-5 w-5 text-green-600" />
              </div>
              <CardTitle className="mt-2">入门指南</CardTitle>
              <CardDescription>从零开始学习如何使用AI音乐创作家创作您的第一首音乐</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Play className="h-4 w-4 text-gray-500" />
                  <span>界面功能介绍</span>
                </li>
                <li className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-gray-500" />
                  <span>提示词编写技巧</span>
                </li>
                <li className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <span>音乐风格与参数调整</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="pt-2">
              <Button variant="outline" className="w-full">
                开始学习
              </Button>
            </CardFooter>
          </Card>

          {/* 高级技巧卡片 */}
          <Card className="overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">进阶</Badge>
                <Lightbulb className="h-5 w-5 text-purple-600" />
              </div>
              <CardTitle className="mt-2">高级创作技巧</CardTitle>
              <CardDescription>掌握AI音乐创作的高级技巧，创作更专业的音乐作品</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <span>多轨编辑与混音</span>
                </li>
                <li className="flex items-center gap-2">
                  <Layers className="h-4 w-4 text-gray-500" />
                  <span>音乐结构与和声控制</span>
                </li>
                <li className="flex items-center gap-2">
                  <Code className="h-4 w-4 text-gray-500" />
                  <span>高级参数调优</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="pt-2">
              <Button variant="outline" className="w-full">
                查看技巧
              </Button>
            </CardFooter>
          </Card>

          {/* 视频教程卡片 */}
          <Card className="overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">视频</Badge>
                <Play className="h-5 w-5 text-amber-600" />
              </div>
              <CardTitle className="mt-2">视频教程</CardTitle>
              <CardDescription>通过视频学习AI音乐创作的各项功能和技巧</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Play className="h-4 w-4 text-gray-500" />
                  <span>基础功能演示</span>
                </li>
                <li className="flex items-center gap-2">
                  <Play className="h-4 w-4 text-gray-500" />
                  <span>创作流程实例</span>
                </li>
                <li className="flex items-center gap-2">
                  <Play className="h-4 w-4 text-gray-500" />
                  <span>专业技巧分享</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="pt-2">
              <Button variant="outline" className="w-full">
                观看视频
              </Button>
            </CardFooter>
          </Card>

          {/* 常见问题卡片 */}
          <Card className="overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <Badge className="bg-red-100 text-red-800 hover:bg-red-100">FAQ</Badge>
                <FileText className="h-5 w-5 text-red-600" />
              </div>
              <CardTitle className="mt-2">常见问题</CardTitle>
              <CardDescription>解答用户在使用过程中遇到的常见问题</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <span>账号与订阅问题</span>
                </li>
                <li className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <span>音乐生成与编辑问题</span>
                </li>
                <li className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <span>导出与版权问题</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="pt-2">
              <Button variant="outline" className="w-full">
                查看问题
              </Button>
            </CardFooter>
          </Card>

          {/* 社区案例卡片 */}
          <Card className="overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">社区</Badge>
                <Layers className="h-5 w-5 text-gray-600" />
              </div>
              <CardTitle className="mt-2">社区案例</CardTitle>
              <CardDescription>浏览社区用户分享的优秀音乐作品和创作经验</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <span>优秀作品展示</span>
                </li>
                <li className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-gray-500" />
                  <span>创作经验分享</span>
                </li>
                <li className="flex items-center gap-2">
                  <Code className="h-4 w-4 text-gray-500" />
                  <span>提示词模板</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="pt-2">
              <Button variant="outline" className="w-full">
                浏览案例
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}
