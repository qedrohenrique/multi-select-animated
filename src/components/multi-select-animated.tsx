"use client";

import { ChevronDown, X } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Separator } from "./ui/separator";

export interface ContentItem {
  id: number;
  content: string;
}

export interface MultiSelectAnimatedProps {
  options: ContentItem[];  
  initialSelectedItems: ContentItem[]; 
  placeholder: string;
  onSelect?: (item: ContentItem) => void;
  onDeselect?: (item: ContentItem) => void;
  maxWidth?: string;
}

export default function MultiSelectAnimated({
  options,
  initialSelectedItems = [],
  placeholder,
  onSelect,
  onDeselect,
  maxWidth = "max-w-80",
}: MultiSelectAnimatedProps) {
  const [selectedItems, setSelectedItems] = useState<ContentItem[]>(initialSelectedItems);

  const addItem = (item: ContentItem) => {
    if (!selectedItems.find((selected) => selected.id === item.id)) {
      setSelectedItems([...selectedItems, item]);
    }
    onSelect?.(item);
  };

  const removeItem = (item: ContentItem) => {
    setSelectedItems(selectedItems.filter((selected) => selected.id !== item.id));
    onDeselect?.(item);
  };

  return (
    <div id="example">
      <div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={`min-h-[40px] h-auto px-4 gap-2 text-muted-foreground ${maxWidth}`}
            >
              <AnimatePresence mode="wait">
                {selectedItems.length === 0 ? (
                  <div className="flex items-center justify-between w-full">
                    <motion.span
                      key="placeholder"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                      }}
                    >
                      {placeholder}
                    </motion.span>
                    <ChevronDown className="h-4 w-4 ml-4" />
                  </div>
                ) : (
                  <div className="flex items-center justify-between w-full gap-4">
                    <div className="flex flex-wrap gap-1 flex-1 min-w-0">
                      {selectedItems.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{
                            x: -20,
                            opacity: 0,
                            scale: 0.8,
                          }}
                          animate={{
                            x: 0,
                            opacity: 1,
                            scale: 1,
                          }}
                          exit={{
                            x: -20,
                            opacity: 0,
                            scale: 0.8,
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 25,
                            delay: index * 0.1,
                          }}
                          className="flex items-center gap-1 bg-primary text-primary-foreground px-2 py-1 rounded-md text-sm"
                        >
                          <span>{item.content}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeItem(item);
                            }}
                            className="hover:bg-primary-foreground/20 rounded-full p-0.5"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </motion.div>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <motion.button
                        key="close-all"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 25,
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedItems([]);
                        }}
                        className="hover:bg-primary/20 rounded-full p-0.5"
                      >
                        <X className="h-4 w-4" />
                      </motion.button>
                      <Separator orientation="vertical" className="!h-4" />
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </div>
                )}
              </AnimatePresence>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-1">
              {options.map((item) => (
                <div
                  key={item.id}
                  onClick={() => addItem(item)}
                  className={`px-2 rounded-lg border cursor-pointer transition-colors ${
                    selectedItems.find((selected) => selected.id === item.id)
                      ? "bg-primary/10 border-primary"
                      : "hover:bg-muted"
                  }`}
                >
                  {item.content}
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
