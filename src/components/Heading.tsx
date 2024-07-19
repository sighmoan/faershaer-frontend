import { ReactNode } from "@tanstack/react-router";

export const Heading = ({ children }: { children: ReactNode }) => {
  return <h4 className="font-bold text-lg text-center mt-20">{children}</h4>;
};
