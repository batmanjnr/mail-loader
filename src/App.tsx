import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import FallingHearts from "./components/FallingHearts";
import { 
  Heart, 
  Sparkles, 
  Star, 
  Smile, 
  Coffee, 
  Compass, 
  Volume2, 
  ChevronLeft, 
  ChevronRight, 
  Pause, 
  Play, 
  X, 
  Maximize2, 
  ArrowRight,
  Clock,
  Phone,
  MessageCircle,
  Award,
  BookOpen,
  Send,
  Sparkle
} from "lucide-react";
import mainpicture from '../public/mainpicture.JPG'
import videocall from '../public/VIDEO CALL.PNG'
import throwback from "../public/throw.jpg"
// Types
interface Quality {
  id: string;
  icon: string;
  title: string;
  desc: string;
  color: string;
}

interface LoveItem {
  id: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
}

interface TimelineEvent {
  year: string;
  title: string;
  desc: string;
  icon: string;
}

interface MemoryPhoto {
  id: string;
  url: string;
  caption: string;
  date: string;
}

interface AmazingReason {
  id: string;
  icon: string;
  title: string;
  desc: string;
  glowColor: string;
}

interface Quote {
  id: string;
  text: string;
  author: string;
}

interface OpenWhenMessage {
  id: string;
  trigger: string;
  icon: string;
  title: string;
  message: string;
  theme: string;
}

interface StarWish {
  id: string;
  top: string;
  left: string;
  size: number;
  message: string;
}

// 1. Dataset Constants
const SLIDESHOW_IMAGES = [
  {
    url: "/public/mainpicture.JPG",
    caption: "Golden hour skies, reminding me of your bright energy ✨"
  },
  {
    url: "https://images.unsplash.com/photo-1522748906645-95d8adfd52c7?w=800&auto=format&fit=crop&q=80",
    caption: "Spring blossoms under a peaceful pastel canopy 🌸"
  },
  {
    url: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop&q=80",
    caption: "Warm, cozy cups of morning comfort shared ☕"
  },
  {
    url: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=800&auto=format&fit=crop&q=80",
    caption: "Midnight stars shining down to guide your path 🌌"
  },
  {
    url: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=800&auto=format&fit=crop&q=80",
    caption: "Scenic peaceful hikes filled with laughter and steps 🌿"
  }
];

const QUALITIES: Quality[] = [
  {
    id: "q-1",
    icon: "❤️",
    title: "Kind-hearted",
    desc: "You consistently put others first with genuine warmth, radiating soft empathy to everyone around you.",
    color: "bg-[#FFF0F5] text-pink-600 border-pink-200"
  },
  {
    id: "q-2",
    icon: "🌸",
    title: "Beautiful Soul",
    desc: "Your inner light is brilliant, bringing positive perspective even during the heaviest storms.",
    color: "bg-[#FFF5EE] text-amber-600 border-amber-200"
  },
  {
    id: "q-3",
    icon: "🌞",
    title: "Positive Energy",
    desc: "A true walking sunshine! You light up any gloomy room and fill the workspace with endless cheer.",
    color: "bg-[#FFFFF0] text-yellow-600 border-yellow-200"
  },
  {
    id: "q-4",
    icon: "🌙",
    title: "Great Listener",
    desc: "You make space for silent pauses and heavy hearts, offering comfort and understanding without any judgment.",
    color: "bg-[#F0F8FF] text-blue-600 border-blue-200"
  },
  {
    id: "q-5",
    icon: "🌟",
    title: "Inspirational",
    desc: "Your unwavering resilience and passion inspire me daily to stay authentic and embrace creative dreams.",
    color: "bg-[#F5F5FS] text-purple-600 border-purple-200"
  },
  {
    id: "q-6",
    icon: "🤍",
    title: "Genuine",
    desc: "No pretenses, no masks. Your pure honesty and radiant truth are the most refreshing gifts in this noisy world.",
    color: "bg-[#F9F9F9] text-gray-600 border-gray-200"
  }
];

const LOVE_ITEMS: LoveItem[] = [
  {
    id: "love-1",
    title: "Your beautiful smile",
    desc: "It has this magical, contagious quality that immediately lifts my mood and brightens up the entire room.",
    icon: <Smile className="w-5 h-5 text-[#FF69B4]" />
  },
  {
    id: "love-2",
    title: "Your delightful laugh",
    desc: "A bright, musical sound that perfectly echoes your inner happiness and brings lighthearted cozy vibes.",
    icon: <Sparkles className="w-5 h-5 text-[#FF69B4]" />
  },
  {
    id: "love-3",
    title: "Your unwavering honesty",
    desc: "I can always count on your truthful guidance and pure perspective, keeping us anchored and safe.",
    icon: <Compass className="w-5 h-5 text-[#FF69B4]" />
  },
  {
    id: "love-4",
    title: "Your gentle kindness",
    desc: "The organic, soft way you look out for others and make them feel safe and warm inside.",
    icon: <Heart className="w-5 h-5 text-[#FF69B4]" />
  },
  {
    id: "love-5",
    title: "How you support my dreams",
    desc: "You are always cheering me on from the front row, giving me confidence whenever doubts creep in.",
    icon: <Award className="w-5 h-5 text-[#FF69B4]" />
  },
  {
    id: "love-6",
    title: "Your quiet, deep patience",
    desc: "Even during messy, chaotic times, you remain a peaceful presence, helping me think clearly.",
    icon: <Clock className="w-5 h-5 text-[#FF69B4]" />
  }
];

const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: "2025",
    title: "The Day We Met",
    desc: "we met at my first program at Ore Ofe Baptist Church.",
    icon: "👋"
  },
  {
    year: "First Spark",
    title: "Our First Real Conversation",
    desc: "We talked for hours about everything and nothing. even when i cant forget u were crushing on me then.",
    icon: "💬"
  },
  {
    year: "Inside Jokes",
    title: "Laughter Nobody Else Understands",
    desc: "Building a private language of humor. Random words that immediately send us into fits of giggles.",
    icon: "😂"
  },
  {
    year: "Today",
    title: "Forever Grateful For You",
    desc: "Years of loyalty, growth, and priceless support. Hand in hand, cheering for each other's success.",
    icon: "💖"
  }
];

const MEMORIES = [
  {
    id: "mem-1",
    type: "video",
    url: "/public/SELFIE.MP4", // Replace with the actual video file in the public folder
    caption: "A beautiful sunset captured on video."
  },
  {
    id: "mem-2",
    type: "video",
    url: "/public/dance.MP4", // Replace with the actual video file in the public folder
    caption: "A fun day at my side."
  },
  {
    id: "mem-3",
    type: "video",
    url: "/public/cutie.MP4", // Replace with the actual video file in the public folder
    caption: "Fine Girl."
  },
  {
    id: "mem-4",
    type: "image",
    url: "/public/church.jpg", // Replace with the actual image file in the public folder
    caption: "A serene mountain view."
  },
  {
    id: "mem-5",
    type: "image",
    url: "/public/house1.jpg", // Replace with the actual image file in the public folder
    caption: "A delicious homemade meal."
  },
  {
    id: "mem-5",
    type: "image",
    url: "/public/house2.jpg", // Replace with the actual image file in the public folder
    caption: "A delicious homemade meal."
  }
];

const AMAZING_REASONS: AmazingReason[] = [
  {
    id: "ar-1",
    icon: "❤️",
    title: "Your Kindness",
    desc: "You consistently reach out to lift others up, holding doorways and heavy hearts open with quiet poise.",
    glowColor: "hover:shadow-[0_0_20px_rgba(244,63,94,0.35)]"
  },
  {
    id: "ar-2",
    icon: "😊",
    title: "Your Smile",
    desc: "It has a quiet strength, instantly validating happiness and reminding me that things will work out.",
    glowColor: "hover:shadow-[0_0_20px_rgba(251,191,36,0.35)]"
  },
  {
    id: "ar-3",
    icon: "🌸",
    title: "Your Heart",
    desc: "Pure gold. You never hold grudges, choose compassion over pride, and live with deep sincerity.",
    glowColor: "hover:shadow-[0_0_20px_rgba(236,72,153,0.35)]"
  },
  {
    id: "ar-4",
    icon: "😂",
    title: "Your Humor",
    desc: "Witty, delightfully goofy, and perfectly matched to make me giggle when I'm feeling stressed.",
    glowColor: "hover:shadow-[0_0_20px_rgba(16,185,129,0.35)]"
  },
  {
    id: "ar-5",
    icon: "🌈",
    title: "Your Positivity",
    desc: "You find the beautiful silver lining in messy situations, gently pointing us back towards hope.",
    glowColor: "hover:shadow-[0_0_20px_rgba(59,130,246,0.35)]"
  },
  {
    id: "ar-6",
    icon: "✨",
    title: "Your Presence",
    desc: "Just knowing you are in my life makes this big world feel a hundred times safer, cozier, and brighter.",
    glowColor: "hover:shadow-[0_0_20px_rgba(139,92,246,0.35)]"
  }
];

const QUOTES: Quote[] = [
  {
    id: "qt-1",
    text: "You are entirely enough. Just as you are, in this exact moment, you bring beautiful meaning to this life.",
    author: "Gentle Reminder"
  },
  {
    id: "qt-2",
    text: "You are deeply appreciated. Even when you are silent or resting, your presence is highly valued by those who love you.",
    author: "Quiet Truth"
  },
  {
    id: "qt-3",
    text: "You deserve infinite happiness, peaceful mornings, soft laughter, and comforting cups of tea.",
    author: "Daily Blessing"
  },
  {
    id: "qt-4",
    text: "You make life brighter without even trying. Thank you for just being yourself, always.",
    author: "Heartfelt note"
  }
];

const OPEN_WHEN_MESSAGES: OpenWhenMessage[] = [
  {
    id: "ow-sad",
    trigger: "💔 When you're sad",
    icon: "🌧️",
    title: "For the gloomy days...",
    message: "Hey sweet human. I am so sorry today feels heavy. Please remember that it's okay to not be okay. Close your eyes, take three deep, slow breaths, and wrap yourself in a cozy blanket. You are incredibly strong, but you don't have to carry the whole world today. I am right here cheering for you, always a text away. This heavy rain will pass, and the sun will shine on your beautiful face again. 🌸",
    theme: "from-[#FFB6C1] to-[#FFC0CB] text-[#7F2B3A]"
  },
  {
    id: "ow-happy",
    trigger: "😄 When you're happy",
    icon: "☀️",
    title: "Let's celebrate the light!",
    message: "Yay! Your happiness is my absolute favorite thing in the universe! Keep smiling, capture this gorgeous feeling in your heart, and spread your sunny energy around. Tell me what made you laugh today! Let's bottles up this happy vibe so we can remember it forever. Sending you the biggest, happiest high-five! 🌟",
    theme: "from-[#FFE4E1] to-[#FFF0F5] text-amber-800"
  },
  {
    id: "ow-overthinking",
    trigger: "😞 When you're overthinking",
    icon: "🌀",
    title: "Breathe in, let go...",
    message: "Breathe. Your mind is currently playing tricks on you, weaving scenarios that do not exist. You cannot control tomorrow, but you can control this sweet present moment. You have handled every single difficult thing in your past beautifully. Let go of the tight shoulders, unclench your jaw, and let my words anchor you: you are safe, you are loved, and everything will align just fine. 🤍",
    theme: "from-blue-50 to-pink-50 text-blue-900"
  },
  {
    id: "ow-miss",
    trigger: "🥺 When you miss me",
    icon: "✉️",
    title: "A warm virtual hug!",
    message: "I miss you too! Distance is just a minor number when our hearts are completely synchronized. Every time you miss me, look up at the sky or star-hop. Remember that we share the same sky and the same beautiful memories. I'm sending you a massive, cozy virtual bear hug. Let's make plans to meet up real soon for coffees and endless chatter! ☕✨",
    theme: "from-rose-50 to-pink-100 text-rose-800"
  },
  {
    id: "ow-motivation",
    trigger: "🌟 When you need motivation",
    icon: "🔥",
    title: "You are capable of amazing things!",
    message: "Listen to me: you are brilliant, creative, and fully capable of conquering whatever goal you set your eyes on. Do not let tiny setbacks or fears dim your magnificent spark. Take one small, courageous step right now. You have this beautiful mind, a golden heart, and my unconditional support. Now go out there and show the world how brilliant you are! 🚀💖",
    theme: "from-[#FF69B4] to-[#FFB6C1] text-white"
  }
];

const STAR_WISHES: StarWish[] = [
  { id: "sw-1", top: "15%", left: "12%", size: 4, message: "May you always walk with confidence and peace. ✨" },
  { id: "sw-2", top: "28%", left: "75%", size: 6, message: "Your future is incredibly bright and full of wonderful surprises. 🌟" },
  { id: "sw-3", top: "45%", left: "20%", size: 5, message: "May you never forget how loved and appreciated you are. 💖" },
  { id: "sw-4", top: "60%", left: "85%", size: 4, message: "A peaceful mind and a happy heart belong to you. 🍃" },
  { id: "sw-5", top: "72%", left: "42%", size: 5, message: "May your sweet, creative ideas change the world. 🌸" },
  { id: "sw-6", top: "82%", left: "15%", size: 6, message: "Always stay authentic, true, and amazingly you. 🤍" }
];

// Shola Allyson Inspired Melodic Sequences (Yoruba Soul & Folk)
const SONG_EJI_OWURO = "/public/sola1.mp3"

const SONG_IFE_GBONAN = [
  220.00, 261.63, 329.63, 293.66, 329.63, 392.00, 329.63, 261.63,
  220.00, 293.66, 392.00, 440.00, 392.00, 329.63, 261.63, 220.00
];

export default function App() {
  // Page Navigation States
  const [progress, setProgress] = useState(1);
  const [isMailChecked, setIsMailChecked] = useState(false);

  // Solar Allyson Disc Synthesizer States
  const [playingSong, setPlayingSong] = useState<"song1" | "song2" | null>(null);
  const synthIntervalRef = useRef<any>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Slideshow States
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSlideshowPlaying, setIsSlideshowPlaying] = useState(true);

  // Interactive Lightbox (Favorite Memories)
  const [activePhoto, setActivePhoto] = useState<MemoryPhoto | null>(null);

  // Interactive "Open When" Modal Message
  const [activeModalMessage, setActiveModalMessage] = useState<OpenWhenMessage | null>(null);

  // Handwritten Letter Toggles
  const [letterTypewriterActive, setLetterTypewriterActive] = useState(false);
  const letterRef = useRef<HTMLDivElement>(null);

  // Surprise section state
  const [surpriseClicked, setSurpriseClicked] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; left: number; delay: number }[]>([]);

  // Wish upon a star state
  const [clickedStar, setClickedStar] = useState<StarWish | null>(null);

  // Notification toast
  const [toast, setToast] = useState<string | null>(null);

  // Sound Engine (Web Audio API Synthesizer)
  const playSound = (type: "complete" | "chime" | "click" | "sparkle" | "heart") => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const now = ctx.currentTime;

      if (type === "complete") {
        // High soft ascending chime
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, now + idx * 0.08);
          gain.gain.setValueAtTime(0.04, now + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.25);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.08);
          osc.stop(now + idx * 0.08 + 0.3);
        });
      } else if (type === "chime") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(1320, now + 0.15);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === "click") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(600, now);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.06);
      } else if (type === "sparkle") {
        // High twinkle sweep
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(1200, now);
        osc.frequency.exponentialRampToValueAtTime(2400, now + 0.2);
        gain.gain.setValueAtTime(0.03, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.22);
      } else if (type === "heart") {
        // Heartbeat twin pulse
        const notes = [150, 140];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, now + idx * 0.15);
          gain.gain.setValueAtTime(0.08, now + idx * 0.15);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.15 + 0.12);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.15);
          osc.stop(now + idx * 0.15 + 0.15);
        });
      }
    } catch (e) {
      // Audio blocked or not supported
    }
  };

  // Sync / Loader tracking (increments progress state smoothly)
  useEffect(() => {
    if (progress < 100) {
      const delay = progress < 25 ? 25 : progress < 65 ? 12 : progress < 88 ? 35 : 55;
      const timer = setTimeout(() => {
        setProgress((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      playSound("complete");
    }
  }, [progress]);

  // Slideshow interval setup
  useEffect(() => {
    if (!isSlideshowPlaying) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % SLIDESHOW_IMAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isSlideshowPlaying]);

  // Disc Synthesizer Playback Loop
  useEffect(() => {
    if (!playingSong) {
      if (synthIntervalRef.current) {
        clearInterval(synthIntervalRef.current);
        synthIntervalRef.current = null;
      }
      return;
    }

    // Initialize audio context dynamically on selection
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    audioCtxRef.current = ctx;

    const songNotes = playingSong === "song1" ? SONG_EJI_OWURO : SONG_IFE_GBONAN;
    let index = 0;

    const intervalTime = playingSong === "song1" ? 400 : 340; // Eji Owuro is calm and gentle; Ife Gbonan is soulful and rhythmic

    const playNextNote = () => {
      try {
        if (ctx.state === "suspended") {
          ctx.resume();
        }

        const now = ctx.currentTime;
        const baseFreq = songNotes[index];

        // Core Voice
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = playingSong === "song1" ? "sine" : "triangle";
        osc.frequency.setValueAtTime(baseFreq, now);

        // Subtly lower the volume to be very non-intrusive and cozy
        gain.gain.setValueAtTime(0.025, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + (playingSong === "song1" ? 0.5 : 0.45));

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + (playingSong === "song1" ? 0.6 : 0.5));

        // Sweet Sparkle Harmonic Voice (Octave above or Fifth)
        if (playingSong === "song1") {
          const oscHarmonic = ctx.createOscillator();
          const gainHarmonic = ctx.createGain();
          oscHarmonic.type = "sine";
          // Gentle octave higher
          oscHarmonic.frequency.setValueAtTime(baseFreq * 2, now + 0.04);
          gainHarmonic.gain.setValueAtTime(0.008, now);
          gainHarmonic.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
          oscHarmonic.connect(gainHarmonic);
          gainHarmonic.connect(ctx.destination);
          oscHarmonic.start(now + 0.04);
          oscHarmonic.stop(now + 0.4);
        } else {
          // Soft ambient fifth harmonic for warmth
          const oscHarmonic = ctx.createOscillator();
          const gainHarmonic = ctx.createGain();
          oscHarmonic.type = "sine";
          oscHarmonic.frequency.setValueAtTime(baseFreq * 1.5, now + 0.06);
          gainHarmonic.gain.setValueAtTime(0.006, now);
          gainHarmonic.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
          oscHarmonic.connect(gainHarmonic);
          gainHarmonic.connect(ctx.destination);
          oscHarmonic.start(now + 0.06);
          oscHarmonic.stop(now + 0.4);
        }

        index = (index + 1) % songNotes.length;
      } catch (e) {
        // Handle blocked contexts silently
      }
    };

    // Play initial note
    playNextNote();

    // Loop
    synthIntervalRef.current = setInterval(playNextNote, intervalTime);

    return () => {
      if (synthIntervalRef.current) {
        clearInterval(synthIntervalRef.current);
        synthIntervalRef.current = null;
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
        audioCtxRef.current = null;
      }
    };
  }, [playingSong]);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  const handleSurpriseClick = () => {
    playSound("complete");
    playSound("heart");
    setSurpriseClicked(true);
    triggerToast("Thank you for existing! You are loved ❤️");
    
    // Create floating heart particles
    const newHearts = Array.from({ length: 24 }).map((_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 95,
      delay: Math.random() * 2
    }));
    setFloatingHearts(newHearts);

    setTimeout(() => {
      setSurpriseClicked(false);
      setFloatingHearts([]);
    }, 5000);
  };

  const scrollIntoView = (id: string) => {
    playSound("click");
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Typewriter Letter Animation string splits
  const rawLetterText = `Dear Shankolo,

There are some letters that are incredibly easy to start, but almost impossible to summarize because of how much appreciation is bottled up inside. You happen to be the primary human I want to thank.

From the quiet chat, the gist, and the silly inside jokes that we giggle about when nobody else is looking, you have made this big noisy world feel incredibly safe, supportive, and safe. Your absolute authenticity, genuine wisdom, and beautiful heart inspire me daily.

I made this little corner of the internet for you. Whenever doubts or gloom creep into your mind, I hope you come back here, browse through these memories and the time we have spent together, and remind yourself of the magnificent soul you are.

No matter where our paths lead or how busy this life gets, please know that I will always remain your loudest cheerleader, your trustworthy listener, and your forever friend.

Thank you for your warm smiles, money, cuddles, gossips,  your patient listening, and your sweet presence. Thank you for just existing.

With endless gratitude and countless happy memories,
Your Tall Friend ❤️`;

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center relative overflow-x-hidden font-sans text-[#333333] select-none">
      
      {/* Falling Love Effect */}
      <FallingHearts />
      
      {/* Absolute Decorative Vector Overlays */}
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-[#FFF0F5] -skew-y-3 origin-top-left z-0 pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#FFF0F5] rounded-full opacity-40 pointer-events-none" />

      {/* Brand Watermark */}

      {/* Floating Sparkle Icon */}
      <div className="absolute top-12 right-12 text-[#FFB6C1] animate-bounce pointer-events-none z-10 hidden md:block">
        <Sparkles size={24} className="opacity-40" />
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -45, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 z-50 bg-white/95 border-2 border-[#FFB6C1] text-[#FF69B4] text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-2"
          >
            <span className="w-2.5 h-2.5 bg-[#FF69B4] rounded-full animate-ping" />
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!isMailChecked ? (
          /* ================= GREETING / LOADER PORTAL VIEW ================= */
          <motion.div
            key="portal-loader"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="z-10 flex flex-col items-center p-4 max-w-md w-full"
            id="portal-view"
          >
            {/* Cute Smaller Slideshow Box */}
            <div 
              className="w-56 h-56 sm:w-60 sm:h-60 bg-white border-[8px] border-[#FFB6C1] rounded-[32px] shadow-[0_20px_45px_-12px_rgba(255,182,193,0.45)] flex flex-col items-center justify-center relative overflow-hidden mb-8"
              id="loader-photo-box"
            >
              {/* Slideshow image transitions */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img 
                    src={throwback} 
                    alt="Cozy sweet memory" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  {/* Subtle vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
                </motion.div>
              </AnimatePresence>

              {/* Inside description with captions & navigation */}
              <div className="absolute bottom-2 left-2 right-2 z-10 flex flex-col items-center">
                <span className="text-[9px] text-white font-bold bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-md text-center truncate max-w-full leading-tight mb-1">
                  {SLIDESHOW_IMAGES[currentImageIndex].caption}
                </span>

                {/* Inline Controls */}
                <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded-full scale-90">
                  <button 
                    onClick={() => {
                      playSound("click");
                      setCurrentImageIndex((prev) => (prev - 1 + SLIDESHOW_IMAGES.length) % SLIDESHOW_IMAGES.length);
                    }}
                    className="text-gray-500 hover:text-[#FF69B4] transition-colors p-0.5"
                    title="Prev"
                  >
                    <ChevronLeft size={10} strokeWidth={3} />
                  </button>
                  <button 
                    onClick={() => {
                      playSound("click");
                      setIsSlideshowPlaying(!isSlideshowPlaying);
                    }}
                    className="text-gray-500 hover:text-[#FF69B4] transition-colors p-0.5"
                    title={isSlideshowPlaying ? "Pause" : "Play"}
                  >
                    {isSlideshowPlaying ? <Pause size={9} fill="currentColor" /> : <Play size={9} fill="currentColor" />}
                  </button>
                  <button 
                    onClick={() => {
                      playSound("click");
                      setCurrentImageIndex((prev) => (prev + 1) % SLIDESHOW_IMAGES.length);
                    }}
                    className="text-gray-500 hover:text-[#FF69B4] transition-colors p-0.5"
                    title="Next"
                  >
                    <ChevronRight size={10} strokeWidth={3} />
                  </button>
                </div>
              </div>

              {/* Glowing decorative Live tag */}
              <div className="absolute top-2 right-2 bg-[#FF69B4] text-white text-[7px] font-black tracking-widest uppercase px-2 py-0.5 rounded-full shadow-sm">
                Vibe Box
              </div>
            </div>

            {/* Percentage loader display */}
            <div className="flex flex-col items-center space-y-3.5 text-center">
              <div className="relative flex items-center justify-center">
                <span className="text-4xl sm:text-5xl font-black leading-none text-[#FF69B4] tracking-tight">
                  {progress}
                  <span className="text-xl sm:text-2xl align-top font-bold ml-0.5">%</span>
                </span>
              </div>

              {/* Compact Loader Track */}
              <div className="w-56 sm:w-64 h-2.5 bg-[#FFE4E1] rounded-full overflow-hidden p-0.5 border border-[#FFB6C1]/20 shadow-inner">
                <motion.div 
                  className="h-full bg-[#FF69B4] rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ type: "tween" }}
                />
              </div>

              {/* Unlock Button */}
              <AnimatePresence>
                {progress === 100 && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.95, y: 5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -5 }}
                    onClick={() => {
                      setIsMailChecked(true);
                      playSound("chime");
                      setPlayingSong("song1");
                      triggerToast("🎵 Playing Sola Allyson - Eji Owuro 🌅");
                    }}
                    className="px-8 py-3.5 bg-white border-2 border-[#FF69B4] text-[#FF69B4] text-xs font-black rounded-full overflow-hidden hover:bg-[#FF69B4] hover:text-white transition-all duration-300 shadow-md shadow-[#FFB6C1]/30 mt-3 uppercase tracking-widest cursor-pointer flex items-center gap-1.5"
                    id="btn-unlock-journey"
                  >
                    Read My Letter <ArrowRight size={12} strokeWidth={2.5} />
                  </motion.button>
                )}
              </AnimatePresence>

              <p className="text-[10px] font-bold text-[#FFB6C1] uppercase tracking-[0.2em]">
                {progress === 100 ? "Inbox Ready • Click Above" : "Gathering Cozy Memories..."}
              </p>
            </div>
          </motion.div>
        ) : (
          /* ================= MASTER LANDING PAGE VIEW ================= */
          <motion.div
            key="master-landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full relative z-10 flex flex-col items-center bg-white"
            id="landing-container"
          >
            {/* Quick Sticky Float Anchor navigation inside app */}
            <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-2">
              <button 
                onClick={() => {
                  playSound("click");
                  setIsMailChecked(false);
                  setProgress(1);
                  setPlayingSong(null);
                }}
                className="w-10 h-10 rounded-full bg-white border-2 border-[#FF69B4] flex items-center justify-center text-[#FF69B4] shadow-md hover:bg-[#FF69B4] hover:text-white transition-colors"
                title="Return to Box Loader"
              >
                <X size={16} strokeWidth={2.5} />
              </button>
            </div>

            {/* ================= SECTION 1: HERO ================= */}
            <section className="w-full min-h-[90vh] flex flex-col items-center justify-center px-6 py-12 text-center max-w-4xl mx-auto relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="space-y-6 flex flex-col items-center"
              >
                {/* Visual pulse heart */}
                <div className="w-14 h-14 bg-[#FFF0F5] rounded-full flex items-center justify-center border border-[#FFB6C1]/40 shadow-sm animate-pulse mb-2">
                  <Heart className="w-7 h-7 text-[#FF69B4] fill-[#FF69B4]/30" />
                </div>

                <h1 className="text-4xl sm:text-6xl font-black text-[#FF69B4] tracking-tight leading-tight uppercase">
                  My Favorite Short Girl ❤️
                </h1>

                <p className="text-sm sm:text-base max-w-xl text-gray-500 font-medium leading-relaxed">
                  This little corner of the internet exists because someone as amazing as you deserves to be celebrated.
                </p>

                {/* Hero Polaroid Card */}
                <motion.div 
                  whileHover={{ rotate: 1, scale: 1.02 }}
                  className="bg-white p-3.5 pb-8 border-4 border-[#FFE4E1] rounded-2xl shadow-xl shadow-pink-200/20 max-w-xs w-full rotate-[-2deg] my-6 transition-transform"
                >
                  <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 mb-3 border border-pink-50">
                    <img 
                      src={mainpicture} 
                      alt="Favorite Friend Quality Moment" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-center font-bold text-xs text-pink-500 tracking-wider font-mono">
                    My Favorite Soul ✨
                  </div>
                </motion.div>

                {/* Hero Call to Action Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
                  <button
                    onClick={() => scrollIntoView("dear-letter-section")}
                    className="px-6 py-3 bg-[#FF69B4] hover:bg-[#ff55a3] text-white text-xs font-black rounded-full uppercase tracking-widest transition-transform hover:scale-105 cursor-pointer shadow-md shadow-pink-200"
                  >
                    Read My Letter ✉️
                  </button>
                  <button
                    onClick={() => scrollIntoView("why-page-section")}
                    className="px-6 py-3 bg-white border-2 border-[#FFB6C1] text-gray-600 hover:text-[#FF69B4] hover:border-[#FF69B4] text-xs font-black rounded-full uppercase tracking-widest transition-all cursor-pointer"
                  >
                    Start the Journey ↓
                  </button>
                </div>
              </motion.div>
            </section>


            {/* ================= SECTION 3: ABOUT YOU ================= */}
            <section className="w-full py-20 px-6 bg-white max-w-5xl mx-auto">
              <div className="text-center space-y-3 mb-12">
                <div className="text-xs font-black text-[#FFB6C1] tracking-[0.25em] uppercase">Celebrating You</div>
                <h2 className="text-2xl sm:text-3xl font-black text-[#FF69B4] uppercase tracking-tight">The Person You Are</h2>
                <div className="w-12 h-0.5 bg-[#FFB6C1] mx-auto rounded-full" />
              </div>

              {/* Grid of qualities */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {QUALITIES.map((qual, idx) => (
                  <motion.div
                    key={qual.id}
                    whileHover={{ y: -4, scale: 1.01 }}
                    className={`p-5 rounded-2xl border-2 shadow-sm flex flex-col items-start space-y-3 transition-all ${qual.color}`}
                  >
                    <span className="text-3xl">{qual.icon}</span>
                    <h3 className="font-black text-sm uppercase tracking-wider">{qual.title}</h3>
                    <p className="text-xs leading-relaxed text-gray-600 font-medium">{qual.desc}</p>
                  </motion.div>
                ))}
              </div>
            </section>


            {/* ================= SECTION 4: THINGS I LOVE ABOUT YOU ================= */}
            <section className="w-full py-20 px-6 bg-white max-w-4xl mx-auto">
              <div className="text-center space-y-3 mb-12">
                <div className="text-xs font-black text-[#FFB6C1] tracking-[0.25em] uppercase">My Favorite Bits</div>
                <h2 className="text-2xl sm:text-3xl font-black text-gray-800 uppercase tracking-tight">Things I Love About You</h2>
                <div className="w-12 h-1 bg-[#FF69B4] mx-auto rounded-full" />
              </div>

              {/* Two column list layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {LOVE_ITEMS.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex items-start gap-4 p-4 border border-[#FFE4E1] bg-[#FFF5F7]/15 rounded-2xl"
                  >
                    <div className="w-10 h-10 bg-white border border-[#FFB6C1]/40 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                      {item.icon}
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-black text-xs uppercase tracking-wide text-gray-800">{item.title}</h4>
                      <p className="text-[11px] leading-relaxed text-gray-500 font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Memories */}

            <div className="py-12">
  <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-12">Memories</h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
    {MEMORIES.map((memory) => (
      <div
        key={memory.id}
        className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300"
      >
        {memory.type === "video" ? (
          <video
            src={memory.url}
            controls
            className="w-full h-64 object-cover"
          />
        ) : (
          <img
            src={memory.url}
            alt={memory.caption}
            className="w-full h-64 object-cover"
          />
        )}
        <div className="p-6">
          <p className="text-base text-gray-700 font-medium">{memory.caption}</p>
        </div>
      </div>
    ))}
  </div>
</div>

     
            {/* ================= SECTION 8: IF YOU EVER FORGET... ================= */}
            <section className="w-full py-20 px-6 bg-white max-w-4xl mx-auto">
              <div className="text-center space-y-3 mb-12">
                <div className="text-xs font-black text-[#FFB6C1] tracking-[0.25em] uppercase">Truth Cards</div>
                <h2 className="text-2xl sm:text-3xl font-black text-[#FF69B4] uppercase tracking-tight">If You Ever Forget...</h2>
                <div className="w-12 h-1 bg-[#FFB6C1] mx-auto rounded-full" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {QUOTES.map((qt) => (
                  <motion.div
                    key={qt.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="p-6 bg-white border-2 border-dashed border-[#FFB6C1] rounded-2xl flex flex-col justify-between relative overflow-hidden"
                  >
                    <span className="text-4xl text-[#FFB6C1]/20 font-serif absolute -top-1 left-2">“</span>
                    <p className="text-xs italic text-gray-600 font-medium leading-relaxed relative z-10 py-2">
                      {qt.text}
                    </p>
                    <span className="text-[9px] uppercase tracking-wider text-[#FF69B4] font-black text-right pt-2 border-t border-pink-50">{qt.author}</span>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* ================= SECTION 9: OPEN WHEN YOU NEED IT ================= */}
            <section className="w-full bg-[#FFF5F7]/30 py-20 px-6 border-y-2 border-[#FFE4E1]">
              <div className="max-w-3xl mx-auto">
                <div className="text-center space-y-3 mb-12">
                  <div className="text-xs font-black text-[#FFB6C1] tracking-[0.25em] uppercase">Emergency Notes</div>
                  <h2 className="text-2xl sm:text-3xl font-black text-gray-800 uppercase tracking-tight">Open When You Need It</h2>
                  <div className="w-12 h-1 bg-[#FF69B4] mx-auto rounded-full" />
                  <p className="text-xs text-gray-400 font-medium max-w-sm mx-auto">Heartfelt custom guidance tailored exactly for how you are feeling in this exact moment.</p>
                </div>

                <div className="flex flex-wrap justify-center gap-3.5">
                  {OPEN_WHEN_MESSAGES.map((msg) => (
                    <motion.button
                      key={msg.id}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => {
                        playSound("chime");
                        setActiveModalMessage(msg);
                      }}
                      className="px-5 py-3.5 bg-white border-2 border-[#FFB6C1] hover:border-[#FF69B4] rounded-2xl text-xs font-black uppercase text-gray-700 hover:text-[#FF69B4] tracking-wider transition-all cursor-pointer shadow-sm flex items-center gap-2"
                    >
                      <span>{msg.icon}</span>
                      <span>{msg.trigger}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Modal Box for Open When */}
              <AnimatePresence>
                {activeModalMessage && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4"
                  >
                    <motion.div
                      initial={{ scale: 0.9, y: 15 }}
                      animate={{ scale: 1, y: 0 }}
                      exit={{ scale: 0.9, y: 15 }}
                      className="max-w-md w-full bg-white rounded-3xl border-4 border-[#FFB6C1] shadow-2xl overflow-hidden flex flex-col"
                    >
                      {/* Interactive Header background gradient */}
                      <div className={`p-5 bg-gradient-to-r ${activeModalMessage.theme} flex items-center justify-between`}>
                        <div className="flex items-center gap-2.5">
                          <span className="text-2xl">{activeModalMessage.icon}</span>
                          <h4 className="font-black text-xs uppercase tracking-wider">{activeModalMessage.title}</h4>
                        </div>
                        <button
                          onClick={() => {
                            playSound("click");
                            setActiveModalMessage(null);
                          }}
                          className="p-1 hover:bg-black/5 rounded-full transition-colors"
                          title="Close"
                        >
                          <X size={16} strokeWidth={2.5} />
                        </button>
                      </div>

                      <div className="p-6 space-y-4">
                        <p className="text-xs font-bold leading-relaxed text-gray-600 whitespace-pre-wrap bg-pink-50/10 p-4 rounded-xl border border-[#FFE4E1]">
                          {activeModalMessage.message}
                        </p>
                        <button
                          onClick={() => {
                            playSound("click");
                            setActiveModalMessage(null);
                          }}
                          className="w-full py-2.5 bg-[#FF69B4] hover:bg-[#ff55a3] text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-colors cursor-pointer border border-[#FF69B4]"
                        >
                          Okay, I feel warmer now 🌸
                        </button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </section>

            {/* ================= SECTION 10: MY LETTER TO YOU ================= */}
            <section id="dear-letter-section" className="w-full py-20 px-6 bg-white max-w-3xl mx-auto">
              <div className="text-center space-y-3 mb-10">
                <div className="text-xs font-black text-[#FFB6C1] tracking-[0.25em] uppercase">The Heart</div>
                <h2 className="text-2xl sm:text-3xl font-black text-gray-800 uppercase tracking-tight">My Letter To You</h2>
                <div className="w-12 h-1 bg-[#FF69B4] mx-auto rounded-full" />
              </div>

              {/* Hand written vintage paper container */}
              <div 
                ref={letterRef}
                className="bg-[#FFFDF6] border-[6px] border-[#FBECC5] rounded-3xl p-6 sm:p-10 shadow-lg shadow-[#FBECC5]/20 relative text-xs text-amber-950 font-medium leading-relaxed overflow-hidden"
              >
                {/* Stamp visual inside */}
                <div className="absolute top-6 right-6 w-14 h-14 border-2 border-dashed border-[#FFB6C1] flex items-center justify-center p-1 opacity-60 rounded-lg">
                  <div className="w-full h-full border border-[#FFB6C1] rounded flex items-center justify-center text-[8px] font-mono uppercase font-black text-[#FF69B4]">
                    Love 🤍
                  </div>
                </div>

                <h3 className="text-sm font-black uppercase tracking-wider text-amber-900 mb-6 font-mono">Dear Best Friend,</h3>

                {/* Main Text Content wrapper */}
                <div className="whitespace-pre-wrap space-y-4 text-[11px] font-sans">
                  {rawLetterText.split("\n\n").map((para, i) => {
                    if (i === 0) return null; // skip initial salutation
                    return (
                      <p key={i} className="mb-4">
                        {para}
                      </p>
                    );
                  })}
                </div>

                <div className="mt-8 pt-4 border-t border-[#F1E0B3] flex justify-between items-center text-[10px] font-mono">
                  <span>Forever Grateful,</span>
                  <span className="font-serif italic text-amber-900 font-bold text-xs">Your Best Friend</span>
                </div>
              </div>
            </section>

            {/* ================= INTERACTIVE WORKSPACE: WISH UPON A STAR ================= */}
            <section className="w-full bg-[#1A1A2E] text-white py-20 px-6 relative overflow-hidden">
              {/* Star backdrop decoration */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1F1F3E] via-[#1A1A2E] to-[#0F0F1A] z-0" />
              
              <div className="relative z-10 max-w-3xl mx-auto text-center space-y-4">
                <div className="text-[10px] font-black text-pink-400 tracking-[0.25em] uppercase">Cozy Cosmic Sky</div>
                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-wide">Wish Upon a Star 🌠</h3>
                <p className="text-xs text-gray-300 max-w-md mx-auto">
                  The sky holds quiet, loving thoughts. Click on any shining star in the cosmos below to reveal a hidden friendship fortune or blessing.
                </p>

                {/* Stars Canvas Grid */}
                <div className="w-full h-56 bg-black/40 border border-pink-900/40 rounded-3xl relative mt-8 overflow-hidden cursor-crosshair">
                  {STAR_WISHES.map((star) => (
                    <motion.button
                      key={star.id}
                      onClick={() => {
                        playSound("sparkle");
                        setClickedStar(star);
                      }}
                      whileHover={{ scale: 1.4 }}
                      style={{ top: star.top, left: star.left }}
                      className="absolute text-white focus:outline-none"
                    >
                      <Sparkle 
                        size={star.size * 2.5} 
                        className="text-pink-300 hover:text-white animate-pulse" 
                        fill="currentColor"
                      />
                    </motion.button>
                  ))}

                  {/* Star Wish dialog overlay inside box */}
                  <AnimatePresence>
                    {clickedStar && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="absolute inset-x-4 bottom-4 bg-white text-gray-800 p-3 rounded-2xl border-2 border-pink-400 shadow-xl flex items-center justify-between z-20"
                      >
                        <p className="text-[10px] sm:text-xs font-bold text-gray-700 text-left">
                          "{clickedStar.message}"
                        </p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            playSound("click");
                            setClickedStar(null);
                          }}
                          className="ml-3 text-xs font-black text-pink-500 hover:text-pink-600 uppercase tracking-wider"
                        >
                          Close
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </section>

            {/* ================= SECTION 11: PROMISE SECTION ================= */}
            <section className="w-full py-20 px-6 bg-white max-w-4xl mx-auto">
              <div className="text-center space-y-6">
                <div className="text-xs font-black text-[#FFB6C1] tracking-[0.25em] uppercase">My Promise To You</div>
                <h2 className="text-2xl sm:text-4xl font-black text-gray-800 uppercase tracking-tight leading-snug">
                  No matter where life takes us...
                </h2>
                
                <div className="space-y-4 text-xs font-bold text-gray-500 max-w-lg mx-auto">
                  <div className="p-3.5 bg-[#FFF0F5] border border-pink-100 rounded-xl">
                    I'll always be cheering for you. 📣
                  </div>
                  <div className="p-3.5 bg-[#FFF0F5] border border-pink-100 rounded-xl">
                    I'll always appreciate your sweet presence. 🌸
                  </div>
                  <div className="p-3.5 bg-[#FFF0F5] border border-pink-100 rounded-xl">
                    And I'll always be grateful that you're my best friend. ❤️
                  </div>
                </div>
              </div>
            </section>

            {/* ================= SECTION 12: SURPRISE SECTION ================= */}
            <section className="w-full bg-[#FFF5F7] py-20 px-6 border-y-2 border-[#FFE4E1] relative overflow-hidden">
              
              {/* Particle flow */}
              {floatingHearts.map((h) => (
                <div
                  key={h.id}
                  style={{ left: `${h.left}%`, animationDelay: `${h.delay}s` }}
                  className="absolute bottom-0 text-red-400 text-lg animate-float pointer-events-none"
                >
                  ❤️
                </div>
              ))}

              <div className="max-w-xl mx-auto text-center space-y-6 relative z-10">
                <h3 className="text-lg sm:text-xl font-black text-gray-800 uppercase tracking-wider">A Tiny Secret Surprise</h3>
                <p className="text-xs text-gray-500 font-medium">Click on the heart button below to activate cozy floating hearts!</p>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSurpriseClick}
                  className="w-20 h-20 bg-white border-4 border-[#FF69B4] rounded-full flex items-center justify-center shadow-lg hover:shadow-pink-200 cursor-pointer mx-auto group"
                  id="btn-surprise-trigger"
                >
                  <Heart className="w-10 h-10 text-[#FF69B4] group-hover:fill-[#FF69B4] transition-all" />
                </motion.button>

                <AnimatePresence>
                  {surpriseClicked && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-white border-2 border-[#FFB6C1] p-5 rounded-2xl max-w-sm mx-auto shadow-md"
                    >
                      <h4 className="font-black text-xs text-[#FF69B4] uppercase tracking-wide mb-1">Thank you for existing.</h4>
                      <p className="text-[11px] text-gray-600 leading-relaxed font-medium">
                        You are one of the greatest, most wonderful gifts life has given me. Please stay happy and healthy! 🌸
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </section>


          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating particles animation stylesheet */}
      <style>{`
        @keyframes float {
          0% {
            transform: translateY(0) scale(1) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-105vh) scale(1.3) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-float {
          animation: float 4s linear forwards;
        }
        @keyframes heartbeat {
          0% { transform: scale(1); }
          20% { transform: scale(1.15); }
          40% { transform: scale(1); }
          60% { transform: scale(1.15); }
          80% { transform: scale(1); }
          100% { transform: scale(1); }
        }
        .animate-heartbeat {
          animation: heartbeat 2s infinite ease-in-out;
        }
      `}</style>

    </div>
  );
}
