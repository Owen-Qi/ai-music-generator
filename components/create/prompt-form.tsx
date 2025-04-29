"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function PromptForm({ prompt, setPrompt, error, onNext }) {
  const [charCount, setCharCount] = useState(0)
  const maxChars = 500

  useEffect(() => {
    setCharCount(prompt.length)
  }, [prompt])

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">描述您想要的音乐</h3>
        <p className="text-sm text-gray-500 mb-4">
          详细描述您想要的音乐风格、情感、乐器和用途。描述越详细，生成的音乐越符合您的期望。
        </p>
        <Textarea
          placeholder="例如：一首轻快的流行歌曲，带有明亮的钢琴和温暖的声音，适合夏日早晨..."
          className="min-h-[150px] resize-none"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          maxLength={maxChars}
        />
        <div className="flex justify-between mt-2">
          <span className={`text-xs ${charCount > maxChars * 0.8 ? "text-amber-500" : "text-gray-500"}`}>
            {charCount}/{maxChars}
          </span>
          <span className="text-xs text-gray-500">最少10个字符</span>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex justify-end">
        <Button onClick={onNext} disabled={prompt.length < 10} className="bg-purple-600 hover:bg-purple-700">
          下一步
        </Button>
      </div>
    </div>
  )
}
