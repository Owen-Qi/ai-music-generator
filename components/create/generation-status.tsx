import { Progress } from "@/components/ui/progress"

export default function GenerationStatus({ progress }) {
  // 根据进度显示不同的状态消息
  const getStatusMessage = () => {
    if (progress < 25) {
      return "分析您的描述并确定音乐风格..."
    } else if (progress < 50) {
      return "创作旋律和和声结构..."
    } else if (progress < 75) {
      return "添加乐器和音效..."
    } else {
      return "最终混音和处理..."
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">生成中...</h3>
      <Progress value={progress} className="h-2" />
      <p className="text-sm text-gray-500">{getStatusMessage()}</p>
      <div className="flex items-center justify-center p-6">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 rounded-full border-4 border-purple-100"></div>
          <div
            className="absolute inset-0 rounded-full border-4 border-purple-600 animate-spin"
            style={{
              borderTopColor: "transparent",
              borderLeftColor: "transparent",
              animationDuration: "2s",
            }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold text-purple-600">{progress}%</span>
          </div>
        </div>
      </div>
      <p className="text-xs text-center text-gray-500">AI正在创作您的音乐，这可能需要几分钟时间。请耐心等待...</p>
    </div>
  )
}
