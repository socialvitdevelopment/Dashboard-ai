# Plan: Mobile Responsive Layout

## Context
Saat ini semua komponen (LeftSidebar 212px, ChatArea flex-1, RightPanel 500px) menggunakan fixed width tanpa breakpoint apapun. Di mobile, ketiganya berdesakan dan tidak bisa diakses. Prioritas utama user: sidebar kanan (silabus) bisa dibuka di mobile.

---

## Pendekatan: Mobile = satu kolom, panel sebagai overlay/drawer

Di mobile (`< md / 768px`):
- **Hanya ChatArea yang tampil** sebagai full screen
- **LeftSidebar** → overlay drawer dari kiri (slide in), dipicu tombol hamburger di header
- **RightPanel** → overlay drawer dari kanan, dipicu tombol yang sudah ada (PanelRight icon di header)
- **Backdrop** gelap muncul saat salah satu drawer terbuka, klik backdrop tutup drawer

Di desktop (`≥ md`): perilaku saat ini tetap (3 kolom, collapsed/expanded sidebar kiri).

---

## Perubahan per file

### 1. `src/app/App.tsx`
- Tambah state `mobileLeftOpen` dan `mobileRightOpen` (khusus mobile)
- Di mobile: render LeftSidebar & RightPanel sebagai overlay di atas ChatArea (absolute/fixed + z-index), bukan di dalam flex row
- Deteksi mobile via custom hook `useIsMobile()` yang sudah ada di `src/app/components/ui/use-mobile.ts`
- Pass prop baru `mobileOpen` & `onClose` ke LeftSidebar dan RightPanel

### 2. `src/app/components/chat-area.tsx`
- Header: di mobile, tampilkan ikon hamburger (Menu) di kiri untuk buka left drawer
- Icon PanelRight yang sudah ada tetap berfungsi buka right panel (mobile: buka drawer, desktop: toggle kolom)
- Composer: padding disesuaikan untuk layar kecil (`px-3 md:px-6`)
- Messages area: padding disesuaikan (`px-3 md:px-6`)

### 3. `src/app/components/left-sidebar.tsx`
- Di mobile: sidebar selalu render mode "expanded" (full width 280px), tapi posisinya `fixed inset-y-0 left-0 z-50` dengan translasi
- Tambah prop `mobileOpen?: boolean` — saat false: `translate-x-[-100%]`, saat true: `translate-x-0`, pakai `transition-transform duration-300`
- Di desktop: perilaku collapsed/expanded yang sudah ada tidak berubah

### 4. `src/app/components/right-panel.tsx`
- Di mobile: posisi `fixed inset-y-0 right-0 z-50 w-[min(300px,100vw)]` dengan translasi
- Tambah prop `mobileOpen?: boolean` — saat false: `translate-x-full`, saat true: `translate-x-0`, transition smooth
- Di desktop: posisi statis seperti sekarang

### 5. Backdrop (baru, inline di App.tsx)
- `<div className="fixed inset-0 z-40 bg-black/40 md:hidden">` muncul saat salah satu drawer mobile terbuka
- Klik backdrop → tutup semua drawer

---

## Pattern implementasi

```tsx
// App.tsx (mobile logic)
const isMobile = useIsMobile(); // dari use-mobile.ts
const [mobileLeftOpen, setMobileLeftOpen] = useState(false);
const [mobileRightOpen, setMobileRightOpen] = useState(false);

// Backdrop
{isMobile && (mobileLeftOpen || mobileRightOpen) && (
  <div className="fixed inset-0 z-40 bg-black/40 md:hidden"
    onClick={() => { setMobileLeftOpen(false); setMobileRightOpen(false); }}
  />
)}

// LeftSidebar — desktop: in flex row, mobile: fixed overlay
<LeftSidebar
  collapsed={leftCollapsed}           // desktop
  onToggle={() => setLeftCollapsed(v => !v)}
  mobileOpen={mobileLeftOpen}         // mobile
  onMobileClose={() => setMobileLeftOpen(false)}
/>

// RightPanel — desktop: conditional render in flex, mobile: always rendered as fixed overlay
<RightPanel mobileOpen={mobileRightOpen} onMobileClose={() => setMobileRightOpen(false)} />
```

```tsx
// left-sidebar.tsx — mobile overlay wrapper
<aside className={`
  ... existing desktop classes ...
  fixed md:relative inset-y-0 left-0 z-50
  transition-transform duration-300
  ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
  md:translate-x-0
`}>
```

```tsx
// right-panel.tsx — mobile overlay wrapper  
<aside className={`
  ... existing desktop classes ...
  fixed md:relative inset-y-0 right-0 z-50
  transition-transform duration-300
  ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}
  md:translate-x-0
`}>
```

---

## Reuse existing
- `useIsMobile()` hook: `src/app/components/ui/use-mobile.ts` — sudah ada, pakai langsung
- State toggle right panel yang sudah ada di App.tsx — diperluas untuk handle mobile juga
- `PanelRight` icon button di chat header — tinggal disambungkan ke `setMobileRightOpen(true)` saat mobile

---

## Verifikasi
1. Buka di browser, resize window ke < 768px
2. Pastikan hanya ChatArea yang tampil (sidebar kiri & kanan tidak mengambil space)
3. Klik icon hamburger di header → left drawer muncul dari kiri dengan smooth transition
4. Klik icon PanelRight di header → right drawer (silabus) muncul dari kanan
5. Klik backdrop gelap → semua drawer tertutup
6. Resize ke desktop → kembali ke layout 3 kolom normal
7. Test expand/collapse accordion silabus di dalam mobile drawer
