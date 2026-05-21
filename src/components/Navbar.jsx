"use client";
import { Sun, Moon, Lightbulb, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Avatar, Spinner } from "@heroui/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { LogOut } from "lucide-react";

export default function AppNavbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const [logoutLoading, setLogoutLoading] = useState(false);
  const { data: session, isPending: isSessionLoading } =
    authClient.useSession();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Logged out successfully!");
            setIsOpen(false);
            router.push("/login");
            router.refresh();
          },
        },
      });
    } catch (err) {
      toast.error("Logout failed.");
    } finally {
      setLogoutLoading(false);
    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Ideas", href: "/ideas" },
    { name: "Add Idea", href: "/add-idea" },
    { name: "My Ideas", href: "/my-ideas" },
    { name: "My Interactions", href: "/my-interactions" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-black/70 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Lightbulb className="text-blue-600 dark:text-blue-500" size={26} />
            <span className="font-black text-xl sm:text-2xl tracking-tight text-blue-600 dark:text-blue-500">
              Idea<span className="text-black dark:text-white">Vault</span>
            </span>
          </Link>
        </div>

        {/* Main Nav Links (Centered) */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-neutral-600 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center gap-4">
          {/* Dark/Light Theme Toggle*/}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors h-9 w-9 flex items-center justify-center"
          >
            {mounted ? (
              theme === "dark" ? (
                <Sun size={20} className="text-amber-500" />
              ) : (
                <Moon size={20} className="text-blue-600" />
              )
            ) : (
              <div className="h-5 w-5" />
            )}
          </button>

          {isSessionLoading ? (
            <Spinner size="sm" color="blue" />
          ) : session ? (
            <div className="flex items-center gap-3">
              <Avatar
                src={session.user?.image || ""}
                name={session.user?.name || "U"}
                size="sm"
                radius="full"
                isBordered
                color="blue"
              />
              <button
                onClick={handleLogout}
                disabled={logoutLoading}
                className="hidden sm:flex bg-red-500 hover:bg-red-600 text-white font-semibold text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-md transition-all items-center gap-1 cursor-pointer"
              >
                <LogOut size={14} />
                {logoutLoading ? "..." : "Log Out"}
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden sm:inline-block text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-blue-600 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-full shadow-md transition-all"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black transition-all duration-300">
          <div className="px-4 pt-2 pb-4 space-y-2 flex flex-col font-medium text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-blue-600 dark:hover:text-blue-500 transition-all"
              >
                {link.name}
              </Link>
            ))}

            {!isSessionLoading &&
              (session ? (
                <div className="border-t border-neutral-100 dark:border-neutral-900 pt-3 flex flex-col gap-2">
                  <div className="px-2 text-xs text-neutral-500">
                    Logged in as:{" "}
                    <span className="font-bold">{session.user?.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    disabled={logoutLoading}
                    className="w-full text-left p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 flex items-center gap-2 font-semibold transition-all cursor-pointer"
                  >
                    <LogOut size={16} />
                    {logoutLoading ? "Logging out..." : "Log Out"}
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-blue-600 transition-all border-t border-neutral-100 dark:border-neutral-900 pt-3"
                >
                  Login
                </Link>
              ))}
          </div>
        </div>
      )}
    </nav>
  );
}
