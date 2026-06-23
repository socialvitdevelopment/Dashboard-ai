import { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  Plus,
  BotMessageSquare,
  GraduationCap,
  CircleHelp,
  BarChart2,
  Globe,
  HelpCircle,
  Zap,
  Download,
  Gift,
  Info,
  LogOut,
  ChevronRight,
} from "lucide-react";
import * as Tooltip from "@radix-ui/react-tooltip";

function UserMenu({ onClose }: { onClose: () => void }) {
  return (
    <>
      {/* Popup */}
      <div className="absolute bottom-full left-0 right-0 z-[70] mb-2 mx-2 overflow-hidden rounded-xl bg-[#1c1c1e] shadow-2xl">
        {/* Email */}
        <div className="px-4 py-2.5 border-b border-white/10">
          <p className="text-[11.5px] text-white/50 truncate">alex.ferguson@gmail.com</p>
        </div>
        {/* Menu items */}
        <div className="py-1.5">
          {[
            { icon: Settings,    label: "Settings",               shortcut: "Ctrl ⌥", arrow: false },
            { icon: Globe,       label: "Language",               shortcut: "",        arrow: true  },
            { icon: HelpCircle,  label: "Get help",               shortcut: "",        arrow: false },
          ].map(({ icon: Icon, label, shortcut, arrow }) => (
            <button key={label} className="flex w-full items-center gap-3 px-4 py-2 text-[13px] text-white hover:bg-white/10">
              <Icon className="size-4 shrink-0 text-white/70" />
              <span className="flex-1 text-left">{label}</span>
              {shortcut && <span className="text-[11px] text-white/40">{shortcut}</span>}
              {arrow && <ChevronRight className="size-3.5 text-white/40" />}
            </button>
          ))}
        </div>
        <div className="border-t border-white/10 py-1.5">
          {[
            { icon: Zap,      label: "Upgrade plan"           },
            { icon: Download, label: "Get apps and extensions" },
            { icon: Gift,     label: "Gift Claude"            },
            { icon: Info,     label: "Learn more",  arrow: true },
          ].map(({ icon: Icon, label, arrow }) => (
            <button key={label} className="flex w-full items-center gap-3 px-4 py-2 text-[13px] text-white hover:bg-white/10">
              <Icon className="size-4 shrink-0 text-white/70" />
              <span className="flex-1 text-left">{label}</span>
              {arrow && <ChevronRight className="size-3.5 text-white/40" />}
            </button>
          ))}
        </div>
        <div className="border-t border-white/10 py-1.5">
          <button onClick={onClose} className="flex w-full items-center gap-3 px-4 py-2 text-[13px] text-white hover:bg-white/10">
            <LogOut className="size-4 shrink-0 text-white/70" />
            <span>Log out</span>
          </button>
        </div>
      </div>
    </>
  );
}

function Tip({
  label,
  shortcut,
  children,
}: {
  label: string;
  shortcut?: string;
  children: React.ReactNode;
}) {
  return (
    <Tooltip.Root delayDuration={300}>
      <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          side="right"
          sideOffset={8}
          className="flex items-center gap-2 rounded-md bg-[#18181b] px-2.5 py-1.5 text-[12px] text-white shadow-lg animate-in fade-in-0 zoom-in-95"
        >
          <span className="font-medium">{label}</span>
          {shortcut && (
            <span className="text-white/50">{shortcut}</span>
          )}
          <Tooltip.Arrow className="fill-[#18181b]" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}

const navItems = [
  {
    icon: BotMessageSquare,
    label: "AI Mentor",
    shortcut: "",
    active: true,
  },
  {
    icon: GraduationCap,
    label: "Classes",
    shortcut: "",
    active: false,
  },
  {
    icon: CircleHelp,
    label: "Quiz",
    shortcut: "",
    active: false,
  },
  {
    icon: BarChart2,
    label: "Report",
    shortcut: "",
    active: false,
  },
];

const pinned = [
  "How can I improve my time man...",
  "What's the best way to learn a n...",
  "How do I start investing in stock...",
  "What are the benefits of daily ex...",
];

const history = [
  "What's the difference between a...",
  "How can I reduce stress at work...",
  "What are some good healthy sn...",
  "Should I get a pet if I live alone?...",
  "How much sleep do I really need...",
];

interface LeftSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function LeftSidebar({
  collapsed,
  onToggle,
  mobileOpen = false,
  onMobileClose,
}: LeftSidebarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);
  if (collapsed) {
    return (
      <Tooltip.Provider>
        {/* Mobile: hidden when closed, slide in from left when open */}
        <aside className={`
          flex h-full w-[56px] shrink-0 flex-col items-center border-r border-border bg-white py-4 gap-1
          md:relative md:translate-x-0
          fixed inset-y-0 left-0 z-50 transition-transform duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}>
          {/* Logo */}
          <div className="flex size-7 items-center justify-center rounded-lg bg-[#2563eb] text-white mb-2">
            <Sparkles className="size-4" />
          </div>

          {/* Toggle open */}
          <Tip label="Expand sidebar">
            <button
              onClick={onToggle}
              className="flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground mb-1"
            >
              <PanelLeftOpen className="size-[18px]" />
            </button>
          </Tip>

          {/* New Chat icon */}
          <Tip label="New chat" shortcut="⌘ N">
            <button className="btn-primary flex size-9 items-center justify-center rounded-xl mb-2">
              <Plus className="size-4" />
            </button>
          </Tip>

          {/* Nav icons */}
          {navItems.map((item) => (
            <Tip
              key={item.label}
              label={item.label}
              shortcut={item.shortcut}
            >
              <button
                className={`flex size-9 items-center justify-center rounded-lg ${
                  item.active
                    ? "bg-[#2563eb]/10 text-[#2563eb]"
                    : "text-foreground/60 hover:bg-muted"
                }`}
              >
                <item.icon className="size-4" />
              </button>
            </Tip>
          ))}

          {/* Footer: user avatar */}
          <div className="mt-auto">
            <Tip label="Alex Ferguson" shortcut="Settings">
              <div className="flex size-9 items-center justify-center rounded-full bg-[#2563eb]/10 text-[#2563eb]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="size-4"
                >
                  <circle
                    cx="12"
                    cy="8"
                    r="3.2"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <path
                    d="M5 19c0-3.3 3.1-5 7-5s7 1.7 7 5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </Tip>
          </div>
        </aside>
      </Tooltip.Provider>
    );
  }

  return (
    <aside className={`
      flex h-full w-[212px] shrink-0 flex-col border-r border-border bg-white
      fixed inset-y-0 left-0 z-50 transition-transform duration-300
      md:relative md:translate-x-0
      ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
    `}>
      {/* Brand */}
      <div className="flex items-center justify-between px-4 pt-4">
        <div className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-lg bg-[#2563eb] text-white">
            <Sparkles className="size-4" />
          </div>
          <span className="text-[18px] font-semibold tracking-tight text-foreground">
            Ciphy
          </span>
        </div>
        {/* On mobile show X to close drawer, on desktop show collapse icon */}
        <button
          onClick={mobileOpen ? onMobileClose : onToggle}
          className="text-muted-foreground hover:text-foreground"
        >
          <PanelLeftClose className="size-[18px]" />
        </button>
      </div>

      {/* New Chat */}
      <div className="mt-4 px-3">
        <button className="btn-primary relative flex w-full items-center justify-center gap-2 rounded-xl py-2 text-[13px] font-medium">
          <Plus className="size-4" />
          New Chat
        </button>
      </div>

      {/* Nav */}
      <nav className="mt-3 space-y-0.5 px-3">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-[13px] ${
              item.active
                ? "bg-[#2563eb]/10 text-[#2563eb]"
                : "text-foreground/80 hover:bg-muted"
            }`}
          >
            <span className="flex items-center gap-2.5">
              <item.icon className="size-4" />
              {item.label}
            </span>
            <span
              className={`text-[11px] ${item.active ? "text-[#2563eb]/70" : "text-muted-foreground"}`}
            >
              {item.shortcut}
            </span>
          </button>
        ))}
      </nav>

      {/* Lists */}
      <div className="mt-4 flex-1 overflow-y-auto px-3 pb-2">
        <p className="px-2.5 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Pinned
        </p>
        <ul className="space-y-0.5">
          {pinned.map((item, i) => (
            <li key={item}>
              <button
                className={`w-full truncate rounded-lg px-2.5 py-1.5 text-left text-[12.5px] ${
                  i === 0
                    ? "bg-muted text-foreground"
                    : "text-foreground/70 hover:bg-muted"
                }`}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>

        <p className="px-2.5 pb-1.5 pt-4 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Chat History
        </p>
        <ul className="space-y-0.5">
          {history.map((item, i) => (
            <li key={item}>
              <button
                className={`w-full truncate rounded-lg px-2.5 py-1.5 text-left text-[12.5px] hover:bg-muted ${
                  i === history.length - 1
                    ? "text-muted-foreground/60"
                    : "text-foreground/70"
                }`}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer: User */}
      <div ref={menuRef} className="relative border-t border-border p-3">
        {menuOpen && <UserMenu onClose={() => setMenuOpen(false)} />}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 hover:bg-muted"
        >
          <div className="flex items-center gap-2">
            <div className="flex size-6 items-center justify-center rounded-full bg-[#2563eb]/10 text-[#2563eb]">
              <svg viewBox="0 0 24 24" fill="none" className="size-3.5">
                <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.8" />
                <path d="M5 19c0-3.3 3.1-5 7-5s7 1.7 7 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </div>
            <span className="text-[13px] text-foreground">Alex Ferguson</span>
          </div>
          <Settings className="size-[15px] text-muted-foreground" />
        </button>
      </div>
    </aside>
  );
}