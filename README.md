# UI

A shadcn-style installer that drops a fully-styled and animated components.

## Quick start

For example, imagine you want to use the `MultiSelectAnimated` component, you would:

```bash
# add the component to the current folder (default)
npx create-multiselect-animated@latest

# target a different folder
npx create-multiselect-animated@latest --path ./apps/web
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

Pedro Henrique de Almeida © 2025 - All rights reserved
