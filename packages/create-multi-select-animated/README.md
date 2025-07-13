# multi-select-animated

## Download

```bash
npx @qedrohenrique/create-multiselect-animated@latest
```

## Example

```tsx
"use client";

import MultiSelectAnimated, {
  ContentItem,
} from "@/components/multi-select-animated";

const OPTIONS: ContentItem[] = [
  { id: 1, content: "React" },
  { id: 2, content: "Vue" },
  { id: 3, content: "Svelte" },
  { id: 4, content: "Angular" },
  { id: 5, content: "Qwik" },
  { id: 6, content: "Solid" },
];

export default function MyPage() {
  const initialFrameworks = [OPTIONS[0], OPTIONS[2]];

  return (
    <div className="p-8 w-full max-w-xs mx-auto">
      <MultiSelectAnimated
        options={OPTIONS}
        initialSelectedItems={initialFrameworks}
        placeholder="Select frameworks"
        onSelect={(item) => console.log("selected:", item.content)}
        onDeselect={(item) => console.log("deselected:", item.content)}
      />
    </div>
  );
}
```
