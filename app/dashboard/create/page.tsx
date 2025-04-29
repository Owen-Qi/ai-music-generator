"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import DashboardHeader from "@/components/layout/dashboard-header"
import GenerationStatus from "@/components/create/generation-status"
import MusicPreview from "@/components/create/music-preview"
import { Button } from "@/components/ui/button"
import { ArrowLeft, HelpCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Sparkles } from "lucide-react"

export default function CreatePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("prompt")
  const [isCustomMode, setIsCustomMode] = useState(false)
  const [isInstrumentalOnly, setIsInstrumentalOnly] = useState(false)
  const [songTitle, setSongTitle] = useState("")
  const [aiGeneratingLyrics, setAiGeneratingLyrics] = useState(false)
  const [prompt, setPrompt] = useState("")
  const [selectedStyle, setSelectedStyle] = useState("")
  const [selectedVoice, setSelectedVoice] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [generatedMusic, setGeneratedMusic] = useState(null)
  const [generationError, setGenerationError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleGenerate = async () => {
    if (!prompt) {
      setGenerationError("请输入音乐描述")
      return
    }

    setIsGenerating(true)
    setGenerationError("")
    setGenerationProgress(0)

    try {
      const requestData = isCustomMode
        ? {
            prompt: prompt,
            tags: selectedStyle,
            mv: "chirp-v3-5",
            title: songTitle,
            make_instrumental: isInstrumentalOnly,
          }
        : {
            gpt_description_prompt: prompt,
            mv: "chirp-v3-5",
            make_instrumental: isInstrumentalOnly,
          }

      const response = await fetch("/api/submit/music/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      })

      if (!response.ok) {
        throw new Error("生成失败")
      }

      const data = await response.json()
      setGeneratedMusic(data)
    } catch (error) {
      setGenerationError("生成失败，请重试")
      console.error(error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleGenerateLyrics = async () => {
    if (!prompt) return

    setAiGeneratingLyrics(true)
    try {
      const response = await fetch("/api/submit/lyrics/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      })

      if (!response.ok) {
        throw new Error("生成歌词失败")
      }

      const data = await response.json()
      setPrompt(data.lyrics)
    } catch (error) {
      console.error("生成歌词失败:", error)
    } finally {
      setAiGeneratingLyrics(false)
    }
  }

  const handleReset = () => {
    setPrompt("")
    setSelectedStyle("")
    setSelectedVoice("")
    setGeneratedMusic(null)
    setGenerationError("")
    setActiveTab("prompt")
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    try {
      // TODO: 实现音乐生成逻辑
      console.log("开始生成音乐")
    } catch (error) {
      console.error("生成失败:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />
      <main className="flex-1 container py-6">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={() => router.push("/dashboard")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold">创建新音乐</h1>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <HelpCircle className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  描述您想要的音乐风格、情感和元素，AI将为您创作原创音乐。越详细的描述会产生越精确的结果。
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {generatedMusic ? (
          <div className="space-y-6">
            <MusicPreview music={generatedMusic} />
            <div className="flex gap-4 justify-end">
              <Button variant="outline" onClick={handleReset}>
                创建新音乐
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700">保存到我的作品</Button>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white rounded-lg border shadow-sm p-6">
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <Switch id="custom-mode" checked={isCustomMode} onCheckedChange={setIsCustomMode} />
                    <Label htmlFor="custom-mode">自定义模式</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="instrumental-only"
                      checked={isInstrumentalOnly}
                      onCheckedChange={setIsInstrumentalOnly}
                    />
                    <Label htmlFor="instrumental-only">纯音乐</Label>
                  </div>
                </div>

                <div className="space-y-4">
                  {isCustomMode && (
                    <div>
                      <Label htmlFor="song-title" className="text-sm font-medium mb-2 block">
                        音乐标题
                      </Label>
                      <Input
                        id="song-title"
                        placeholder="输入音乐标题..."
                        value={songTitle}
                        onChange={(e) => setSongTitle(e.target.value)}
                        className="mb-4"
                      />
                    </div>
                  )}

                  {!isCustomMode ? (
                    <div>
                      <Label htmlFor="description" className="text-sm font-medium mb-2 block">
                        音乐描述
                      </Label>
                      <Textarea
                        id="description"
                        placeholder="描述您想要的音乐风格、情感和元素..."
                        className="min-h-[200px] resize-none"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                      />
                    </div>
                  ) : !isInstrumentalOnly ? (
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <Label htmlFor="lyrics" className="text-sm font-medium">
                          歌词
                        </Label>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleGenerateLyrics}
                          disabled={aiGeneratingLyrics || !prompt}
                        >
                          {aiGeneratingLyrics ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              生成中...
                            </>
                          ) : (
                            <>
                              <Sparkles className="mr-2 h-4 w-4" />
                              AI生成歌词
                            </>
                          )}
                        </Button>
                      </div>
                      <Textarea
                        id="lyrics"
                        placeholder="输入歌词..."
                        className="min-h-[200px] resize-none"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                      />
                    </div>
                  ) : null}

                  {isCustomMode && (
                    <div>
                      <Label htmlFor="custom-style" className="text-sm font-medium mb-2 block">
                        音乐风格
                      </Label>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <Select value={selectedStyle} onValueChange={setSelectedStyle}>
                            <SelectTrigger>
                              <SelectValue placeholder="选择风格" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pop">流行</SelectItem>
                              <SelectItem value="rock">摇滚</SelectItem>
                              <SelectItem value="electronic">电子</SelectItem>
                              <SelectItem value="classical">古典</SelectItem>
                              <SelectItem value="jazz">爵士</SelectItem>
                              <SelectItem value="hiphop">嘻哈</SelectItem>
                              <SelectItem value="ambient">环境音</SelectItem>
                              <SelectItem value="folk">民谣</SelectItem>
                              <SelectItem value="cinematic">电影配乐</SelectItem>
                              <SelectItem value="custom">自定义</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        {selectedStyle === "custom" && (
                          <Input placeholder="输入自定义风格..." onChange={(e) => setSelectedStyle(e.target.value)} />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {isGenerating && (
                <div className="bg-white rounded-lg border shadow-sm p-6">
                  <GenerationStatus progress={generationProgress} />
                </div>
              )}

              <div className="flex justify-end">
                <Button
                  className="bg-purple-600 hover:bg-purple-700"
                  disabled={isGenerating || !prompt}
                  onClick={handleGenerate}
                >
                  {isGenerating ? "生成中..." : "开始生成"}
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-lg border shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">提示示例</h3>
                <div className="space-y-3">
                  <div
                    className="p-3 bg-gray-50 rounded-md cursor-pointer hover:bg-purple-50 transition-colors"
                    onClick={() => setPrompt("一首轻快的流行歌曲，带有明亮的钢琴和温暖的声音，适合夏日早晨")}
                  >
                    <p className="text-sm">一首轻快的流行歌曲，带有明亮的钢琴和温暖的声音，适合夏日早晨</p>
                  </div>
                  <div
                    className="p-3 bg-gray-50 rounded-md cursor-pointer hover:bg-purple-50 transition-colors"
                    onClick={() => setPrompt("深沉的电子音乐，带有强烈的低音和逐渐增强的节奏，适合科幻电影场景")}
                  >
                    <p className="text-sm">深沉的电子音乐，带有强烈的低音和逐渐增强的节奏，适合科幻电影场景</p>
                  </div>
                  <div
                    className="p-3 bg-gray-50 rounded-md cursor-pointer hover:bg-purple-50 transition-colors"
                    onClick={() => setPrompt("一首情感丰富的古典钢琴曲，带有忧伤的旋律和缓慢的节奏，表达思念之情")}
                  >
                    <p className="text-sm">一首情感丰富的古典钢琴曲，带有忧伤的旋律和缓慢的节奏，表达思念之情</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">提示技巧</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>描述音乐风格（流行、摇滚、古典、电子等）</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>提及特定乐器（钢琴、吉他、小提琴等）</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>描述情感和氛围（欢快、忧伤、紧张、放松等）</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>提及节奏和速度（快节奏、缓慢、渐强等）</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    <span>描述适合的场景或用途（电影配乐、冥想、派对等）</span>
                  </li>
                </ul>
              </div>

              <div className="bg-purple-50 rounded-lg border border-purple-100 p-6">
                <h3 className="text-lg font-semibold mb-2">本月剩余生成次数</h3>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold">12</span>
                  <span className="text-sm text-gray-500 mb-1">/ 50 次</span>
                </div>
                <div className="mt-4">
                  <div className="h-2 w-full bg-purple-100 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-600 rounded-full" style={{ width: "24%" }}></div>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-4">升级到专业版获取无限生成次数</p>
                <Button variant="outline" className="w-full mt-2">
                  升级方案
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
