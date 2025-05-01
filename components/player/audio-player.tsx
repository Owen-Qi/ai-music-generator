import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react"
import type { MusicItem } from "@/lib/api"

interface AudioPlayerProps {
  currentMusic: MusicItem | null
  onClose: () => void
}

export default function AudioPlayer({ currentMusic, onClose }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (currentMusic && audioRef.current) {
      setIsLoading(true)
      audioRef.current.src = currentMusic.audio_url
      audioRef.current.load()
      
      // 等待音频加载完成后再播放
      audioRef.current.oncanplaythrough = () => {
        setIsLoading(false)
        setIsPlaying(true)
        audioRef.current?.play().catch(error => {
          console.error('播放失败:', error)
          setIsPlaying(false)
        })
      }
    }
  }, [currentMusic])

  const togglePlay = async () => {
    if (!audioRef.current) return

    try {
      if (isPlaying) {
        await audioRef.current.pause()
      } else {
        await audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    } catch (error) {
      console.error('播放控制失败:', error)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleSliderChange = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0]
      setCurrentTime(value[0])
    }
  }

  const handleVolumeChange = (value: number[]) => {
    if (audioRef.current) {
      const newVolume = value[0]
      audioRef.current.volume = newVolume
      setVolume(newVolume)
      setIsMuted(newVolume === 0)
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume
        setIsMuted(false)
      } else {
        audioRef.current.volume = 0
        setIsMuted(true)
      }
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  if (!currentMusic) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-lg">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="flex items-center justify-between gap-8">
          {/* 左侧音乐信息 */}
          <div className="flex items-center gap-4 min-w-[200px]">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <img src={currentMusic.image_url} alt={currentMusic.title} className="w-full h-full object-cover rounded-lg" />
            </div>
            <div>
              <h3 className="font-medium">{currentMusic.title}</h3>
              <p className="text-sm text-gray-500">{currentMusic.tags}</p>
            </div>
          </div>

          {/* 中间播放控制区域 */}
          <div className="flex flex-col items-center gap-3 flex-1 max-w-2xl">
            <div className="flex items-center gap-6">
              <Button variant="ghost" size="icon">
                <SkipBack className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={togglePlay}
                disabled={isLoading}
                className="h-12 w-12"
              >
                {isLoading ? (
                  <div className="h-6 w-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
                ) : isPlaying ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6" />
                )}
              </Button>
              <Button variant="ghost" size="icon">
                <SkipForward className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex items-center gap-3 w-full">
              <span className="text-sm text-gray-500 min-w-[40px]">{formatTime(currentTime)}</span>
              <Slider
                value={[currentTime]}
                max={duration}
                step={1}
                onValueChange={handleSliderChange}
                className="flex-1"
                disabled={isLoading}
              />
              <span className="text-sm text-gray-500 min-w-[40px]">{formatTime(duration)}</span>
            </div>
          </div>

          {/* 右侧音量控制 */}
          <div className="flex items-center gap-3 min-w-[150px] justify-end">
            <Button variant="ghost" size="icon" onClick={toggleMute}>
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </Button>
            <Slider
              value={[isMuted ? 0 : volume]}
              max={1}
              step={0.1}
              onValueChange={handleVolumeChange}
              className="w-24"
            />
          </div>
        </div>
      </div>
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
        onError={(e) => {
          console.error('音频加载错误:', e)
          setIsLoading(false)
        }}
      />
    </div>
  )
} 