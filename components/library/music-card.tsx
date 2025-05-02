"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FileText,
  Music,
  Play,
  Pause,
  Edit,
  Download,
  Share2,
  Trash2,
  MoreVertical,
  FileMusic,
  Headphones,
} from "lucide-react"
import { formatDate } from "@/lib/utils"
import type { MusicItem } from "@/lib/api"
import { deleteMusic } from "@/lib/api"
import { useRouter } from "next/navigation"

interface MusicCardProps {
  music: MusicItem
  onDelete?: (clip_id: string) => void
  onPlay: () => void
  isPlaying?: boolean
}

export default function MusicCard({ music, onDelete, onPlay, isPlaying = false }: MusicCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (!isDialogOpen) {
      // 当对话框关闭时，设置一个短暂的延迟来重置 isClosing 状态
      const timer = setTimeout(() => {
        setIsClosing(false)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isDialogOpen])

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation()
    onPlay()
  }

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('[role="dialog"]')) {
      return
    }
    if (isClosing) {
      return
    }
    setIsDialogOpen(true)
  }

  const handleDialogOpenChange = (open: boolean) => {
    if (!open) {
      setIsClosing(true)
    }
    setIsDialogOpen(open)
  }

  const handleDelete = async (e: React.MouseEvent, clip_id: string) => {
    e.stopPropagation()

    await deleteMusic(clip_id)

    if (onDelete) {
      onDelete(clip_id)
    }
  }

  const handleDownload = (e: React.MouseEvent, audio_url: string) => {
    e.stopPropagation() // 阻止事件冒泡
    
    // 使用 fetch 获取文件并触发下载
    fetch(audio_url)
      .then(response => response.blob())
      .then(blob => {
        // 创建 blob URL
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `${music.title}.mp3` // 设置下载文件名
        document.body.appendChild(link)
        link.click()
        // 清理
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
      })
      .catch(err => {
        console.error('下载失败:', err)
      })
  }

  const handleDownloadMusicXML = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (music.sheet_url) {
      const url = music.sheet_url.replace('.pdf', '.musicxml')
      window.open(url, '_blank')
    }
  }

  const handleDownloadPDF = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (music.sheet_pdf_url) {
      window.open(music.sheet_pdf_url, '_blank')
    }
  }

  useEffect(() => {
    if (music.sheet_url && isDialogOpen) {
      setPdfUrl(music.sheet_url)
    }
  }, [music.sheet_url, isDialogOpen])

  return (
    <Card 
      className="overflow-hidden transition-all hover:shadow-md cursor-pointer" 
      onClick={handleCardClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-12 w-12 flex-shrink-0 bg-purple-100 rounded-md flex items-center justify-center">
            {/* 如果图片为空，则显示音乐图标 */}
            {music.image_url ? (
              <img src={music.image_url} alt={music.title} className="w-full h-full object-cover rounded-md" />
            ) : (
              <Music className="h-6 w-6 text-purple-600" aria-label="音乐" />
            )}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-lg truncate">{music.title}</h3>
              {music.has_sheet && <FileMusic className="h-4 w-4 text-purple-600" aria-label="包含曲谱" />}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>{formatDate(music.created_at)}</span>
              <span>•</span>
              <span>{music.duration}</span>
            </div>
          </div>
        </div>

        <div className="mb-3 text-sm text-gray-600 line-clamp-2">
          {music.description || "这首音乐没有描述。点击查看详细信息，包括歌词和乐器分轨。"}
        </div>

        <div className="flex items-center gap-2 mt-3">
          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">{music.tags}</Badge>
          {/* {music.is_public && (
            <Badge variant="outline" className="text-xs">
              公开
            </Badge>
          )} */}
        </div>
      </CardContent>

      <CardFooter className="p-3 pt-0 flex justify-between">
        <Button variant="outline" size="sm" className="text-xs" onClick={(e) => handlePlay(e)}>
          {isPlaying ? <Pause className="h-3 w-3 mr-1" /> : <Play className="h-3 w-3 mr-1" />}
          {isPlaying ? "暂停" : "播放"}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={(e) => e.stopPropagation()}>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>操作</DropdownMenuLabel>
            {/* <DropdownMenuItem>
              <Edit className="h-4 w-4 mr-2" />
              编辑
            </DropdownMenuItem> */}
            <DropdownMenuItem onClick={(e) => handleDownload(e, music.audio_url)}>
              <Download className="h-4 w-4 mr-2" />
              下载
            </DropdownMenuItem>
            {/* <DropdownMenuItem>
              <Share2 className="h-4 w-4 mr-2" />
              分享
            </DropdownMenuItem> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50" onClick={(e) => handleDelete(e, music.clip_id)}>
              <Trash2 className="h-4 w-4 mr-2" />
              删除
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
      {/* 详细信息弹窗 */}
      <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {music.title}
              {music.has_sheet && <FileMusic className="h-4 w-4 text-purple-600" aria-label="包含曲谱" />}
            </DialogTitle>
            <DialogDescription>
              创建于 {formatDate(music.created_at)} • {music.duration} • {music.tags}
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="info">基本信息</TabsTrigger>
              <TabsTrigger value="tracks">音轨分离</TabsTrigger>
              <TabsTrigger value="sheet">曲谱</TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="space-y-4">
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">音乐描述</h4>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                  {music.description || "这首音乐没有描述。"}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">歌词</h4>
                <div className="bg-gray-50 p-3 rounded-md max-h-60 overflow-y-auto">
                  {music.prompt ? (
                    <pre className="text-sm whitespace-pre-wrap">{music.prompt}</pre>
                  ) : (
                    <p className="text-sm text-gray-500">这首音乐没有歌词。</p>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tracks">
              <div className="space-y-3 mt-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">人声</span>
                    <Headphones className="h-4 w-4 text-purple-600" aria-label="人声" />
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Play className="h-3 w-3 mr-1" />
                      播放
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-3 w-3 mr-1" />
                      下载
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">钢琴</span>
                    <Music className="h-4 w-4 text-purple-600" aria-label="钢琴" />
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Play className="h-3 w-3 mr-1" />
                      播放
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-3 w-3 mr-1" />
                      下载
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">吉他</span>
                    <Music className="h-4 w-4 text-purple-600" aria-label="吉他" />
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Play className="h-3 w-3 mr-1" />
                      播放
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-3 w-3 mr-1" />
                      下载
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">贝斯</span>
                    <Music className="h-4 w-4 text-purple-600" aria-label="贝斯" />
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Play className="h-3 w-3 mr-1" />
                      播放
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-3 w-3 mr-1" />
                      下载
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">鼓组</span>
                    <Music className="h-4 w-4 text-purple-600" aria-label="鼓组" />
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Play className="h-3 w-3 mr-1" />
                      播放
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-3 w-3 mr-1" />
                      下载
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="sheet">
              <div className="mt-4 space-y-4">
                {music.has_sheet ? (
                  <>
                    <div className="border rounded-md p-4 flex items-center justify-center bg-gray-50 h-[600px]">
                      {music.sheet_pdf_url ? (
                        <iframe
                          src={`${music.sheet_pdf_url}#toolbar=0`}
                          className="w-full h-full"
                          title="曲谱预览"
                        />
                      ) : (
                        <FileText className="h-16 w-16 text-gray-400" />
                      )}
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={handleDownloadMusicXML}>
                        <FileText className="h-4 w-4 mr-2" />
                        下载曲谱(MusicXML)
                      </Button>
                      <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleDownloadPDF}>
                        <Download className="h-4 w-4 mr-2" />
                        下载曲谱(PDF)
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-60 bg-gray-50 rounded-md">
                    <FileMusic className="h-16 w-16 text-gray-300 mb-2" />
                    <p className="text-gray-500">这首音乐暂无曲谱</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
