"use client";

import MultiselectAnimated, {
  ContentItem,
} from "@/components/multi-select-animated";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { CopyIcon, GithubIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const contentLorem: ContentItem[] = [
  {
    id: 1,
    content: "Lorem",
  },
  {
    id: 2,
    content: "Ipsum",
  },
  {
    id: 3,
    content: "Dolor",
  },
  {
    id: 4,
    content: "Sit",
  },
  {
    id: 5,
    content: "Amet",
  },
  {
    id: 6,
    content: "Consectetur",
  },
  {
    id: 7,
    content: "Adipiscing",
  },
  {
    id: 8,
    content: "Elit",
  },
  {
    id: 9,
    content: "Sed",
  },
];

export default function Home() {
  const [selectedItems, setSelectedItems] =
    useState<ContentItem[]>(contentLorem);

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
          <h1 className="text-2xl font-bold">Multi Select Animated</h1>
          <p className="text-sm text-muted-foreground">built with shadcn/ui</p>
        </div>
        <MultiselectAnimated
          options={contentLorem}
          initialSelectedItems={selectedItems}
          placeholder="Select options"
          onSelect={(item) => {
            setSelectedItems([...selectedItems, item]);
          }}
          onDeselect={(item) => {
            setSelectedItems(selectedItems.filter((i) => i.id !== item.id));
          }}
          triggerClassName="w-full max-w-80"
        />
        <Button
          onClick={() =>
            toast.success(
              `Submitted items: ${selectedItems
                .map((i) => i.content)
                .join(", ")}`
            )
          }
        >
          Submit
        </Button>
      </div>
      <span className="text-sm text-muted-foreground my-4 border border-foreground/10 rounded-md p-2 flex items-center gap-2">
        npx create-multiselect-animated@latest
        <Separator orientation="vertical" />
        <CopyIcon className="w-4 h-4" onClick={handleCopy} />
      </span>
      <Button
        variant="outline"
        onClick={() =>
          window.open(
            "https://github.com/qedrohenrique/multi-select-animated",
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
