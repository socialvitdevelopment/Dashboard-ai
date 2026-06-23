import { useState } from "react";
import { LeftSidebar } from "./components/left-sidebar";
import { ChatArea } from "./components/chat-area";
import { RightPanel } from "./components/right-panel";
import { useIsMobile } from "./components/ui/use-mobile";

export default function App() {
  const isMobile = useIsMobile();
  const [leftCollapsed, setLeftCollapsed] = useState(false);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const [mobileLeftOpen, setMobileLeftOpen] = useState(false);
  const [mobileRightOpen, setMobileRightOpen] = useState(false);

  const anyDrawerOpen = mobileLeftOpen || mobileRightOpen;

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white text-foreground">
      {/* Backdrop — mobile only */}
      {isMobile && anyDrawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40"
          onClick={() => { setMobileLeftOpen(false); setMobileRightOpen(false); }}
        />
      )}

      <LeftSidebar
        collapsed={leftCollapsed}
        onToggle={() => setLeftCollapsed((v) => !v)}
        mobileOpen={mobileLeftOpen}
        onMobileClose={() => setMobileLeftOpen(false)}
      />

      <ChatArea
        rightPanelOpen={rightPanelOpen}
        onToggleRight={() => isMobile ? setMobileRightOpen((v) => !v) : setRightPanelOpen((v) => !v)}
        onOpenMobileLeft={() => setMobileLeftOpen(true)}
      />

      <RightPanel
        mobileOpen={mobileRightOpen}
        onMobileClose={() => setMobileRightOpen(false)}
        desktopVisible={!isMobile && rightPanelOpen}
      />
    </div>
  );
}
