"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { UserSession } from "@/lib/supabase";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Menu } from "lucide-react";
import { ChevronDown, ChevronUp } from "lucide-react";

// Define the DocsRoute type
type DocsRoute = {
  path: string;
  label: string;
};

type DocsRouteTree = DocsRoute & { children?: DocsRouteTree[] };

function SidebarTree({
  nodes,
  pathname,
  onNavigate,
}: {
  nodes: DocsRouteTree[];
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <ul className="pl-2">
      {nodes.map((node) => (
        <li key={node.label + (node.path || "")}>
          {node.path ? (
            <Link
              href={node.path}
              onClick={() => {
                if (onNavigate) onNavigate();
              }}
            >
              <Card
                className={cn(
                  "cursor-pointer px-4 py-2 text-sm transition-all hover:bg-primary/10",
                  pathname === node.path &&
                    "bg-primary text-white hover:bg-primary"
                )}
              >
                {node.label}
              </Card>
            </Link>
          ) : (
            <div className="flex items-center gap-1 px-4 py-2 text-sm text-muted-foreground">
              <span role="img" aria-label="folder">
                📁
              </span>{" "}
              {node.label}
            </div>
          )}
          {node.children && node.children.length > 0 && (
            <SidebarTree
              nodes={node.children}
              pathname={pathname}
              onNavigate={onNavigate}
            />
          )}
        </li>
      ))}
    </ul>
  );
}

function Breadcrumb({ pathname }: { pathname: string }) {
  const parts = pathname
    .replace(/^\/|\/$/g, "")
    .split("/")
    .filter(Boolean);

  let href = "";
  // Ambil semua path yang valid dari routes (hanya yang ada page.mdx)
  // routes diambil dari context DocsLayout
  const [routes, setRoutes] = useState<DocsRouteTree[]>([]);
  useEffect(() => {
    // fetchRoutes sudah dilakukan di DocsLayout, jadi bisa di-pass via props/context
    // Untuk demo, biarkan kosong jika tidak ada akses ke routes
  }, []);

  // Helper untuk cek apakah path ada di routes (ada page.mdx)
  function isValidPath(path: string, nodes: DocsRouteTree[]): boolean {
    for (const node of nodes) {
      if (node.path === path) return true;
      if (node.children && isValidPath(path, node.children)) return true;
    }
    return false;
  }

  return (
    <nav className="text-sm mb-4" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1">
        <li>
          <Link href="/" className="text-muted-foreground hover:underline">
            Home
          </Link>
        </li>
        {parts.map((part, idx) => {
          // Hilangkan angka di depan dan strip, kapitalisasi tiap kata
          const clean = part.replace(/^\d+-/, "").replace(/-/g, " ");
          const label = clean.replace(/\b\w/g, (c) => c.toUpperCase());
          href += "/" + part;
          const isLast = idx === parts.length - 1;
          // Cek apakah path valid (ada page.mdx)
          // Jika tidak ada akses ke routes, asumsikan semua valid kecuali last
          const valid = routes.length ? isValidPath(href, routes) : !isLast;
          return (
            <li key={href} className="flex items-center gap-1">
              <span className="mx-1 text-muted-foreground">/</span>
              {isLast || !valid ? (
                <span className="font-semibold">{label}</span>
              ) : (
                <Link
                  href={href}
                  className="text-muted-foreground hover:underline"
                >
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Table of Contents component
function TableOfContents({
  contentRoot,
}: {
  contentRoot: React.RefObject<HTMLDivElement>;
}) {
  const [headings, setHeadings] = useState<
    { id: string; text: string; level: number }[]
  >([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const pathname = usePathname();

  // Generate ToC and auto-id
  useEffect(() => {
    if (!contentRoot.current) return;

    // Delay agar konten ter-render sepenuhnya
    const timeout = setTimeout(() => {
      const selector = "h2, h3, h4";
      const nodes = Array.from(contentRoot.current!.querySelectorAll(selector));
      const items = nodes.map((node) => {
        let id = node.id;
        if (!id) {
          id = slugify(node.textContent || "");
          node.id = id;
        }
        return {
          id,
          text: node.textContent || "",
          level: node.tagName === "H2" ? 2 : node.tagName === "H3" ? 3 : 4,
        };
      });
      setHeadings(items);
    }, 100); // Delay 100ms

    return () => clearTimeout(timeout);
  }, [pathname, contentRoot.current]);

  // useEffect(() => {
  //   if (!contentRoot.current) return;
  //   const selector = "h2, h3, h4";
  //   const nodes = Array.from(contentRoot.current.querySelectorAll(selector));
  //   const items = nodes.map((node) => {
  //     let id = node.id;
  //     if (!id) {
  //       id = slugify(node.textContent || "");
  //       node.id = id;
  //     }
  //     return {
  //       id,
  //       text: node.textContent || "",
  //       level: node.tagName === "H2" ? 2 : node.tagName === "H3" ? 3 : 4,
  //     };
  //   });
  //   setHeadings(items);
  // }, [contentRoot.current]);

  // Scrollspy
  // useEffect(() => {
  //   if (!headings.length) return;
  //   const handleScroll = () => {
  //     const scrollY = window.scrollY + 100; // offset for sticky header
  //     let currentId = headings[0]?.id;
  //     for (const h of headings) {
  //       const el = document.getElementById(h.id);
  //       if (el && el.offsetTop <= scrollY) {
  //         currentId = h.id;
  //       }
  //     }
  //     setActiveId(currentId);
  //   };
  //   window.addEventListener("scroll", handleScroll, { passive: true });
  //   handleScroll();
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [headings]);

  useEffect(() => {
    if (!headings.length) return;

    const handleScroll = () => {
      const scrollY = window.scrollY + 100;
      let currentId = headings[0]?.id;
      for (const h of headings) {
        const el = document.getElementById(h.id);
        if (el && el.offsetTop <= scrollY) {
          currentId = h.id;
        }
      }
      setActiveId(currentId);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings]);

  // Smooth scroll handler
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 90, // offset for sticky header
        behavior: "smooth",
      });
      // Update hash in URL without jumping
      history.replaceState(null, "", `#${id}`);
    }
  };

  if (headings.length === 0) return null;

  return (
    <nav aria-label="On this page" className="text-sm">
      <div className="font-semibold mb-2">On this page</div>
      <ul className="space-y-1">
        {headings.map((h) => (
          <li
            key={h.id}
            className={
              (h.level === 3 ? "ml-4 " : h.level === 4 ? "ml-8 " : "") +
              (activeId === h.id ? "font-bold text-primary" : "")
            }
          >
            <a
              href={`#${h.id}`}
              onClick={(e) => handleClick(e, h.id)}
              className={
                "hover:underline text-muted-foreground block transition-colors " +
                (activeId === h.id ? "text-primary" : "")
              }
              aria-current={activeId === h.id ? "location" : undefined}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<UserSession | null>(null);
  const [routes, setRoutes] = useState<DocsRouteTree[]>([]);
  const [sidebarLoading, setSidebarLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [tocOpen, setTocOpen] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const currentSession = await getSession();

      if (!currentSession.user || !currentSession.user.email) {
        setSession(null);
        setIsLoading(false);
        router.push("/login");
        return;
      }

      setSession({
        ...currentSession,
        user: {
          ...(currentSession.user as any),
          email: currentSession.user.email as string,
        },
      });
      setIsLoading(false);
    };

    checkSession();
  }, [router]);

  useEffect(() => {
    const fetchRoutes = async () => {
      setSidebarLoading(true);
      const res = await fetch("/api/docs-routes");
      const data = await res.json();
      setRoutes(data);
      setSidebarLoading(false);
    };
    fetchRoutes();
  }, []);

  if (!session || isLoading) {
    return (
      <div className="container flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent" />
          <p className="text-sm text-muted-foreground">
            Checking authentication...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Drawer for mobile, trigger at bottom right */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerTrigger asChild>
            <Button
              variant="secondary"
              size="icon"
              aria-label="Open sidebar"
              className="shadow-lg rounded-full"
              onClick={() => setDrawerOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="p-0 w-64">
            {sidebarLoading ? (
              <div className="flex h-40 items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent" />
              </div>
            ) : (
              <ScrollArea className="h-full max-h-screen pr-2 overflow-auto">
                <nav>
                  <SidebarTree
                    nodes={routes}
                    pathname={pathname}
                    onNavigate={() => setDrawerOpen(false)}
                  />
                </nav>
              </ScrollArea>
            )}
          </DrawerContent>
        </Drawer>
      </div>

      <div className="flex flex-1 flex-row">
        {/* Sidebar kiri */}
        <aside
          className={cn(
            "hidden md:flex flex-col w-64 p-4 z-40",
            "fixed left-6 top-[100px]",
            "rounded-xl shadow-lg bg-muted/40 border"
          )}
          style={{ maxHeight: "calc(100vh - 120px)", overflowY: "auto" }}
        >
          <div className="md:sticky md:top-0 h-full">
            {sidebarLoading ? (
              <div className="flex h-40 items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent" />
              </div>
            ) : (
              <ScrollArea className="h-full pr-2">
                <nav>
                  <SidebarTree nodes={routes} pathname={pathname} />
                </nav>
              </ScrollArea>
            )}
          </div>
        </aside>

        {/* Spacer agar konten tidak tertutup sidebar kiri */}
        <div className="hidden md:block w-64" />

        {/* Konten utama */}
        <main className="flex-1 p-6 overflow-auto flex flex-col gap-8">
          {/* Mobile TOC */}
          <div className="md:hidden mb-4">
            <button
              className="flex items-center gap-2 font-semibold text-muted-foreground"
              onClick={() => setTocOpen((v) => !v)}
              aria-expanded={tocOpen}
              aria-controls="mobile-toc"
            >
              On this page
              {tocOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
            {tocOpen && (
              <div
                id="mobile-toc"
                className="mt-2 rounded border bg-muted/40 p-3"
              >
                <TableOfContents contentRoot={contentRef} />
              </div>
            )}
          </div>
          <Breadcrumb pathname={pathname} />
          <div ref={contentRef}>{children}</div>
        </main>

        {/* TOC Desktop */}
        <aside
          className="hidden md:block w-64 shrink-0 sticky top-[100px] self-start h-fit"
          style={{ maxHeight: "calc(100vh - 120px)" }}
        >
          <div className="rounded-xl border bg-muted/40 p-4">
            <TableOfContents contentRoot={contentRef} />
          </div>
        </aside>
      </div>
    </div>
  );
}
