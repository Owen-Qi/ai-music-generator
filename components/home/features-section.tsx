export default function FeaturesSection() {
  return (
    <section id="features" className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight">强大功能，简单操作</h2>
          <p className="text-gray-500 mt-4 max-w-md mx-auto">我们的AI音乐生成技术让音乐创作变得前所未有的简单</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* 特点1 */}
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg border shadow-sm">
            <div className="p-3 rounded-full bg-purple-100 mb-4">
              <MicIcon className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">文本生成音乐</h3>
            <p className="text-gray-500">只需输入文字描述，AI将理解您的意图并创作出符合您期望的音乐作品</p>
          </div>

          {/* 特点2 */}
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg border shadow-sm">
            <div className="p-3 rounded-full bg-purple-100 mb-4">
              <SlidersIcon className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">多样风格调整</h3>
            <p className="text-gray-500">从古典到电子，从爵士到摇滚，支持多种音乐风格和情感调整</p>
          </div>

          {/* 特点3 */}
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg border shadow-sm">
            <div className="p-3 rounded-full bg-purple-100 mb-4">
              <LayersIcon className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">多轨编辑</h3>
            <p className="text-gray-500">分离人声、乐器和节奏，单独编辑每个音轨，打造完美音乐作品</p>
          </div>

          {/* 特点4 */}
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg border shadow-sm">
            <div className="p-3 rounded-full bg-purple-100 mb-4">
              <DownloadIcon className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">高质量导出</h3>
            <p className="text-gray-500">支持多种格式导出，包括MP3、WAV和FLAC，满足不同场景需求</p>
          </div>

          {/* 特点5 */}
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg border shadow-sm">
            <div className="p-3 rounded-full bg-purple-100 mb-4">
              <RefreshCwIcon className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">实时迭代</h3>
            <p className="text-gray-500">不满意？只需简单调整参数，AI将立即生成新版本，直到您满意为止</p>
          </div>

          {/* 特点6 */}
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg border shadow-sm">
            <div className="p-3 rounded-full bg-purple-100 mb-4">
              <ShieldIcon className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">版权保障</h3>
            <p className="text-gray-500">所有生成的音乐均为原创，您拥有完整版权，可用于商业项目</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function MicIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  )
}

function SlidersIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="4" y1="21" y2="14" />
      <line x1="4" x2="4" y1="10" y2="3" />
      <line x1="12" x2="12" y1="21" y2="12" />
      <line x1="12" x2="12" y1="8" y2="3" />
      <line x1="20" x2="20" y1="21" y2="16" />
      <line x1="20" x2="20" y1="12" y2="3" />
      <line x1="2" x2="6" y1="14" y2="14" />
      <line x1="10" x2="14" y1="8" y2="8" />
      <line x1="18" x2="22" y1="16" y2="16" />
    </svg>
  )
}

function LayersIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  )
}

function DownloadIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  )
}

function RefreshCwIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 2v6h6" />
      <path d="M21 12A9 9 0 0 0 6 5.3L3 8" />
      <path d="M21 22v-6h-6" />
      <path d="M3 12a9 9 0 0 0 15 6.7l3-2.7" />
    </svg>
  )
}

function ShieldIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    </svg>
  )
}
