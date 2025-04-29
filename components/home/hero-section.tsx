import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-white to-purple-50">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-purple-100 px-3 py-1 text-sm text-purple-800">
              AI驱动的音乐创作
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              用AI创造您的<span className="text-purple-600">专属音乐</span>
            </h1>
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              无需音乐理论知识，只需描述您想要的风格和情感，AI音乐创作家将为您生成专业品质的原创音乐。从电影配乐到个人创作，一切皆有可能。
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/login?register=true" passHref>
                <Button className="bg-purple-600 hover:bg-purple-700">免费开始创作</Button>
              </Link>
              <Link href="#features" passHref>
                <Button variant="outline">了解更多</Button>
              </Link>
            </div>
          </div>
          <div className="mx-auto lg:ml-auto flex justify-center">
            <div className="relative">
              <div className="absolute -left-4 -top-4 h-72 w-72 rounded-full bg-purple-200 blur-3xl opacity-70"></div>
              <div className="absolute -bottom-4 -right-4 h-72 w-72 rounded-full bg-blue-200 blur-3xl opacity-70"></div>
              <div className="relative rounded-xl overflow-hidden border shadow-lg">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="AI音乐创作界面展示"
                  className="object-cover w-full max-w-[600px]"
                  width={600}
                  height={400}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
