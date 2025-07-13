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
  phase?: "idle" | "contracting" | "loading" | "success";
}

export function StatefullButon({
  children,
  loadingDuration = 1500,
  successDuration = 1000,
  onClick,
  phase: controlledPhase,
  ...props
}: StatefullButonProps) {
  const [internalPhase, setInternalPhase] = useState<
    "idle" | "contracting" | "loading" | "success"
  >("idle");

  const isControlled = controlledPhase !== undefined;
  const currentPhase = (isControlled ? controlledPhase : internalPhase) as
    | "idle"
    | "contracting"
    | "loading"
    | "success";

  useEffect(() => {
    if (isControlled) return;

    let loadingTimeout: ReturnType<typeof setTimeout> | undefined;
    let successTimeout: ReturnType<typeof setTimeout> | undefined;

    if (internalPhase === "loading") {
      loadingTimeout = setTimeout(
        () => setInternalPhase("success"),
        loadingDuration
      );
    }

    if (internalPhase === "success") {
      successTimeout = setTimeout(
        () => setInternalPhase("idle"),
        successDuration
      );
    }

    return () => {
      if (loadingTimeout) clearTimeout(loadingTimeout);
      if (successTimeout) clearTimeout(successTimeout);
    };
  }, [internalPhase, loadingDuration, successDuration, isControlled]);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (currentPhase !== "idle") return;
    onClick?.(e);
    if (!isControlled) {
      setInternalPhase("contracting");
    }
  };

  const handleTextAnimationComplete = () => {
    if (!isControlled && currentPhase === "contracting") {
      setInternalPhase("loading");
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
          {(currentPhase === "idle" || currentPhase === "contracting") && (
            <motion.span
              key="text"
              variants={scaleVariants}
              initial="collapse"
              animate={currentPhase === "idle" ? "expand" : "collapse"}
              exit="collapse"
              style={{ display: "inline-block", transformOrigin: "center" }}
              onAnimationComplete={handleTextAnimationComplete}
            >
              {children}
            </motion.span>
          )}

          {currentPhase === "loading" && (
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

          {currentPhase === "success" && (
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
