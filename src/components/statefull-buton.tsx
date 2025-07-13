"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";
import { Loader2, Check } from "lucide-react";

export interface StatefullButonProps
  extends React.ComponentPropsWithoutRef<typeof Button> {
  children: React.ReactNode;
  loadingDuration?: number;
  successDuration?: number;
}

export function StatefullButon({
  children,
  loadingDuration = 1500,
  successDuration = 1000,
  onClick,
  ...props
}: StatefullButonProps) {
  const [phase, setPhase] = useState<
    "idle" | "contracting" | "loading" | "success"
  >("idle");

  useEffect(() => {
    let loadingTimeout: ReturnType<typeof setTimeout> | undefined;
    let successTimeout: ReturnType<typeof setTimeout> | undefined;

    if (phase === "loading") {
      loadingTimeout = setTimeout(() => setPhase("success"), loadingDuration);
    }

    if (phase === "success") {
      successTimeout = setTimeout(() => setPhase("idle"), successDuration);
    }

    return () => {
      if (loadingTimeout) clearTimeout(loadingTimeout);
      if (successTimeout) clearTimeout(successTimeout);
    };
  }, [phase, loadingDuration, successDuration]);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (phase !== "idle") return;
    onClick?.(e);
    setPhase("contracting");
  };

  const handleTextAnimationComplete = () => {
    if (phase === "contracting") {
      setPhase("loading");
    }
  };

  const scaleVariants = {
    expand: {
      scaleX: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 25,
      },
    },
    collapse: {
      scaleX: 0,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 25,
      },
    },
  } as const;

  return (
    <Button
      {...props}
      onClick={handleClick}
      className={`relative overflow-hidden ${props.className ?? ""}`}
    >
      <span className="inline-flex items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          {(phase === "idle" || phase === "contracting") && (
            <motion.span
              key="text"
              variants={scaleVariants}
              initial="expand"
              animate={phase === "idle" ? "expand" : "collapse"}
              exit="collapse"
              style={{ display: "inline-block", transformOrigin: "center" }}
              onAnimationComplete={handleTextAnimationComplete}
            >
              {children}
            </motion.span>
          )}

          {phase === "loading" && (
            <motion.span
              key="loader"
              variants={scaleVariants}
              initial="collapse"
              animate="expand"
              exit="collapse"
              style={{ display: "inline-block", transformOrigin: "center" }}
            >
              <Loader2 className="h-4 w-4 animate-spin" />
            </motion.span>
          )}

          {phase === "success" && (
            <motion.span
              key="success"
              variants={scaleVariants}
              initial="collapse"
              animate="expand"
              exit="collapse"
              style={{ display: "inline-block", transformOrigin: "center" }}
            >
              <Check className="h-4 w-4" />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </Button>
  );
}

StatefullButon.displayName = "StatefullButon";
