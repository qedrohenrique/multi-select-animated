"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CopyIcon, GithubIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { StatefullButon } from "@/components/statefull-buton";

export default function Home() {
  const handleCopy = () => {
    navigator.clipboard.writeText(
      "npx shadcn@latest add multi-select-animated"
    );
    toast.success("Copied to clipboard");
  };

  return (
    <div className="flex flex-col mt-32 font-[family-name:var(--font-geist-sans)] items-center  h-screen">
      <div className="flex flex-col gap-4 p-4 rounded-md border border-foreground/10 w-fit">
        <div>
          <h1 className="text-2xl font-bold">Statefull Button</h1>
          <p className="text-sm text-muted-foreground">built with shadcn/ui</p>
        </div>
        <StatefullButon>Click me</StatefullButon>
      </div>
      <span className="text-sm text-muted-foreground my-4 border border-foreground/10 rounded-md p-2 flex items-center gap-2">
        npx create-statefull-button@latest
        <Separator orientation="vertical" />
        <CopyIcon className="w-4 h-4 cursor-pointer" onClick={handleCopy} />
      </span>
      <Button
        variant="outline"
        onClick={() =>
          window.open(
            "https://github.com/qedrohenrique/statefull-button",
            "_blank"
          )
        }
      >
        <GithubIcon />
        GitHub
      </Button>
    </div>
  );
}
