import { useState } from "react";
import {
  BookOpen,
  Clock,
  Play,
  RotateCcw,
  ChevronDown,
  X,
} from "lucide-react";

interface Materi {
  title: string;
  dur: string;
  desc: string;
}

interface Module {
  id: number;
  title: string;
  est: string;
  materi: Materi[];
}

const modules: Module[] = [
  {
    id: 1,
    title: "Pengenalan Python",
    est: "3 hari",
    materi: [
      {
        title: "Setup & Instalasi",
        dur: "30m",
        desc: "Kita akan mempelajari cara mempersiapkan lingkungan pengembangan Python. Hal-hal yang dipelajari seperti instalasi Python, pip, virtual environment, VS Code, ekstensi Python.",
      },
      {
        title: "Variabel & Tipe Data",
        dur: "45m",
        desc: "Kita akan mempelajari cara menyimpan dan mengelola data di Python. Hal-hal yang dipelajari seperti integer, float, string, boolean, None, type casting, naming convention.",
      },
      {
        title: "Input & Output",
        dur: "30m",
        desc: "Kita akan mempelajari cara menerima dan menampilkan data ke pengguna. Hal-hal yang dipelajari seperti print(), input(), format string, f-string, escape character.",
      },
      {
        title: "Komentar & Dokumentasi",
        dur: "20m",
        desc: "Kita akan mempelajari cara menulis kode yang mudah dipahami. Hal-hal yang dipelajari seperti single-line comment, multi-line comment, docstring, best practice dokumentasi.",
      },
      {
        title: "Menjalankan Script",
        dur: "25m",
        desc: "Kita akan mempelajari cara mengeksekusi program Python. Hal-hal yang dipelajari seperti terminal, command line, argumen script, shebang line, mode interaktif.",
      },
    ],
  },
  {
    id: 2,
    title: "Kontrol Alur",
    est: "4 hari",
    materi: [
      {
        title: "If / Elif / Else",
        dur: "45m",
        desc: "Kita akan mempelajari cara membuat keputusan dalam program. Hal-hal yang dipelajari seperti kondisi boolean, operator perbandingan, operator logika, nested if, ternary expression.",
      },
      {
        title: "Loop For",
        dur: "60m",
        desc: "Kita akan mempelajari cara mengulang eksekusi kode secara terstruktur. Hal-hal yang dipelajari seperti range(), iterasi list, enumerate(), zip(), iterasi dictionary.",
      },
      {
        title: "Loop While",
        dur: "50m",
        desc: "Kita akan mempelajari cara mengulang kode selama kondisi terpenuhi. Hal-hal yang dipelajari seperti kondisi while, infinite loop, flag variable, do-while pattern.",
      },
      {
        title: "Break & Continue",
        dur: "30m",
        desc: "Kita akan mempelajari cara mengontrol alur loop secara detail. Hal-hal yang dipelajari seperti break, continue, pass, else pada loop, penggunaan bersama nested loop.",
      },
      {
        title: "Nested Loop",
        dur: "40m",
        desc: "Kita akan mempelajari cara membuat loop di dalam loop. Hal-hal yang dipelajari seperti matriks 2D, pola bintang, kompleksitas waktu, optimasi nested loop.",
      },
    ],
  },
  {
    id: 3,
    title: "Fungsi & Modul",
    est: "4 hari",
    materi: [
      {
        title: "Definisi Fungsi",
        dur: "40m",
        desc: "Kita akan mempelajari cara membuat blok kode yang dapat digunakan ulang. Hal-hal yang dipelajari seperti def, nama fungsi, indentasi, scope variabel, fungsi tanpa return.",
      },
      {
        title: "Parameter & Return",
        dur: "45m",
        desc: "Kita akan mempelajari cara mengirim dan menerima data dari fungsi. Hal-hal yang dipelajari seperti positional args, keyword args, default value, *args, **kwargs, multiple return.",
      },
      {
        title: "Lambda & Closure",
        dur: "50m",
        desc: "Kita akan mempelajari fungsi anonim dan fungsi bertingkat. Hal-hal yang dipelajari seperti lambda expression, map(), filter(), sorted(), closure, free variable.",
      },
      {
        title: "Import Modul",
        dur: "35m",
        desc: "Kita akan mempelajari cara menggunakan kode dari file lain. Hal-hal yang dipelajari seperti import, from...import, alias as, __name__, sys.path, modul bawaan.",
      },
      {
        title: "Membuat Package",
        dur: "40m",
        desc: "Kita akan mempelajari cara mengorganisasi kode menjadi package. Hal-hal yang dipelajari seperti struktur folder, __init__.py, relative import, absolute import, distribusi package.",
      },
    ],
  },
  {
    id: 4,
    title: "Struktur Data",
    est: "5 hari",
    materi: [
      {
        title: "List & Tuple",
        dur: "50m",
        desc: "Kita akan mempelajari cara menyimpan koleksi data berurutan. Hal-hal yang dipelajari seperti indexing, slicing, append, remove, sort, tuple immutability, unpacking.",
      },
      {
        title: "Dictionary",
        dur: "55m",
        desc: "Kita akan mempelajari cara menyimpan data dengan pasangan key-value. Hal-hal yang dipelajari seperti get(), update(), keys(), values(), items(), nested dict, dict comprehension.",
      },
      {
        title: "Set",
        dur: "35m",
        desc: "Kita akan mempelajari koleksi data unik tanpa urutan. Hal-hal yang dipelajari seperti add(), remove(), union, intersection, difference, frozenset, operasi himpunan.",
      },
      {
        title: "List Comprehension",
        dur: "45m",
        desc: "Kita akan mempelajari cara membuat list secara ringkas dan efisien. Hal-hal yang dipelajari seperti sintaks comprehension, kondisi filter, nested comprehension, dict & set comprehension.",
      },
      {
        title: "Stack & Queue",
        dur: "50m",
        desc: "Kita akan mempelajari struktur data abstrak berbasis list. Hal-hal yang dipelajari seperti LIFO, FIFO, deque, collections.deque, push, pop, enqueue, dequeue.",
      },
    ],
  },
  {
    id: 5,
    title: "OOP Dasar",
    est: "5 hari",
    materi: [
      {
        title: "Class & Object",
        dur: "60m",
        desc: "Kita akan mempelajari konsep dasar pemrograman berorientasi objek. Hal-hal yang dipelajari seperti class, object, instance, __init__, self, blueprint vs instance.",
      },
      {
        title: "Atribut & Method",
        dur: "50m",
        desc: "Kita akan mempelajari cara mendefinisikan data dan perilaku objek. Hal-hal yang dipelajari seperti instance attribute, class attribute, instance method, class method, static method.",
      },
      {
        title: "Inheritance",
        dur: "55m",
        desc: "Kita akan mempelajari cara mewarisi properti dari class lain. Hal-hal yang dipelajari seperti parent class, child class, super(), method overriding, multiple inheritance, MRO.",
      },
      {
        title: "Encapsulation",
        dur: "45m",
        desc: "Kita akan mempelajari cara melindungi data dalam objek. Hal-hal yang dipelajari seperti public, protected, private attribute, getter, setter, property decorator.",
      },
      {
        title: "Polymorphism",
        dur: "50m",
        desc: "Kita akan mempelajari cara menggunakan satu interface untuk berbagai tipe. Hal-hal yang dipelajari seperti method overriding, duck typing, abstract class, interface, isinstance().",
      },
    ],
  },
  {
    id: 6,
    title: "Error Handling",
    est: "3 hari",
    materi: [
      {
        title: "Try / Except / Finally",
        dur: "40m",
        desc: "Kita akan mempelajari cara menangani kesalahan program dengan elegan. Hal-hal yang dipelajari seperti try, except, else, finally, multiple except, exception hierarchy.",
      },
      {
        title: "Custom Exception",
        dur: "35m",
        desc: "Kita akan mempelajari cara membuat tipe error sendiri. Hal-hal yang dipelajari seperti class exception custom, raise, re-raise, pesan error informatif, error chaining.",
      },
      {
        title: "Logging",
        dur: "30m",
        desc: "Kita akan mempelajari cara mencatat aktivitas program secara terstruktur. Hal-hal yang dipelajari seperti logging module, level log, handler, formatter, file log, rotating log.",
      },
      {
        title: "Debugging Dasar",
        dur: "40m",
        desc: "Kita akan mempelajari cara menemukan dan memperbaiki bug. Hal-hal yang dipelajari seperti print debugging, pdb, breakpoint, step over, inspect variable, traceback.",
      },
      {
        title: "Unit Testing",
        dur: "50m",
        desc: "Kita akan mempelajari cara menulis pengujian otomatis untuk kode. Hal-hal yang dipelajari seperti unittest, assert, test case, setUp, tearDown, mock, pytest dasar.",
      },
    ],
  },
  {
    id: 7,
    title: "File & I/O",
    est: "3 hari",
    materi: [
      {
        title: "Baca & Tulis File",
        dur: "45m",
        desc: "Kita akan mempelajari cara berinteraksi dengan file di sistem. Hal-hal yang dipelajari seperti open(), read(), write(), readlines(), mode r/w/a/b, encoding, close().",
      },
      {
        title: "File CSV",
        dur: "40m",
        desc: "Kita akan mempelajari cara memproses data tabular dalam format CSV. Hal-hal yang dipelajari seperti csv module, reader, writer, DictReader, DictWriter, delimiter, quoting.",
      },
      {
        title: "File JSON",
        dur: "40m",
        desc: "Kita akan mempelajari cara bekerja dengan format data JSON. Hal-hal yang dipelajari seperti json.load(), json.dump(), serialisasi, deserialisasi, indent, ensure_ascii.",
      },
      {
        title: "Path & OS Module",
        dur: "30m",
        desc: "Kita akan mempelajari cara berinteraksi dengan sistem file OS. Hal-hal yang dipelajari seperti os.path, pathlib, exists(), mkdir(), listdir(), rename(), getcwd().",
      },
      {
        title: "Context Manager",
        dur: "35m",
        desc: "Kita akan mempelajari pola pengelolaan resource yang aman. Hal-hal yang dipelajari seperti with statement, __enter__, __exit__, contextlib, custom context manager.",
      },
    ],
  },
  {
    id: 8,
    title: "Library Populer",
    est: "6 hari",
    materi: [
      {
        title: "NumPy Dasar",
        dur: "60m",
        desc: "Kita akan mempelajari komputasi numerik dengan array multidimensi. Hal-hal yang dipelajari seperti ndarray, shape, dtype, indexing, slicing, operasi matematika, broadcasting.",
      },
      {
        title: "Pandas Dasar",
        dur: "75m",
        desc: "Kita akan mempelajari analisis dan manipulasi data tabular. Hal-hal yang dipelajari seperti DataFrame, Series, read_csv, groupby, merge, fillna, loc, iloc.",
      },
      {
        title: "Matplotlib",
        dur: "60m",
        desc: "Kita akan mempelajari cara membuat visualisasi data. Hal-hal yang dipelajari seperti plot(), scatter(), bar(), histogram, title, xlabel, ylabel, legend, subplot.",
      },
      {
        title: "Requests (HTTP)",
        dur: "45m",
        desc: "Kita akan mempelajari cara berkomunikasi dengan API web. Hal-hal yang dipelajari seperti GET, POST, headers, params, response, status code, JSON parsing, session.",
      },
      {
        title: "BeautifulSoup",
        dur: "55m",
        desc: "Kita akan mempelajari cara mengekstrak data dari halaman web. Hal-hal yang dipelajari seperti parsing HTML, find(), find_all(), CSS selector, atribut tag, navigasi tree.",
      },
    ],
  },
  {
    id: 9,
    title: "Database & SQL",
    est: "5 hari",
    materi: [
      {
        title: "SQLite dengan Python",
        dur: "55m",
        desc: "Kita akan mempelajari cara menggunakan database ringan bawaan Python. Hal-hal yang dipelajari seperti sqlite3, connect(), cursor, execute(), fetchall(), commit(), close().",
      },
      {
        title: "CRUD Operasi",
        dur: "60m",
        desc: "Kita akan mempelajari operasi dasar database Create, Read, Update, Delete. Hal-hal yang dipelajari seperti INSERT, SELECT, UPDATE, DELETE, WHERE, parameterized query.",
      },
      {
        title: "ORM dengan SQLAlchemy",
        dur: "65m",
        desc: "Kita akan mempelajari cara berinteraksi database tanpa menulis SQL langsung. Hal-hal yang dipelajari seperti model class, session, query, filter, relationship, migration.",
      },
      {
        title: "Migrasi Database",
        dur: "40m",
        desc: "Kita akan mempelajari cara mengelola perubahan skema database. Hal-hal yang dipelajari seperti Alembic, revision, upgrade, downgrade, autogenerate, version history.",
      },
      {
        title: "Koneksi PostgreSQL",
        dur: "45m",
        desc: "Kita akan mempelajari cara menghubungkan Python ke database production. Hal-hal yang dipelajari seperti psycopg2, connection string, environment variable, connection pool, SSL.",
      },
    ],
  },
  {
    id: 10,
    title: "Project Akhir",
    est: "7 hari",
    materi: [
      {
        title: "Perencanaan Project",
        dur: "45m",
        desc: "Kita akan mempelajari cara merancang project secara profesional. Hal-hal yang dipelajari seperti requirement analysis, ERD, wireframe, tech stack, timeline, Git init.",
      },
      {
        title: "Struktur Folder",
        dur: "30m",
        desc: "Kita akan mempelajari cara mengorganisasi kode project yang baik. Hal-hal yang dipelajari seperti MVC pattern, src layout, config, .env, .gitignore, README.",
      },
      {
        title: "Implementasi Fitur",
        dur: "90m",
        desc: "Kita akan mempelajari cara membangun fitur utama project secara nyata. Hal-hal yang dipelajari seperti coding fitur, integrasi database, API call, error handling, refactoring.",
      },
      {
        title: "Testing & Debugging",
        dur: "60m",
        desc: "Kita akan mempelajari cara memastikan kode berjalan dengan benar. Hal-hal yang dipelajari seperti test plan, unit test, integration test, bug report, fix iteration.",
      },
      {
        title: "Dokumentasi & Deploy",
        dur: "60m",
        desc: "Kita akan mempelajari cara mempublikasikan project ke dunia nyata. Hal-hal yang dipelajari seperti README, docstring, requirements.txt, Heroku, Railway, environment setup.",
      },
    ],
  },
];

function MateriItem({ m }: { m: Materi }) {
  const [open, setOpen] = useState(false);
  return (
    <li>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-1.5 pl-6 pr-1 text-left"
      >
        <div className="flex items-center gap-2 min-w-0">
          <ChevronDown
            className={`size-3 shrink-0 text-muted-foreground/50 transition-transform duration-200 ${open ? "rotate-0" : "-rotate-90"}`}
          />
          <span
            className={`text-[12px] ${open ? "text-[#2563eb]" : "text-foreground/70"}`}
          >
            {m.title}
          </span>
        </div>
        <span className="ml-2 shrink-0 text-[10.5px] text-muted-foreground/60">
          {m.dur}
        </span>
      </button>
      {open && (
        <p className="pb-2 pl-11 pr-1 text-[11.5px] leading-relaxed text-muted-foreground">
          {m.desc}
        </p>
      )}
    </li>
  );
}

function ModuleItem({ mod }: { mod: Module }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border/50 last:border-b-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-2.5 pr-1 text-left"
      >
        <div className="flex items-center gap-2.5">
          <span className="flex size-5 items-center justify-center rounded-full bg-[#2563eb]/10 text-[10px] font-bold text-[#2563eb] shrink-0">
            {mod.id}
          </span>
          <span className="text-[13px] font-semibold text-foreground">
            {mod.title}
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-2">
          <span className="text-[10.5px] text-muted-foreground">
            {mod.est}
          </span>
          <ChevronDown
            className={`size-3.5 text-muted-foreground transition-transform duration-200 ${open ? "rotate-0" : "-rotate-90"}`}
          />
        </div>
      </button>

      {open && (
        <ul className="pb-2">
          {mod.materi.map((m, i) => (
            <MateriItem key={i} m={m} />
          ))}
        </ul>
      )}
    </div>
  );
}

const totalDur = "~18 jam";
const totalDays = "45 hari";

interface RightPanelProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
  desktopVisible?: boolean;
}

export function RightPanel({ mobileOpen = false, onMobileClose, desktopVisible = true }: RightPanelProps) {
  // On desktop: hide entirely when desktopVisible is false
  // On mobile: always render but slide in/out
  return (
    <aside className={`
      flex h-full shrink-0 flex-col border-l border-border bg-white
      fixed inset-0 z-50 w-full transition-transform duration-300
      md:relative md:inset-auto md:w-[300px] md:z-auto
      ${mobileOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"}
      ${!desktopVisible ? "md:hidden" : ""}
    `}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3.5">
        <div className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-md bg-[#2563eb]/10">
            <BookOpen className="size-4 text-[#2563eb]" />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Silabus</p>
            <p className="text-[13px] font-semibold text-foreground">Python Automation</p>
          </div>
        </div>
        {/* Close button — mobile only */}
        {onMobileClose && (
          <button onClick={onMobileClose} className="md:hidden text-muted-foreground hover:text-foreground">
            <X className="size-5" />
          </button>
        )}
      </div>

      {/* Total summary */}
      <div className="flex items-center gap-3 border-b border-border bg-muted/40 px-4 py-2.5">
        <Clock className="size-3.5 shrink-0 text-muted-foreground" />
        <p className="text-[12px] text-muted-foreground">
          Total:{" "}
          <span className="font-semibold text-foreground">
            {totalDur}
          </span>
          <span className="mx-1.5 text-border">·</span>
          <span className="font-semibold text-foreground">
            {totalDays}
          </span>
          <span className="ml-1">estimasi</span>
        </p>
      </div>

      {/* Scrollable module list */}
      <div className="flex-1 overflow-y-auto px-4 py-2 [scrollbar-color:#d1d5db_transparent] [scrollbar-width:thin]">
        {modules.map((mod) => (
          <ModuleItem key={mod.id} mod={mod} />
        ))}
      </div>

      {/* Footer actions */}
      <div className="space-y-2 border-t border-border p-3">
        <button className="btn-primary flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-[13px] font-medium">
          <Play className="size-4" />
          Mulai Belajar
        </button>
        <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-border py-2 text-[12.5px] font-medium text-foreground/80 transition-colors hover:bg-muted">
          <RotateCcw className="size-3.5" />
          Revisi Silabus
        </button>
      </div>
    </aside>
  );
}