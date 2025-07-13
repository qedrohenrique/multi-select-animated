import React from "react";

export interface StatefullButonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function StatefullButon({ children, ...props }: StatefullButonProps) {
  return <button {...props}>{children}</button>;
}

StatefullButon.displayName = "StatefullButon";
