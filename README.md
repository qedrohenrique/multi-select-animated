# MultiSelect Animated

A shadcn-style installer that drops a fully-styled, animated multi-select component.

## Quick start

```bash
# add the component to the current folder (default)
npx create-multiselect-animated@latest

# target a different folder
npx create-multiselect-animated@latest --path ./apps/web
```

1. The script copies the following files into **`<project>/src/`**.
   ```
   src/
     components/
       multi-select-animated.tsx
       ui/
         button.tsx
         input.tsx
         popover.tsx
         separator.tsx
     lib/
       utils.ts
   ```
2. It detects your package manager (`npm`, `yarn`, `pnpm`) and installs all required dependencies:
   ```
   @radix-ui/react-popover @radix-ui/react-separator @radix-ui/react-slot
   class-variance-authority clsx lucide-react motion tailwind-merge
   ```


You can use it as:

```tsx
import MultiSelectAnimated from "@/components/multi-select-animated";

export default function Example() {
  return (
    <MultiSelectAnimated
      options={[
        { id: 1, content: "JavaScript" },
        { id: 2, content: "Go" },
      ]}
      placeholder="Select technologies"
    />
  );
}
```

## Contributing

Clone this repo and open a Pull Request:

```bash
git clone https://github.com/your-user/multiselect-animated.git
cd multiselect-animated
npm install
npm run dev
```

