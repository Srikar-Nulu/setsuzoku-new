import React from "react";
import { clsx } from "clsx";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "small" | "large";
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  size = "default",
  ...props
}) => {
  return (
    <div
      className={clsx(
        "mx-auto px-4 sm:px-6 lg:px-8 w-full",
        {
          "max-w-5xl": size === "small",
          "max-w-7xl": size === "default",
          "max-w-7xl lg:max-w-[1400px]": size === "large",
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
