"use client"

import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

const musicStyles = [
  {
    id: "pop",
    name: "流行",
    description: "现代流行音乐，适合广泛听众",
    icon: "🎵",
  },
  {
    id: "rock",
    name: "摇滚",
    description: "强劲的吉他和鼓点，充满能量",
    icon: "🎸",
  },
  {
    id: "electronic",
    name: "电子",
    description: "合成器和电子节拍，现代感强",
    icon: "🎧",
  },
  {
    id: "classical",
    name: "古典",
    description: "优雅的管弦乐和钢琴，情感丰富",
    icon: "🎻",
  },
  {
    id: "jazz",
    name: "爵士",
    description: "即兴演奏和复杂和声，成熟优雅",
    icon: "🎷",
  },
  {
    id: "hiphop",
    name: "嘻哈",
    description: "强劲节奏和说唱元素，节奏感强",
    icon: "🎤",
  },
  {
    id: "ambient",
    name: "环境音",
    description: "平静舒缓的背景音乐，适合放松",
    icon: "🌊",
  },
  {
    id: "folk",
    name: "民谣",
    description: "传统乐器和叙事歌词，温暖自然",
    icon: "🪕",
  },
  {
    id: "cinematic",
    name: "电影配乐",
    description: "宏大壮观，适合视频和影片",
    icon: "🎬",
  },
]

export default function StyleSelector({ selectedStyle, setSelectedStyle, onNext, onBack }) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">选择音乐风格</h3>
        <p className="text-sm text-gray-500 mb-4">选择一种主要音乐风格，AI将根据您的描述和选择的风格生成音乐。</p>

        <RadioGroup
          value={selectedStyle}
          onValueChange={setSelectedStyle}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {musicStyles.map((style) => (
            <div key={style.id}>
              <RadioGroupItem value={style.id} id={style.id} className="peer sr-only" />
              <Label
                htmlFor={style.id}
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 hover:border-gray-200 peer-data-[state=checked]:border-purple-600 peer-data-[state=checked]:bg-purple-50 [&:has([data-state=checked])]:border-purple-600 [&:has([data-state=checked])]:bg-purple-50 cursor-pointer"
              >
                <div className="text-2xl mb-2">{style.icon}</div>
                <div className="font-semibold">{style.name}</div>
                <div className="text-xs text-gray-500 text-center mt-1">{style.description}</div>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          上一步
        </Button>
        <Button onClick={onNext} disabled={!selectedStyle} className="bg-purple-600 hover:bg-purple-700">
          下一步
        </Button>
      </div>
    </div>
  )
}
