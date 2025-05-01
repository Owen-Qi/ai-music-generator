"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import DashboardHeader from "@/components/layout/dashboard-header"
import { MusicIcon } from "lucide-react"
import MusicCard from "@/components/library/music-card"
import { getMusicList } from "@/lib/api"
import type { MusicItem } from "@/lib/api"
import AudioPlayer from "@/components/player/audio-player"
import { useState, useEffect } from "react"

export default function DashboardPage() {
  const router = useRouter()
  const [recentMusic, setRecentMusic] = useState<MusicItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentMusic, setCurrentMusic] = useState<MusicItem | null>(null)
  const [playingMusicId, setPlayingMusicId] = useState<string | null>(null)

  // 获取最近音乐列表
  const fetchRecentMusic = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await getMusicList()
      if (response.results) {
        // 按创建时间排序并只取前3首
        const sortedMusic = response.results.sort((a, b) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        ).slice(0, 3)
        setRecentMusic(sortedMusic)
      } else {
        setError("获取音乐列表失败")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "获取音乐列表失败")
    } finally {
      setIsLoading(false)
    }
  }

  // 初始加载
  useEffect(() => {
    fetchRecentMusic()
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />
      <main className="flex-1 container py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">欢迎回来，创作者</h1>
          <p className="text-gray-500">开始创作您的下一首音乐杰作</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* 创建新音乐卡片 */}
          <div className="border rounded-lg p-6 bg-purple-50 border-purple-100">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-purple-100 mb-4">
              <PlusIcon className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">创建新音乐</h3>
            <p className="text-gray-500 mb-4">使用AI生成全新的音乐作品</p>
            <Button
             onClick={() => router.push("/dashboard/create")}
             className="w-full bg-purple-600 hover:bg-purple-700">开始创作</Button>
          </div>

          {/* 我的作品卡片 */}
          <div className="border rounded-lg p-6">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
              <MusicIcon className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">我的作品</h3>
            <p className="text-gray-500 mb-4">查看和管理您之前创作的所有音乐作品</p>
            <Button
              onClick={() => router.push("/dashboard/library")}
              variant="outline" className="w-full">
              查看作品
            </Button>
          </div>

          {/* 教程卡片 */}
          <div className="border rounded-lg p-6">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <BookOpenIcon className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">教程中心</h3>
            <p className="text-gray-500 mb-4">学习如何使用AI音乐创作家的各项功能和技巧</p>
            <Button variant="outline" className="w-full">
              查看教程
            </Button>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">最近创作</h2>
          {/* 错误提示 */}
          {error && (
            <div className="border border-red-200 bg-red-50 text-red-600 rounded-lg p-4 text-center">
              {error}
            </div>
          )}

          {/* 音乐列表 */}
          {!isLoading && !error && recentMusic.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recentMusic.map((music) => (
                <MusicCard 
                  key={music.clip_id} 
                  music={music} 
                  onDelete={fetchRecentMusic} 
                  onPlay={() => {
                    setCurrentMusic(music)
                    setPlayingMusicId(music.clip_id)
                  }}
                  isPlaying={playingMusicId === music.clip_id}
                />
              ))}
            </div>
          ) : !isLoading && !error ? (
            <div className="border rounded-lg p-8 text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <MusicOffIcon className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">还没有创作作品</h3>
              <p className="text-gray-500 mb-4 max-w-md mx-auto">开始使用AI音乐创作家创作您的第一首音乐作品吧！</p>
              <Button 
                className="bg-purple-600 hover:bg-purple-700"
                onClick={() => router.push("/dashboard/create")}
              >
                创建第一首音乐
              </Button>
            </div>
          ) : null}
        </div>
      </main>
      {currentMusic && (
        <AudioPlayer 
          currentMusic={currentMusic} 
          onClose={() => {
            setCurrentMusic(null)
            setPlayingMusicId(null)
          }} 
        />
      )}
      <footer className="border-t py-6">
        <div className="container flex justify-between items-center">
          <p className="text-sm text-gray-500">© 2025 AI音乐创作家. 保留所有权利.</p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-gray-500 hover:text-gray-900">
              帮助中心
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:text-gray-900">
              联系我们
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

function PlusIcon(props) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
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

function BookOpenIcon(props) {
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
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  )
}

function MusicOffIcon(props) {
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
      <path d="m2 2 20 20" />
      <path d="M8 8v13" />
      <path d="M12 8h7a2 2 0 0 1 2 2v1.5" />
      <path d="M8 18a3 3 0 0 1-3-3" />
      <path d="M21 15v-3a2 2 0 0 0-2-2h-1" />
      <path d="M11.5 8 9 4l-3 3" />
    </svg>
  )
}
