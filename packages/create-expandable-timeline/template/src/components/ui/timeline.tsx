"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

// Types
type TimelineContextValue = {
  activeStep: number;
  setActiveStep: (step: number) => void;
};

// TimelineItem Context (expansão/colapso)
type TimelineItemContextValue = {
  isOpen: boolean;
  toggleOpen: () => void;
};

const TimelineItemContext = React.createContext<
  TimelineItemContextValue | undefined
>(undefined);

const useTimelineItem = () => {
  const context = React.useContext(TimelineItemContext);
  if (!context) {
    throw new Error("useTimelineItem must be used within a TimelineItem");
  }
  return context;
};

// Context
const TimelineContext = React.createContext<TimelineContextValue | undefined>(
  undefined
);

const useTimeline = () => {
  const context = React.useContext(TimelineContext);
  if (!context) {
    throw new Error("useTimeline must be used within a Timeline");
  }
  return context;
};

interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: number;
  value?: number;
  onValueChange?: (value: number) => void;
  orientation?: "horizontal" | "vertical";
}

function Timeline({
  defaultValue = 1,
  value,
  onValueChange,
  orientation = "vertical",
  className,
  ...props
}: TimelineProps) {
  const [activeStep, setInternalStep] = React.useState(defaultValue);

  const setActiveStep = React.useCallback(
    (step: number) => {
      if (value === undefined) {
        setInternalStep(step);
      }
      onValueChange?.(step);
    },
    [value, onValueChange]
  );

  const currentStep = value ?? activeStep;

  return (
    <TimelineContext.Provider
      value={{ activeStep: currentStep, setActiveStep }}
    >
      <div
        data-slot="timeline"
        className={cn(
          "group/timeline flex data-[orientation=horizontal]:w-full data-[orientation=horizontal]:flex-row data-[orientation=vertical]:flex-col",
          className
        )}
        data-orientation={orientation}
        {...props}
      />
    </TimelineContext.Provider>
  );
}

// TimelineContent
type TimelineContentProps = React.ComponentProps<typeof motion.div>;

function TimelineContent({
  className,
  children,
  ...props
}: TimelineContentProps) {
  const itemCtx = React.useContext(TimelineItemContext);

  const isOpen = itemCtx ? itemCtx.isOpen : true;

  return (
    <motion.div
      data-slot="timeline-content"
      className={cn("text-muted-foreground text-sm w-full", className)}
      initial={false}
      animate={isOpen ? "open" : "closed"}
      variants={{
        open: { height: "auto", opacity: 1 },
        closed: { height: 0, opacity: 0 },
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{ overflow: "hidden" }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// TimelineDate
interface TimelineDateProps extends React.HTMLAttributes<HTMLTimeElement> {
  asChild?: boolean;
}

function TimelineDate({
  asChild = false,
  className,
  ...props
}: TimelineDateProps) {
  const Comp = asChild ? Slot.Root : "time";

  return (
    <Comp
      data-slot="timeline-date"
      className={cn(
        "text-muted-foreground mb-1 block text-xs font-medium group-data-[orientation=vertical]/timeline:max-sm:h-4",
        className
      )}
      {...props}
    />
  );
}

// TimelineHeader
function TimelineHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const itemCtx = React.useContext(TimelineItemContext);

  return (
    <div
      data-slot="timeline-header"
      className={cn("flex items-start gap-1", className)}
      {...props}
    >
      {itemCtx ? (
        <Button
          variant="ghost"
          size="icon"
          onClick={itemCtx.toggleOpen}
          aria-expanded={itemCtx.isOpen}
          aria-label={
            itemCtx.isOpen ? "Esconder descrição" : "Mostrar descrição"
          }
          className="size-6"
        >
          <ChevronDown
            className={cn(
              "size-4 transition-transform",
              itemCtx.isOpen ? "rotate-180" : "rotate-0"
            )}
          />
        </Button>
      ) : null}
      <div className="flex-1">{children}</div>
    </div>
  );
}

// TimelineIndicator
interface TimelineIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

function TimelineIndicator({
  asChild = false,
  className,
  children,
  ...props
}: TimelineIndicatorProps) {
  const Comp = asChild ? Slot.Root : "div";

  return (
    <Comp
      data-slot="timeline-indicator"
      className={cn(
        "border-primary/20 group-data-completed/timeline-item:border-primary absolute size-4 rounded-full border-2 group-data-[orientation=horizontal]/timeline:-top-6 group-data-[orientation=horizontal]/timeline:left-0 group-data-[orientation=horizontal]/timeline:-translate-y-1/2 group-data-[orientation=vertical]/timeline:top-0 group-data-[orientation=vertical]/timeline:-left-6 group-data-[orientation=vertical]/timeline:-translate-x-1/2",
        className
      )}
      aria-hidden="true"
      {...props}
    >
      {children}
    </Comp>
  );
}

// TimelineItem
interface TimelineItemProps extends React.HTMLAttributes<HTMLDivElement> {
  step: number;
  defaultOpen?: boolean;
}

function TimelineItem({
  step,
  className,
  defaultOpen = false,
  children,
  ...props
}: TimelineItemProps) {
  const { activeStep } = useTimeline();

  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  const toggleOpen = React.useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <TimelineItemContext.Provider value={{ isOpen, toggleOpen }}>
      <div
        data-slot="timeline-item"
        className={cn(
          "group/timeline-item has-[+[data-completed]]:[&_ [data-slot=timeline-separator]]:bg-primary relative flex flex-1 flex-col gap-0.5 group-data-[orientation=horizontal]/timeline:mt-8 group-data-[orientation=horizontal]/timeline:not-last:pe-8 group-data-[orientation=vertical]/timeline:ms-8 group-data-[orientation=vertical]/timeline:not-last:pb-12",
          className
        )}
        data-completed={step <= activeStep || undefined}
        {...props}
      >
        {children}
      </div>
    </TimelineItemContext.Provider>
  );
}

// TimelineSeparator
function TimelineSeparator({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="timeline-separator"
      className={cn(
        "bg-primary/10 absolute self-start group-last/timeline-item:hidden group-data-[orientation=horizontal]/timeline:-top-6 group-data-[orientation=horizontal]/timeline:h-0.5 group-data-[orientation=horizontal]/timeline:w-[calc(100%-1rem-0.25rem)] group-data-[orientation=horizontal]/timeline:translate-x-4.5 group-data-[orientation=horizontal]/timeline:-translate-y-1/2 group-data-[orientation=vertical]/timeline:-left-6 group-data-[orientation=vertical]/timeline:h-[calc(100%-1rem-0.25rem)] group-data-[orientation=vertical]/timeline:w-0.5 group-data-[orientation=vertical]/timeline:-translate-x-1/2 group-data-[orientation=vertical]/timeline:translate-y-4.5",
        className
      )}
      aria-hidden="true"
      {...props}
    />
  );
}

// TimelineTitle
function TimelineTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      data-slot="timeline-title"
      className={cn("text-sm font-medium", className)}
      {...props}
    />
  );
}

export {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
  useTimelineItem,
};
