import {
  ChevronDown,
  Plus,
  Settings2,
  Trash2,
  Columns2,
  PanelRight,
  Menu,
  Sparkles,
  CheckCircle2,
  Share2,
  RotateCcw,
  Copy,
  Bookmark,
  MoreHorizontal,
  Paperclip,
  Mic,
  Image as ImageIcon,
  Send,
} from "lucide-react";

interface ChatAreaProps {
  rightPanelOpen: boolean;
  onToggleRight: () => void;
  onOpenMobileLeft?: () => void;
}

function IconBtn({ onClick, children }: { onClick?: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
    >
      {children}
    </button>
  );
}

export function ChatArea({ rightPanelOpen, onToggleRight, onOpenMobileLeft }: ChatAreaProps) {
  return (
    <main className="flex h-full flex-1 flex-col bg-[rgb(248_250_252)]">
      {/* Header */}
      <header className="flex items-center justify-between px-3 py-3 md:px-5">
        <div className="flex items-center gap-2">
          {/* Hamburger — mobile only */}
          <IconBtn onClick={onOpenMobileLeft}>
            <Menu className="size-[18px] md:hidden" />
          </IconBtn>
          <h2 className="text-[14px] font-medium text-foreground md:text-[15px] truncate max-w-[160px] md:max-w-none">
            How the model determines token
          </h2>
          <span className="hidden md:flex cursor-pointer items-center gap-0.5 rounded-md bg-muted px-1.5 py-0.5 text-[11px] text-muted-foreground hover:bg-accent">
            GPT-4
            <ChevronDown className="size-3" />
          </span>
        </div>

        <div className="flex items-center">
          <IconBtn><Settings2 className="size-[18px] hidden md:block" /></IconBtn>
          <IconBtn><Trash2 className="size-[18px] hidden md:block" /></IconBtn>
          <IconBtn><Columns2 className="size-[18px] hidden md:block" /></IconBtn>
          <IconBtn onClick={onToggleRight}>
            <PanelRight
              className={`size-[18px] transition-colors ${rightPanelOpen ? "text-[#2563eb]" : ""}`}
            />
          </IconBtn>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 py-4 md:px-6 md:py-5">
        <div className="mx-auto max-w-[640px] space-y-5">
          {/* Date divider */}
          <div className="flex justify-center">
            <span className="rounded-full bg-muted px-3 py-1 text-[11px] text-muted-foreground">
              Today 2:45 PM
            </span>
          </div>

          {/* User message */}
          <div>
            <div className="mb-1.5 flex items-center gap-2">
              <div className="flex size-6 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <svg viewBox="0 0 24 24" fill="none" className="size-3.5">
                  <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M5 19c0-3.3 3.1-5 7-5s7 1.7 7 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </div>
              <span className="text-[13px] font-medium text-foreground">Alex Ferguson</span>
              <span className="text-[11px] text-muted-foreground">2:45 PM</span>
            </div>
            <p className="pl-8 text-[13.5px] leading-relaxed text-foreground/90">
              Hey, can you explain how the model determines token usage and tracks interactions?
            </p>
          </div>

          {/* Assistant message */}
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex size-6 items-center justify-center rounded-full bg-[#2563eb] text-white">
                  <Sparkles className="size-3.5" />
                </div>
                <span className="text-[13px] font-medium text-foreground">Ciphy.io</span>
                <span className="text-[11px] text-muted-foreground">2:46 PM</span>
              </div>
              <div className="flex items-center gap-1.5">
                <button className="flex items-center gap-1.5 rounded-md border border-border bg-white px-2 py-1 text-[11.5px] text-foreground/80 hover:bg-muted">
                  <CheckCircle2 className="size-3.5" />
                  Fact check
                </button>
                <button className="flex items-center gap-1.5 rounded-md border border-border bg-white px-2 py-1 text-[11.5px] text-foreground/80 hover:bg-muted">
                  <Share2 className="size-3.5" />
                  Share
                </button>
              </div>
            </div>

            <div className="ml-8 rounded-xl rounded-tl-sm border border-border bg-white p-4">
              <p className="text-[13.5px] leading-relaxed text-foreground/90">
                Sure! Our model counts tokens from both input and output, including{" "}
                <span className="text-[#2563eb] underline decoration-[#2563eb]/40 underline-offset-2">
                  spaces and special characters. Each token corresponds roughly to one word
                </span>
                , depending on the language and complexity of the sentence. For more detailed
                tracking of your interactions, we use timestamps and session IDs to ensure the
                most relevant responses.
              </p>

              <div className="mt-3 flex items-center justify-between border-t border-border pt-2.5">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <button className="hover:text-foreground"><RotateCcw className="size-4" /></button>
                  <button className="hover:text-foreground"><Copy className="size-4" /></button>
                  <button className="hover:text-foreground"><Share2 className="size-4" /></button>
                  <button className="hover:text-foreground"><Bookmark className="size-4" /></button>
                  <button className="hover:text-foreground"><MoreHorizontal className="size-4" /></button>
                </div>
                <span className="text-[11px] text-muted-foreground">32 tokens</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Composer */}
      <div className="px-3 pb-4 md:px-6 md:pb-5">
        <div className="mx-auto max-w-[640px] overflow-hidden rounded-xl border border-border bg-white">
          {/* Input */}
          <input
            placeholder="How can I help you?"
            className="w-full px-3.5 py-3 text-[13.5px] text-foreground placeholder:text-muted-foreground focus:outline-none"
          />

          {/* Footer */}
          <div className="flex items-center justify-between px-3 py-2.5">
            <div className="flex items-center gap-1 text-muted-foreground">
              <button className="rounded p-1.5 hover:bg-muted hover:text-foreground"><Paperclip className="size-4" /></button>
              <button className="rounded p-1.5 hover:bg-muted hover:text-foreground"><Mic className="size-4" /></button>
              <button className="rounded p-1.5 hover:bg-muted hover:text-foreground"><ImageIcon className="size-4" /></button>
            </div>
            <button className="btn-primary flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-[12.5px] font-medium">
              <Send className="size-3.5" />
              Send message
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
