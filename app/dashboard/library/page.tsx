"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import DashboardHeader from "@/components/layout/dashboard-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import MusicCard from "@/components/library/music-card"
import MusicListItem from "@/components/library/music-list-item"
import { ArrowUpDown, Grid, List, Plus, Search, SlidersHorizontal, Music, ArrowLeft } from "lucide-react"
import { getMusicList } from "@/lib/api"
import type { MusicItem } from "@/lib/api"

export default function LibraryPage() {
  const router = useRouter()
  // 状态变量
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest" | "title">("newest")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [musicList, setMusicList] = useState<MusicItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 获取音乐列表
  const fetchMusicList = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await getMusicList()
      console.log(response)
      if (response.results) {
        setMusicList(response.results)
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
    fetchMusicList()
  }, [])

  // 获取所有音乐风格类别
  const allCategories = ["all", ...Array.from(new Set(musicList.map((item) => item.tags.split(",")[0])))]

  // 过滤和排序音乐列表
  const filteredMusic = musicList
    .filter((music) => {
      // 搜索过滤
      const matchesSearch = music.title.toLowerCase().includes(searchQuery.toLowerCase())
      // 类别过滤
      const matchesCategory = selectedCategory === "all" || music.tags.split(",")[0] === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      // 排序
      if (sortOrder === "newest") {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      } else if (sortOrder === "oldest") {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      } else {
        return a.title.localeCompare(b.title)
      }
    })

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />
      <main className="flex-1 container py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.push("/dashboard")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-3xl font-bold mb-2">我的作品</h1>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => router.push("/dashboard/create")}>
            <Plus className="mr-2 h-4 w-4" /> 创建新音乐
          </Button>
        </div>

        {/* 筛选工具栏 */}
        <div className="grid gap-4 md:grid-cols-[1fr_auto_auto_auto] mb-8">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="搜索音乐..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex gap-2 whitespace-nowrap">
                <SlidersHorizontal className="h-4 w-4" />
                <span className="hidden md:inline">风格</span>
                {selectedCategory !== "all" && (
                  <Badge className="ml-1 bg-purple-100 text-purple-800 hover:bg-purple-100">{selectedCategory}</Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              {allCategories.map((category) => (
                <DropdownMenuItem
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-purple-50 text-purple-800 font-semibold" : ""}
                >
                  {category === "all" ? "所有风格" : category}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex gap-2">
                <ArrowUpDown className="h-4 w-4" />
                <span className="hidden md:inline">排序</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => setSortOrder("newest")}
                className={sortOrder === "newest" ? "bg-purple-50 text-purple-800 font-semibold" : ""}
              >
                最新创建
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setSortOrder("oldest")}
                className={sortOrder === "oldest" ? "bg-purple-50 text-purple-800 font-semibold" : ""}
              >
                最早创建
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setSortOrder("title")}
                className={sortOrder === "title" ? "bg-purple-50 text-purple-800 font-semibold" : ""}
              >
                按标题
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* <Tabs defaultValue="grid" value={viewMode} onValueChange={(v) => setViewMode(v as "grid" | "list")}>
            <TabsList className="bg-gray-100">
              <TabsTrigger value="grid" className="data-[state=active]:bg-white">
                <Grid className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="list" className="data-[state=active]:bg-white">
                <List className="h-4 w-4" />
              </TabsTrigger>
            </TabsList>
          </Tabs> */}
        </div>

        {/* 加载状态 */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          </div>
        )}

        {/* 错误提示 */}
        {error && (
          <div className="border border-red-200 bg-red-50 text-red-600 rounded-lg p-4 text-center">
            {error}
          </div>
        )}

        {/* 音乐列表 */}
        {!isLoading && !error && filteredMusic.length > 0 ? (
          <div className={viewMode === "grid" ? "grid gap-6 md:grid-cols-2 lg:grid-cols-3" : "space-y-4"}>
            {filteredMusic.map((music) =>
              <MusicCard key={music.clip_id} music={music} />
              // viewMode === "grid" ? (
              //   <MusicCard key={music.clip_id} music={music} />
              // ) : (
              //   <MusicListItem key={music.clip_id} music={music} />
              // ),
            )}
          </div>
        ) : !isLoading && !error ? (
          <div className="border rounded-lg p-8 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <Music className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium mb-2">未找到音乐作品</h3>
            <p className="text-gray-500 mb-4 max-w-md mx-auto">
              {searchQuery
                ? "没有找到匹配的音乐作品，请尝试不同的搜索条件。"
                : "开始使用AI音乐创作家创作您的第一首音乐作品吧！"}
            </p>
            <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => router.push("/dashboard/create")}>
              创建第一首音乐
            </Button>
          </div>
        ) : null}
      </main>
    </div>
  )
}
