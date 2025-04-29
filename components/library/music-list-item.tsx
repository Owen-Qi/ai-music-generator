"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Music, Play, Pause, Edit, Download, Share2, Trash2, MoreHorizontal } from "lucide-react"
import { formatDate } from "@/lib/utils"
import type { MusicItem } from "@/lib/data"

interface MusicListItemProps {
  music: MusicItem
}

export default function MusicListItem({ music }: MusicListItemProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  const togglePlay = () => {
    // 实际应用中，这里会控制真正的音频播放
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="border rounded-lg p-4 flex items-center gap-4 bg-white transition-all hover:shadow-md">
      <div
        className="h-12 w-12 flex-shrink-0 bg-purple-100 rounded-md flex items-center justify-center cursor-pointer"
        onClick={togglePlay}
      >
        {isPlaying ? <Pause className="h-6 w-6 text-purple-600" /> : <Music className="h-6 w-6 text-purple-600" />}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="font-semibold truncate">{music.title}</h3>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-500">
          <span>{formatDate(music.createdAt)}</span>
          <span>•</span>
          <span>{music.duration}</span>
          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">{music.style}</Badge>
          {music.isPublic && (
            <Badge variant="outline" className="text-xs">
              公开
            </Badge>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant={isPlaying ? "default" : "outline"}
          size="sm"
          className={isPlaying ? "bg-purple-600 hover:bg-purple-700" : ""}
          onClick={togglePlay}
        >
          {isPlaying ? <Pause className="h-3 w-3 mr-1" /> : <Play className="h-3 w-3 mr-1" />}
          <span className="hidden sm:inline">{isPlaying ? "暂停" : "播放"}</span>
        </Button>

        <Button variant="outline" size="sm" className="hidden sm:flex">
          <Edit className="h-3 w-3 mr-1" />
          编辑
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>操作</DropdownMenuLabel>
            <DropdownMenuItem className="sm:hidden">
              <Edit className="h-4 w-4 mr-2" />
              编辑
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Download className="h-4 w-4 mr-2" />
              下载
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Share2 className="h-4 w-4 mr-2" />
              分享
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50">
              <Trash2 className="h-4 w-4 mr-2" />
              删除
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
