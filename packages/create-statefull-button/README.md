# create-statefull-button

## Download

```bash
npx create-statefull-button@latest
```

## Example

```tsx
"use client";

import { useState } from "react";
import { StatefullButon } from "@/components/custom/statefull-buton";

export default function MyPageComponent() {
  const [buttonState, setButtonState] =
    useState<React.ComponentProps<typeof StatefullButon>["phase"]>("idle");

  const handleClick = () => {
    setButtonState("loading");
    setTimeout(() => {
      setButtonState("success");
    }, 1000);
    setTimeout(() => {
      setButtonState("idle");
    }, 2000);
  };

  return (
    <StatefullButon phase={buttonState} onClick={handleClick}>
      Click me
    </StatefullButon>
  );
}
```

