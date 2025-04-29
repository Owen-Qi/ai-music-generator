export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-16 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight">用户评价</h2>
          <p className="text-gray-500 mt-4 max-w-md mx-auto">看看其他创作者如何使用AI音乐创作家</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {/* 评价1 */}
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                <UserIcon className="h-5 w-5 text-gray-500" />
              </div>
              <div>
                <h4 className="font-semibold">张明</h4>
                <p className="text-sm text-gray-500">独立电影制作人</p>
              </div>
            </div>
            <div className="flex mb-4">
              <StarIcon className="h-5 w-5 text-yellow-400" />
              <StarIcon className="h-5 w-5 text-yellow-400" />
              <StarIcon className="h-5 w-5 text-yellow-400" />
              <StarIcon className="h-5 w-5 text-yellow-400" />
              <StarIcon className="h-5 w-5 text-yellow-400" />
            </div>
            <p className="text-gray-600">
              "作为一名独立电影制作人，预算一直是我的痛点。AI音乐创作家让我能够为我的短片创作专业级别的配乐，节省了大量成本，同时保持了作品的艺术质量。"
            </p>
          </div>

          {/* 评价2 */}
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                <UserIcon className="h-5 w-5 text-gray-500" />
              </div>
              <div>
                <h4 className="font-semibold">李华</h4>
                <p className="text-sm text-gray-500">游戏开发者</p>
              </div>
            </div>
            <div className="flex mb-4">
              <StarIcon className="h-5 w-5 text-yellow-400" />
              <StarIcon className="h-5 w-5 text-yellow-400" />
              <StarIcon className="h-5 w-5 text-yellow-400" />
              <StarIcon className="h-5 w-5 text-yellow-400" />
              <StarIcon className="h-5 w-5 text-yellow-400" />
            </div>
            <p className="text-gray-600">
              "我的独立游戏需要大量不同场景的背景音乐，AI音乐创作家完美解决了这个问题。只需描述场景氛围，几分钟内就能生成符合要求的音乐，极大提高了开发效率。"
            </p>
          </div>

          {/* 评价3 */}
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                <UserIcon className="h-5 w-5 text-gray-500" />
              </div>
              <div>
                <h4 className="font-semibold">王芳</h4>
                <p className="text-sm text-gray-500">内容创作者</p>
              </div>
            </div>
            <div className="flex mb-4">
              <StarIcon className="h-5 w-5 text-yellow-400" />
              <StarIcon className="h-5 w-5 text-yellow-400" />
              <StarIcon className="h-5 w-5 text-yellow-400" />
              <StarIcon className="h-5 w-5 text-yellow-400" />
              <StarIcon className="h-5 w-5 text-gray-300" />
            </div>
            <p className="text-gray-600">
              "我每周需要制作多个视频，找到无版权的背景音乐一直是个挑战。现在我可以根据视频内容生成完全原创的音乐，不仅提升了视频质量，还避免了版权问题。"
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function UserIcon(props) {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}
