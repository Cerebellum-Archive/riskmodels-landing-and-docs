"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { BookText, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { getSession, signOut } from "@/lib/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserSession } from "@/lib/supabase";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userSession, setUserSession] = useState<UserSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    async function loadSession() {
      const result = await getSession();
      if (result?.user && result.user.email) {
        setUserSession({
          user: {
            id: result.user.id,
            email: result.user.email,
            user_metadata: {
              full_name: result.user.user_metadata?.full_name,
              name: result.user.user_metadata?.name,
              avatar_url: result.user.user_metadata?.avatar_url,
            },
          },
          session: result.session ?? null,
          error: result.error ?? null,
        });
      } else {
        setUserSession(null);
      }
      setIsLoading(false);
    }

    loadSession();

    // Listen for login/logout events
    const handleAuthChange = () => loadSession();
    window.addEventListener("authChanged", handleAuthChange);

    return () => {
      window.removeEventListener("authChanged", handleAuthChange);
    };
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setUserSession(null);
    if (pathname.startsWith("/docs")) {
      router.push("/");
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const userName =
    userSession?.user?.user_metadata?.name ||
    userSession?.user?.user_metadata?.full_name ||
    userSession?.user?.email?.split("@")[0] ||
    "User";

  const userInitial = userName.charAt(0).toUpperCase();
  const avatarUrl = userSession?.user?.user_metadata?.avatar_url;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center space-x-2"
            onClick={closeMenu}
          >
            <BookText className="h-6 w-6" />
            <span className="font-bold">RiskModels</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:gap-6">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname === "/" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Home
          </Link>
          <Link
            href="/docs"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname === "/docs" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Documentation
          </Link>
        </nav>

        {/* Desktop Auth Controls */}
        <div className="hidden md:flex md:items-center md:gap-4">
          <ThemeToggle />
          {!isLoading && (
            <>
              {userSession?.user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-9 w-9 rounded-full"
                    >
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={avatarUrl} alt={userName} />
                        <AvatarFallback>{userInitial}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>{userName}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/docs">Documentation</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleSignOut}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button asChild variant="default">
                  <Link href="/login">Login</Link>
                </Button>
              )}
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden px-4 md:px-8">
          <nav className="flex flex-col space-y-3 py-4">
            <Link
              href="/"
              onClick={closeMenu}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Home
            </Link>
            <Link
              href="/docs"
              onClick={closeMenu}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/docs" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Documentation
            </Link>
            <div className="pt-2">
              {!isLoading &&
                (userSession?.user ? (
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 py-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={avatarUrl} alt={userName} />
                        <AvatarFallback>{userInitial}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{userName}</span>
                    </div>
                    <Button
                      onClick={handleSignOut}
                      variant="outline"
                      className="w-full justify-start"
                    >
                      Logout
                    </Button>
                  </div>
                ) : (
                  <Button asChild className="w-full" onClick={closeMenu}>
                    <Link href="/login">Login</Link>
                  </Button>
                ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
