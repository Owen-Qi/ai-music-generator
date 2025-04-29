export interface MusicItem {
  id: string
  title: string
  createdAt: string
  duration: string
  style: string
  isPublic: boolean
  audioUrl?: string
  description?: string
  hasSheet?: boolean
  lyrics?: string
  instruments?: {
    vocal?: string
    guitar?: string
    piano?: string
    bass?: string
    drums?: string
  }
  sheetUrl?: string
}

// 示例音乐库数据
export const exampleMusicLibrary: MusicItem[] = [
  {
    id: "music-1",
    title: "夏日微风",
    createdAt: "2025-04-20T09:12:43.511Z",
    duration: "2:47",
    style: "流行",
    isPublic: true,
    audioUrl: "https://example.com/music/summer-breeze.mp3",
    description: "一首轻快的流行歌曲，带有明亮的钢琴和温暖的声音，适合夏日早晨。灵感来源于海边的微风和阳光。",
    hasSheet: true,
    lyrics:
      "阳光照耀海面\n微风轻抚脸颊\n这个夏日如此美好\n让我们一起感受这份温暖\n\n蓝天白云相伴\n海浪轻声歌唱\n这个夏日如此自由\n让我们一起拥抱这份快乐",
    instruments: {
      vocal: "https://example.com/music/summer-breeze-vocal.mp3",
      guitar: "https://example.com/music/summer-breeze-guitar.mp3",
      piano: "https://example.com/music/summer-breeze-piano.mp3",
      bass: "https://example.com/music/summer-breeze-bass.mp3",
      drums: "https://example.com/music/summer-breeze-drums.mp3",
    },
    sheetUrl: "https://example.com/sheets/summer-breeze.pdf",
  },
  {
    id: "music-2",
    title: "城市霓虹",
    createdAt: "2025-04-18T15:23:12.340Z",
    duration: "3:15",
    style: "电子",
    isPublic: false,
    audioUrl: "https://example.com/music/city-neon.mp3",
    description: "深沉的电子音乐，带有强烈的低音和逐渐增强的节奏，适合科幻电影场景。灵感来源于未来城市的霓虹灯光。",
    hasSheet: false,
    instruments: {
      piano: "https://example.com/music/city-neon-piano.mp3",
      bass: "https://example.com/music/city-neon-bass.mp3",
      drums: "https://example.com/music/city-neon-drums.mp3",
    },
  },
  {
    id: "music-3",
    title: "雨夜爵士",
    createdAt: "2025-04-15T20:05:34.123Z",
    duration: "4:32",
    style: "爵士",
    isPublic: true,
    audioUrl: "https://example.com/music/rainy-jazz.mp3",
    description: "一首情感丰富的爵士乐，带有忧伤的萨克斯风和钢琴旋律，适合雨夜聆听。",
    hasSheet: true,
    lyrics:
      "雨滴敲打窗台\n爵士乐在耳边回荡\n这个夜晚如此安静\n让我们一起聆听这份忧伤\n\n城市的灯光模糊\n思绪随着音符飘扬\n这个夜晚如此深邃\n让我们一起感受这份情感",
    instruments: {
      vocal: "https://example.com/music/rainy-jazz-vocal.mp3",
      guitar: "https://example.com/music/rainy-jazz-guitar.mp3",
      piano: "https://example.com/music/rainy-jazz-piano.mp3",
      bass: "https://example.com/music/rainy-jazz-bass.mp3",
      drums: "https://example.com/music/rainy-jazz-drums.mp3",
    },
    sheetUrl: "https://example.com/sheets/rainy-jazz.pdf",
  },
  {
    id: "music-4",
    title: "星空漫步",
    createdAt: "2025-04-10T14:45:19.721Z",
    duration: "3:05",
    style: "环境音",
    isPublic: true,
    audioUrl: "https://example.com/music/starry-walk.mp3",
    description: "平静舒缓的环境音乐，带有空灵的合成器和轻柔的钢琴，适合冥想和放松。灵感来源于夜晚的星空。",
    hasSheet: false,
    instruments: {
      piano: "https://example.com/music/starry-walk-piano.mp3",
      bass: "https://example.com/music/starry-walk-bass.mp3",
    },
  },
  {
    id: "music-5",
    title: "山间回响",
    createdAt: "2025-04-05T11:30:50.890Z",
    duration: "2:58",
    style: "民谣",
    isPublic: false,
    audioUrl: "https://example.com/music/mountain-echo.mp3",
    description: "温暖自然的民谣，带有木吉他和口琴，讲述山间生活的故事。",
    hasSheet: true,
    lyrics:
      "山间的风吹过树梢\n鸟儿在枝头歌唱\n这里的生活如此简单\n让我们一起感受这份宁静\n\n溪水流过石头\n阳光透过树叶\n这里的时光如此缓慢\n让我们一起珍惜这份美好",
    instruments: {
      vocal: "https://example.com/music/mountain-echo-vocal.mp3",
      guitar: "https://example.com/music/mountain-echo-guitar.mp3",
      bass: "https://example.com/music/mountain-echo-bass.mp3",
    },
    sheetUrl: "https://example.com/sheets/mountain-echo.pdf",
  },
  {
    id: "music-6",
    title: "电影剧情",
    createdAt: "2025-04-01T17:22:08.456Z",
    duration: "5:12",
    style: "电影配乐",
    isPublic: true,
    audioUrl: "https://example.com/music/cinematic-drama.mp3",
    description: "宏大壮观的电影配乐，带有管弦乐和鼓点，适合史诗场景。灵感来源于科幻冒险电影。",
    hasSheet: true,
    instruments: {
      piano: "https://example.com/music/cinematic-drama-piano.mp3",
      guitar: "https://example.com/music/cinematic-drama-guitar.mp3",
      bass: "https://example.com/music/cinematic-drama-bass.mp3",
      drums: "https://example.com/music/cinematic-drama-drums.mp3",
    },
    sheetUrl: "https://example.com/sheets/cinematic-drama.pdf",
  },
  {
    id: "music-7",
    title: "清晨旋律",
    createdAt: "2025-03-28T08:14:23.321Z",
    duration: "3:40",
    style: "古典",
    isPublic: false,
    audioUrl: "https://example.com/music/morning-melody.mp3",
    description: "优雅的古典钢琴曲，带有轻柔的弦乐伴奏，适合早晨聆听。灵感来源于日出时的宁静时刻。",
    hasSheet: true,
    instruments: {
      piano: "https://example.com/music/morning-melody-piano.mp3",
    },
    sheetUrl: "https://example.com/sheets/morning-melody.pdf",
  },
  {
    id: "music-8",
    title: "城市节拍",
    createdAt: "2025-03-22T16:18:41.654Z",
    duration: "2:34",
    style: "嘻哈",
    isPublic: true,
    audioUrl: "https://example.com/music/urban-beat.mp3",
    description: "充满活力的嘻哈音乐，带有强劲的节奏和贝斯，适合城市生活的节奏。",
    hasSheet: false,
    lyrics:
      "城市的节奏不停歇\n人们匆忙的脚步\n这里的生活如此快节奏\n让我们一起感受这份活力\n\n霓虹灯闪烁不停\n汽车喇叭此起彼伏\n这里的故事如此丰富\n让我们一起书写这份传奇",
    instruments: {
      vocal: "https://example.com/music/urban-beat-vocal.mp3",
      bass: "https://example.com/music/urban-beat-bass.mp3",
      drums: "https://example.com/music/urban-beat-drums.mp3",
    },
  },
  {
    id: "music-9",
    title: "摇滚激情",
    createdAt: "2025-03-17T21:09:12.890Z",
    duration: "4:15",
    style: "摇滚",
    isPublic: true,
    audioUrl: "https://example.com/music/rock-passion.mp3",
    description: "充满能量的摇滚音乐，带有强劲的吉他独奏和鼓点，适合释放激情。",
    hasSheet: true,
    lyrics:
      "点燃心中的火焰\n释放内心的激情\n这一刻如此炙热\n让我们一起感受这份能量\n\n吉他声撕裂黑夜\n鼓点震撼心灵\n这一刻如此自由\n让我们一起拥抱这份力量",
    instruments: {
      vocal: "https://example.com/music/rock-passion-vocal.mp3",
      guitar: "https://example.com/music/rock-passion-guitar.mp3",
      piano: "https://example.com/music/rock-passion-piano.mp3",
      bass: "https://example.com/music/rock-passion-bass.mp3",
      drums: "https://example.com/music/rock-passion-drums.mp3",
    },
    sheetUrl: "https://example.com/sheets/rock-passion.pdf",
  },
]
