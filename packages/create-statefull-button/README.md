# create-statefull-button

## Download

```bash
npx @qedrohenrique/create-statefull-button@latest
```

## Example

```tsx
"use client";

import { useState } from "react";
import { StatefullButton } from "@/components/custom/statefull-button";

export default function MyPageComponent() {
  const [buttonState, setButtonState] =
    useState<React.ComponentProps<typeof StatefullButton>["phase"]>("idle");

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
    <StatefullButton phase={buttonState} onClick={handleClick}>
      Click me
    </StatefullButton>
  );
}
```

