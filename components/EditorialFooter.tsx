'use client'

interface EditorialFooterProps {
  onReplayIntro: () => void
}

export default function EditorialFooter({ onReplayIntro }: EditorialFooterProps) {
  return (
    <footer className="relative w-full bg-[#1A0A0F] text-[#F4ECDD] py-16 px-4 sm:px-8 border-t border-[#B8893E]/40 text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center space-y-6">
        {/* Monogram */}
        <div className="w-14 h-14 rounded-full border border-[#B8893E]/50 flex items-center justify-center font-headline text-lg text-[#F2DFB5] shadow-lg">
          RM
        </div>

        <div>
          <h3 className="font-names text-4xl sm:text-5xl text-[#F4ECDD]">
            Rishma John &amp; Malli Sumandhar
          </h3>
          <p className="font-tamil text-sm text-[#F2DFB5]/80 mt-1">
            என்றும் அன்புடன் · With love, always
          </p>
        </div>

        <p className="text-xs uppercase tracking-[0.3em] text-[#B8893E] font-sans">
          #RishmaFoundHerPavazhaMalli · Coimbatore 2026
        </p>

        <div className="w-24 h-px bg-[#B8893E]/30 my-2" />

        {/* Replay Intro Button */}
        <button
          type="button"
          onClick={onReplayIntro}
          className="px-5 py-2 border border-[#B8893E]/40 hover:border-[#B8893E] bg-[#4A0F20]/40 hover:bg-[#4A0F20] text-[#F2DFB5] text-xs uppercase tracking-[0.2em] font-sans transition-all duration-300 cursor-pointer"
        >
          Replay Film Intro ↻
        </button>

        <p className="text-[10px] uppercase tracking-[0.2em] text-[#F4ECDD]/40 font-sans pt-4">
          Two Days · Two Cultures · One Celebration
        </p>
      </div>
    </footer>
  )
}
