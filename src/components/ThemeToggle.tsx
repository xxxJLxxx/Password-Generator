import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="glass rounded-xl">
        <Sun className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="glass rounded-xl hover:bg-primary/20 transition-all"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-primary transition-transform rotate-0 scale-100" />
      ) : (
        <Moon className="h-5 w-5 text-primary transition-transform rotate-0 scale-100" />
      )}
      <span className="sr-only">Theme wechseln</span>
    </Button>
  );
}
