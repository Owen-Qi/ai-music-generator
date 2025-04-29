"use client"

import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

const voices = [
  {
    id: "none",
    name: "无人声",
    description: "纯音乐，没有人声",
  },
  {
    id: "male",
    name: "男声",
    description: "中低音域男声",
  },
  {
    id: "female",
    name: "女声",
    description: "中高音域女声",
  },
  {
    id: "duet",
    name: "二重唱",
    description: "男女声二重唱",
  },
  {
    id: "choir",
    name: "合唱",
    description: "多人合唱",
  },
]

export default function VoiceSelector({ selectedVoice, setSelectedVoice, onBack }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">选择声音类型</h3>
        <p className="text-sm text-gray-500 mb-4">选择是否需要人声以及人声类型。</p>

        <RadioGroup
          value={selectedVoice}
          onValueChange={setSelectedVoice}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {voices.map((voice) => (
            <div key={voice.id}>
              <RadioGroupItem value={voice.id} id={voice.id} className="peer sr-only" />
              <Label
                htmlFor={voice.id}
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 hover:border-gray-200 peer-data-[state=checked]:border-purple-600 peer-data-[state=checked]:bg-purple-50 [&:has([data-state=checked])]:border-purple-600 [&:has([data-state=checked])]:bg-purple-50 cursor-pointer"
              >
                <div className="font-semibold">{voice.name}</div>
                <div className="text-xs text-gray-500 text-center mt-1">{voice.description}</div>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">高级选项</h3>
          <div className="space-y-6 bg-gray-50 p-4 rounded-md">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="duration">音乐长度</Label>
                <span className="text-sm text-gray-500">30秒</span>
              </div>
              <Slider id="duration" defaultValue={[30]} max={180} min={15} step={15} />
              <div className="flex justify-between text-xs text-gray-500">
                <span>15秒</span>
                <span>3分钟</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="tempo">节奏速度</Label>
                <span className="text-sm text-gray-500">中等</span>
              </div>
              <Slider id="tempo" defaultValue={[50]} max={100} step={1} />
              <div className="flex justify-between text-xs text-gray-500">
                <span>慢</span>
                <span>快</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="energy">能量强度</Label>
                <span className="text-sm text-gray-500">中等</span>
              </div>
              <Slider id="energy" defaultValue={[50]} max={100} step={1} />
              <div className="flex justify-between text-xs text-gray-500">
                <span>平静</span>
                <span>强烈</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          上一步
        </Button>
      </div>
    </div>
  )
}
