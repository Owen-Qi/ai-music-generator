"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Download, Share2, Edit, Music } from "lucide-react"

export default function MusicPreview({ music }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(80)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef(null)

  // 在实际应用中，这里应该使用真实的音频文件
  // 这里我们模拟音频播放
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false)
            clearInterval(interval)
            return 0
          }
          return prev + 1
        })
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [isPlaying, duration])

  // 模拟设置音频时长
  useEffect(() => {
    // 将时长字符串转换为秒数
    const [minutes, seconds] = music.duration.split(":").map(Number)
    setDuration(minutes * 60 + seconds)
  }, [music])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
    // 在实际应用中，这里应该控制音频播放/暂停
  }

  const handleSeek = (value) => {
    setCurrentTime(value[0])
    // 在实际应用中，这里应该设置音频的当前时间
  }

  const handleVolumeChange = (value) => {
    setVolume(value[0])
    if (value[0] === 0) {
      setIsMuted(true)
    } else {
      setIsMuted(false)
    }
    // 在实际应用中，这里应该设置音频的音量
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    // 在实际应用中，这里应该设置音频的静音状态
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  // 生成音频波形图
  const generateWaveform = () => {
    const bars = []
    const barCount = 50

    for (let i = 0; i < barCount; i++) {
      // 生成随机高度，但中间部分高度较高
      let height
      if (i < barCount / 3 || i > (barCount / 3) * 2) {
        height = Math.random() * 50 + 10
      } else {
        height = Math.random() * 80 + 20
      }

      // 确定当前播放位置的颜色
      const isActive = (i / barCount) * duration <= currentTime

      bars.push(
        <div
          key={i}
          className={`w-1 rounded-full ${isActive ? "bg-purple-600" : "bg-gray-300"}`}
          style={{ height: `${height}%` }}
        ></div>,
      )
    }

    return bars
  }

  return (
    <div className="bg-white rounded-lg border shadow-sm p-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="h-16 w-16 bg-purple-100 rounded-md flex items-center justify-center">
          <Music className="h-8 w-8 text-purple-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold">{music.title}</h3>
          <p className="text-sm text-gray-500">生成于 {new Date(music.createdAt).toLocaleString()}</p>
        </div>
      </div>

      <div className="relative h-24 mb-4">
        <div className="absolute inset-0 flex items-center justify-between gap-0.5">{generateWaveform()}</div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm text-gray-500 w-10">{formatTime(currentTime)}</span>
        <Slider value={[currentTime]} max={duration} step={1} onValueChange={handleSeek} className="flex-1" />
        <span className="text-sm text-gray-500 w-10">{formatTime(duration)}</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <SkipBack className="h-5 w-5" />
          </Button>
          <Button onClick={togglePlay} className="h-12 w-12 rounded-full bg-purple-600 hover:bg-purple-700">
            {isPlaying ? <Pause className="h-5 w-5 text-white" /> : <Play className="h-5 w-5 text-white" />}
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <SkipForward className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleMute}>
            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </Button>
          <Slider
            value={[isMuted ? 0 : volume]}
            max={100}
            step={1}
            onValueChange={handleVolumeChange}
            className="w-24"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* 隐藏的音频元素 - 在实际应用中使用 */}
      <audio ref={audioRef} className="hidden" />
    </div>
  )
}
