import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "./ui/button";
import { GithubIcon } from "lucide-react";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="flex items-center justify-end bg-primary/2 p-4 border-b-1 gap-2">
      <Link
        href="https://github.com/qedrohenrique/ui"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button variant="ghost" size="icon">
          <GithubIcon />
        </Button>
      </Link>
      <ModeToggle />
    </nav>
  );
}
