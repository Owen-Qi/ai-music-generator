"use client"

import { useState } from "react"
import DashboardHeader from "@/components/layout/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import ApiEndpoint from "@/components/tutorials/api-endpoint"
import ApiSection from "@/components/tutorials/api-section"

export default function ApiDocsPage() {
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    auth: true,
    "music-generation": false,
    "music-library": false,
    "music-playback": false,
    subscription: false,
  })

  const copyToClipboard = (text: string, endpoint: string) => {
    navigator.clipboard.writeText(text)
    setCopiedEndpoint(endpoint)
    setTimeout(() => setCopiedEndpoint(null), 2000)
  }

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />
      <main className="flex-1 container py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">API 接口文档</h1>
            <p className="text-gray-500">AI音乐创作家平台的完整API接口参考</p>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700">申请API密钥</Button>
        </div>

        <div className="grid md:grid-cols-[250px_1fr] gap-6">
          {/* 侧边导航 */}
          <div className="space-y-4">
            <div className="sticky top-6">
              <Card>
                <CardHeader className="py-4">
                  <CardTitle className="text-lg">API 目录</CardTitle>
                </CardHeader>
                <CardContent className="py-2">
                  <nav className="space-y-1">
                    <a
                      href="#authentication"
                      className="block px-2 py-1.5 text-sm rounded-md hover:bg-gray-100 text-purple-600 font-medium"
                    >
                      认证与用户管理
                    </a>
                    <a href="#music-generation" className="block px-2 py-1.5 text-sm rounded-md hover:bg-gray-100">
                      音乐生成
                    </a>
                    <a href="#music-library" className="block px-2 py-1.5 text-sm rounded-md hover:bg-gray-100">
                      音乐库管理
                    </a>
                    <a href="#music-playback" className="block px-2 py-1.5 text-sm rounded-md hover:bg-gray-100">
                      音乐播放与下载
                    </a>
                    <a href="#subscription" className="block px-2 py-1.5 text-sm rounded-md hover:bg-gray-100">
                      订阅与支付
                    </a>
                  </nav>
                </CardContent>
              </Card>

              <Card className="mt-4">
                <CardHeader className="py-4">
                  <CardTitle className="text-lg">基本信息</CardTitle>
                </CardHeader>
                <CardContent className="py-2">
                  <div className="space-y-3 text-sm">
                    <div>
                      <div className="text-gray-500 mb-1">基础URL</div>
                      <code className="bg-gray-100 px-2 py-1 rounded text-purple-600 font-mono">
                        https://api.aimusic.com/v1
                      </code>
                    </div>
                    <div>
                      <div className="text-gray-500 mb-1">认证方式</div>
                      <div>Bearer Token</div>
                    </div>
                    <div>
                      <div className="text-gray-500 mb-1">响应格式</div>
                      <div>JSON</div>
                    </div>
                    <div>
                      <div className="text-gray-500 mb-1">速率限制</div>
                      <div>100 请求/分钟</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* 主要内容 */}
          <div className="space-y-10">
            <Card>
              <CardHeader>
                <CardTitle>API 概述</CardTitle>
                <CardDescription>
                  AI音乐创作家API允许开发者通过RESTful接口访问平台的核心功能，包括音乐生成、管理和播放。
                  所有API请求都需要使用HTTPS，并且大多数端点需要认证。
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">认证</h3>
                    <p className="text-sm text-gray-600">
                      大多数API请求需要通过Bearer Token进行认证。在HTTP请求头中添加以下内容：
                    </p>
                    <pre className="bg-gray-100 p-3 rounded-md mt-2 overflow-x-auto">
                      <code className="text-sm font-mono">Authorization: Bearer YOUR_API_KEY</code>
                    </pre>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">错误处理</h3>
                    <p className="text-sm text-gray-600">
                      API使用标准HTTP状态码表示请求成功或失败。错误响应包含错误代码和详细信息。
                    </p>
                    <pre className="bg-gray-100 p-3 rounded-md mt-2 overflow-x-auto">
                      <code className="text-sm font-mono">{`{
  "error": {
    "code": "invalid_request",
    "message": "请求参数无效",
    "details": "提示词不能为空"
  }
}`}</code>
                    </pre>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">分页</h3>
                    <p className="text-sm text-gray-600">
                      返回多个项目的端点支持分页。使用<code className="bg-gray-100 px-1 rounded">page</code>和
                      <code className="bg-gray-100 px-1 rounded">limit</code>参数控制结果。
                    </p>
                    <pre className="bg-gray-100 p-3 rounded-md mt-2 overflow-x-auto">
                      <code className="text-sm font-mono">GET /music?page=2&limit=10</code>
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 认证与用户管理 */}
            <ApiSection
              id="authentication"
              title="认证与用户管理"
              description="用户注册、登录、密码重置和个人资料管理相关的API端点。"
              isExpanded={expandedSections["auth"]}
              onToggle={() => toggleSection("auth")}
            >
              <ApiEndpoint
                method="POST"
                path="/auth/register"
                title="用户注册"
                description="创建新用户账户"
                requestBody={`{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "用户名"
}`}
                response={`{
  "id": "user_123456",
  "email": "user@example.com",
  "name": "用户名",
  "createdAt": "2025-04-27T12:34:56Z"
}`}
                onCopy={(text) => copyToClipboard(text, "/auth/register")}
                isCopied={copiedEndpoint === "/auth/register"}
              />

              <ApiEndpoint
                method="POST"
                path="/auth/login"
                title="用户登录"
                description="使用邮箱和密码登录"
                requestBody={`{
  "email": "user@example.com",
  "password": "securepassword"
}`}
                response={`{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_123456",
    "email": "user@example.com",
    "name": "用户名"
  }
}`}
                onCopy={(text) => copyToClipboard(text, "/auth/login")}
                isCopied={copiedEndpoint === "/auth/login"}
              />

              <ApiEndpoint
                method="POST"
                path="/auth/reset-password"
                title="请求密码重置"
                description="发送密码重置链接到用户邮箱"
                requestBody={`{
  "email": "user@example.com"
}`}
                response={`{
  "message": "密码重置链接已发送到您的邮箱"
}`}
                onCopy={(text) => copyToClipboard(text, "/auth/reset-password")}
                isCopied={copiedEndpoint === "/auth/reset-password"}
              />

              <ApiEndpoint
                method="PUT"
                path="/auth/reset-password"
                title="重置密码"
                description="使用重置令牌设置新密码"
                requestBody={`{
  "token": "reset_token_123456",
  "password": "newpassword"
}`}
                response={`{
  "message": "密码已成功重置"
}`}
                onCopy={(text) => copyToClipboard(text, "/auth/reset-password-confirm")}
                isCopied={copiedEndpoint === "/auth/reset-password-confirm"}
              />

              <ApiEndpoint
                method="GET"
                path="/users/me"
                title="获取当前用户信息"
                description="获取已认证用户的详细信息"
                response={`{
  "id": "user_123456",
  "email": "user@example.com",
  "name": "用户名",
  "createdAt": "2025-04-27T12:34:56Z",
  "subscription": {
    "plan": "pro",
    "status": "active",
    "expiresAt": "2026-04-27T12:34:56Z"
  },
  "usage": {
    "generationsThisMonth": 25,
    "generationsLimit": 50
  }
}`}
                onCopy={(text) => copyToClipboard(text, "/users/me")}
                isCopied={copiedEndpoint === "/users/me"}
              />

              <ApiEndpoint
                method="PUT"
                path="/users/me"
                title="更新用户信息"
                description="更新当前用户的个人资料"
                requestBody={`{
  "name": "新用户名",
  "avatar": "https://example.com/avatar.jpg"
}`}
                response={`{
  "id": "user_123456",
  "email": "user@example.com",
  "name": "新用户名",
  "avatar": "https://example.com/avatar.jpg",
  "updatedAt": "2025-04-28T10:15:20Z"
}`}
                onCopy={(text) => copyToClipboard(text, "/users/me-update")}
                isCopied={copiedEndpoint === "/users/me-update"}
              />
            </ApiSection>

            {/* 音乐生成 */}
            <ApiSection
              id="music-generation"
              title="音乐生成"
              description="AI音乐创作和生成相关的API端点。"
              isExpanded={expandedSections["music-generation"]}
              onToggle={() => toggleSection("music-generation")}
            >
              <ApiEndpoint
                method="POST"
                path="/music/generate"
                title="创建音乐生成任务"
                description="提交音乐生成请求"
                requestBody={`{
  "prompt": "一首轻快的流行歌曲，带有明亮的钢琴和温暖的声音，适合夏日早晨",
  "style": "pop",
  "voice": "female",
  "duration": 30,
  "tempo": 120,
  "energy": 70
}`}
                response={`{
  "taskId": "task_789012",
  "status": "processing",
  "estimatedTime": 60
}`}
                onCopy={(text) => copyToClipboard(text, "/music/generate")}
                isCopied={copiedEndpoint === "/music/generate"}
              />

              <ApiEndpoint
                method="GET"
                path="/music/tasks/{taskId}"
                title="获取生成任务状态"
                description="检查音乐生成任务的当前状态"
                pathParams={[{ name: "taskId", type: "string", description: "生成任务ID" }]}
                response={`{
  "taskId": "task_789012",
  "status": "completed",
  "progress": 100,
  "musicId": "music_345678",
  "createdAt": "2025-04-28T14:30:45Z",
  "completedAt": "2025-04-28T14:31:55Z"
}`}
                onCopy={(text) => copyToClipboard(text, "/music/tasks/{taskId}")}
                isCopied={copiedEndpoint === "/music/tasks/{taskId}"}
              />

              <ApiEndpoint
                method="POST"
                path="/music/regenerate/{musicId}"
                title="重新生成音乐"
                description="基于现有音乐重新生成，可调整参数"
                pathParams={[{ name: "musicId", type: "string", description: "音乐ID" }]}
                requestBody={`{
  "adjustments": {
    "tempo": 130,
    "energy": 80
  }
}`}
                response={`{
  "taskId": "task_789013",
  "status": "processing",
  "estimatedTime": 45,
  "originalMusicId": "music_345678"
}`}
                onCopy={(text) => copyToClipboard(text, "/music/regenerate/{musicId}")}
                isCopied={copiedEndpoint === "/music/regenerate/{musicId}"}
              />
            </ApiSection>

            {/* 音乐库管理 */}
            <ApiSection
              id="music-library"
              title="音乐库管理"
              description="管理用户创建的音乐作品的API端点。"
              isExpanded={expandedSections["music-library"]}
              onToggle={() => toggleSection("music-library")}
            >
              <ApiEndpoint
                method="GET"
                path="/music"
                title="获取音乐列表"
                description="获取用户的音乐作品列表"
                queryParams={[
                  { name: "page", type: "number", description: "页码，默认为1" },
                  { name: "limit", type: "number", description: "每页数量，默认为10" },
                  { name: "style", type: "string", description: "按风格筛选" },
                  { name: "sort", type: "string", description: "排序方式：newest, oldest, title" },
                ]}
                response={`{
  "total": 42,
  "page": 1,
  "limit": 10,
  "data": [
    {
      "id": "music_345678",
      "title": "夏日微风",
      "createdAt": "2025-04-28T14:31:55Z",
      "duration": "2:47",
      "style": "流行",
      "isPublic": true,
      "hasSheet": true
    },
    // ... 更多音乐项目
  ]
}`}
                onCopy={(text) => copyToClipboard(text, "/music")}
                isCopied={copiedEndpoint === "/music"}
              />

              <ApiEndpoint
                method="GET"
                path="/music/{musicId}"
                title="获取音乐详情"
                description="获取单个音乐作品的详细信息"
                pathParams={[{ name: "musicId", type: "string", description: "音乐ID" }]}
                response={`{
  "id": "music_345678",
  "title": "夏日微风",
  "description": "一首轻快的流行歌曲，带有明亮的钢琴和温暖的声音，适合夏日早晨",
  "createdAt": "2025-04-28T14:31:55Z",
  "duration": "2:47",
  "style": "流行",
  "isPublic": true,
  "hasSheet": true,
  "audioUrl": "https://api.aimusic.com/v1/music/music_345678/audio",
  "lyrics": "阳光照耀海面\\n微风轻抚脸颊\\n这个夏日如此美好\\n让我们一起感受这份温暖",
  "instruments": {
    "vocal": "https://api.aimusic.com/v1/music/music_345678/tracks/vocal",
    "guitar": "https://api.aimusic.com/v1/music/music_345678/tracks/guitar",
    "piano": "https://api.aimusic.com/v1/music/music_345678/tracks/piano",
    "bass": "https://api.aimusic.com/v1/music/music_345678/tracks/bass",
    "drums": "https://api.aimusic.com/v1/music/music_345678/tracks/drums"
  },
  "sheetUrl": "https://api.aimusic.com/v1/music/music_345678/sheet"
}`}
                onCopy={(text) => copyToClipboard(text, "/music/{musicId}")}
                isCopied={copiedEndpoint === "/music/{musicId}"}
              />

              <ApiEndpoint
                method="PUT"
                path="/music/{musicId}"
                title="更新音乐信息"
                description="更新音乐作品的元数据"
                pathParams={[{ name: "musicId", type: "string", description: "音乐ID" }]}
                requestBody={`{
  "title": "夏日海风",
  "description": "更新后的音乐描述",
  "isPublic": true
}`}
                response={`{
  "id": "music_345678",
  "title": "夏日海风",
  "description": "更新后的音乐描述",
  "updatedAt": "2025-04-29T09:12:34Z",
  "isPublic": true
}`}
                onCopy={(text) => copyToClipboard(text, "/music/{musicId}-update")}
                isCopied={copiedEndpoint === "/music/{musicId}-update"}
              />

              <ApiEndpoint
                method="DELETE"
                path="/music/{musicId}"
                title="删除音乐"
                description="删除一个音乐作品"
                pathParams={[{ name: "musicId", type: "string", description: "音乐ID" }]}
                response={`{
  "message": "音乐已成功删除"
}`}
                onCopy={(text) => copyToClipboard(text, "/music/{musicId}-delete")}
                isCopied={copiedEndpoint === "/music/{musicId}-delete"}
              />

              <ApiEndpoint
                method="POST"
                path="/music/{musicId}/share"
                title="分享音乐"
                description="创建音乐分享链接"
                pathParams={[{ name: "musicId", type: "string", description: "音乐ID" }]}
                requestBody={`{
  "expiresIn": 604800,
  "allowDownload": true
}`}
                response={`{
  "shareId": "share_567890",
  "shareUrl": "https://aimusic.com/share/abcdef123456",
  "expiresAt": "2025-05-06T09:12:34Z",
  "allowDownload": true
}`}
                onCopy={(text) => copyToClipboard(text, "/music/{musicId}/share")}
                isCopied={copiedEndpoint === "/music/{musicId}/share"}
              />
            </ApiSection>

            {/* 音乐播放与下载 */}
            <ApiSection
              id="music-playback"
              title="音乐播放与下载"
              description="音乐文件、分轨和曲谱访问的API端点。"
              isExpanded={expandedSections["music-playback"]}
              onToggle={() => toggleSection("music-playback")}
            >
              <ApiEndpoint
                method="GET"
                path="/music/{musicId}/audio"
                title="获取音乐音频"
                description="获取完整音乐音频文件"
                pathParams={[{ name: "musicId", type: "string", description: "音乐ID" }]}
                queryParams={[
                  { name: "format", type: "string", description: "音频格式：mp3, wav, flac，默认为mp3" },
                  { name: "quality", type: "string", description: "音质：standard, high, lossless，默认为standard" },
                ]}
                responseType="audio/mpeg 或指定的格式"
                onCopy={(text) => copyToClipboard(text, "/music/{musicId}/audio")}
                isCopied={copiedEndpoint === "/music/{musicId}/audio"}
              />

              <ApiEndpoint
                method="GET"
                path="/music/{musicId}/tracks/{trackType}"
                title="获取音乐分轨"
                description="获取特定乐器或人声的分轨音频"
                pathParams={[
                  { name: "musicId", type: "string", description: "音乐ID" },
                  { name: "trackType", type: "string", description: "分轨类型：vocal, guitar, piano, bass, drums" },
                ]}
                queryParams={[{ name: "format", type: "string", description: "音频格式：mp3, wav, flac，默认为mp3" }]}
                responseType="audio/mpeg 或指定的格式"
                onCopy={(text) => copyToClipboard(text, "/music/{musicId}/tracks/{trackType}")}
                isCopied={copiedEndpoint === "/music/{musicId}/tracks/{trackType}"}
              />

              <ApiEndpoint
                method="GET"
                path="/music/{musicId}/sheet"
                title="获取音乐曲谱"
                description="获取音乐的PDF格式曲谱"
                pathParams={[{ name: "musicId", type: "string", description: "音乐ID" }]}
                responseType="application/pdf"
                onCopy={(text) => copyToClipboard(text, "/music/{musicId}/sheet")}
                isCopied={copiedEndpoint === "/music/{musicId}/sheet"}
              />

              <ApiEndpoint
                method="GET"
                path="/share/{shareId}"
                title="获取分享音乐信息"
                description="通过分享ID获取音乐信息"
                pathParams={[{ name: "shareId", type: "string", description: "分享ID" }]}
                response={`{
  "music": {
    "id": "music_345678",
    "title": "夏日微风",
    "description": "一首轻快的流行歌曲，带有明亮的钢琴和温暖的声音，适合夏日早晨",
    "duration": "2:47",
    "style": "流行",
    "audioUrl": "https://api.aimusic.com/v1/share/abcdef123456/audio",
    "createdAt": "2025-04-28T14:31:55Z"
  },
  "share": {
    "expiresAt": "2025-05-06T09:12:34Z",
    "allowDownload": true
  }
}`}
                onCopy={(text) => copyToClipboard(text, "/share/{shareId}")}
                isCopied={copiedEndpoint === "/share/{shareId}"}
              />
            </ApiSection>

            {/* 订阅与支付 */}
            <ApiSection
              id="subscription"
              title="订阅与支付"
              description="管理用户订阅和支付的API端点。"
              isExpanded={expandedSections["subscription"]}
              onToggle={() => toggleSection("subscription")}
            >
              <ApiEndpoint
                method="GET"
                path="/subscription/plans"
                title="获取订阅计划"
                description="获取可用的订阅计划列表"
                response={`{
  "plans": [
    {
      "id": "plan_free",
      "name": "免费方案",
      "price": 0,
      "currency": "CNY",
      "interval": "month",
      "features": [
        "每月5首AI生成音乐",
        "基础音乐编辑功能",
        "标准音质导出"
      ]
    },
    {
      "id": "plan_pro",
      "name": "进阶方案",
      "price": 4900,
      "currency": "CNY",
      "interval": "month",
      "features": [
        "每月50首AI生成音乐",
        "高级音乐编辑功能",
        "高品质音频导出",
        "优先客户支持"
      ]
    },
    {
      "id": "plan_premium",
      "name": "专业方案",
      "price": 9900,
      "currency": "CNY",
      "interval": "month",
      "features": [
        "无限AI生成音乐",
        "专业音乐编辑套件",
        "无损音质导出",
        "商业版权使用",
        "24/7专属客户支持"
      ]
    }
  ]
}`}
                onCopy={(text) => copyToClipboard(text, "/subscription/plans")}
                isCopied={copiedEndpoint === "/subscription/plans"}
              />

              <ApiEndpoint
                method="GET"
                path="/subscription"
                title="获取当前订阅"
                description="获取用户当前的订阅信息"
                response={`{
  "subscription": {
    "planId": "plan_pro",
    "planName": "进阶方案",
    "status": "active",
    "currentPeriodStart": "2025-04-01T00:00:00Z",
    "currentPeriodEnd": "2025-05-01T00:00:00Z",
    "cancelAtPeriodEnd": false
  },
  "usage": {
    "generationsThisMonth": 25,
    "generationsLimit": 50,
    "resetDate": "2025-05-01T00:00:00Z"
  }
}`}
                onCopy={(text) => copyToClipboard(text, "/subscription")}
                isCopied={copiedEndpoint === "/subscription"}
              />

              <ApiEndpoint
                method="POST"
                path="/subscription/checkout"
                title="创建结账会话"
                description="创建订阅支付的结账会话"
                requestBody={`{
  "planId": "plan_pro",
  "successUrl": "https://aimusic.com/payment/success",
  "cancelUrl": "https://aimusic.com/payment/cancel"
}`}
                response={`{
  "checkoutId": "checkout_123456",
  "checkoutUrl": "https://payment.service.com/checkout/abcdef123456",
  "expiresAt": "2025-04-29T10:30:00Z"
}`}
                onCopy={(text) => copyToClipboard(text, "/subscription/checkout")}
                isCopied={copiedEndpoint === "/subscription/checkout"}
              />

              <ApiEndpoint
                method="POST"
                path="/subscription/cancel"
                title="取消订阅"
                description="取消当前活跃的订阅"
                requestBody={`{
  "cancelAtPeriodEnd": true
}`}
                response={`{
  "subscription": {
    "planId": "plan_pro",
    "status": "active",
    "currentPeriodEnd": "2025-05-01T00:00:00Z",
    "cancelAtPeriodEnd": true
  },
  "message": "订阅将在当前周期结束后取消"
}`}
                onCopy={(text) => copyToClipboard(text, "/subscription/cancel")}
                isCopied={copiedEndpoint === "/subscription/cancel"}
              />

              <ApiEndpoint
                method="GET"
                path="/subscription/invoices"
                title="获取发票历史"
                description="获取用户的发票历史记录"
                queryParams={[
                  { name: "page", type: "number", description: "页码，默认为1" },
                  { name: "limit", type: "number", description: "每页数量，默认为10" },
                ]}
                response={`{
  "total": 6,
  "page": 1,
  "limit": 10,
  "data": [
    {
      "id": "invoice_123456",
      "amount": 4900,
      "currency": "CNY",
      "status": "paid",
      "createdAt": "2025-04-01T00:00:00Z",
      "paidAt": "2025-04-01T00:05:23Z",
      "periodStart": "2025-04-01T00:00:00Z",
      "periodEnd": "2025-05-01T00:00:00Z",
      "downloadUrl": "https://api.aimusic.com/v1/subscription/invoices/invoice_123456/pdf"
    },
    // ... 更多发票
  ]
}`}
                onCopy={(text) => copyToClipboard(text, "/subscription/invoices")}
                isCopied={copiedEndpoint === "/subscription/invoices"}
              />
            </ApiSection>
          </div>
        </div>
      </main>
    </div>
  )
}
