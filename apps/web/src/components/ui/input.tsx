"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Eye, EyeClosed } from "lucide-react";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    const [isVisible, setIsVisible] = React.useState(false);
    const passwordInput = {
      visible: {
        type: "text",
        icon: <Eye className="h-4 w-4 text-gray-500" />,
      },
      invisible: {
        type: "password",
        icon: <EyeClosed className="h-4 w-4 text-gray-500" />,
      },
    };

    if (type == "password") {
      return (
        <div className="flex items-center">
          <input
            type={
              isVisible
                ? passwordInput.visible.type
                : passwordInput.invisible.type
            }
            className={cn(
              "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 pr-8 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              className,
            )}
            ref={ref}
            {...props}
          />
          <div
            className="absolute right-8"
            onClick={() => setIsVisible(!isVisible)}
          >
            {isVisible
              ? passwordInput.visible.icon
              : passwordInput.invisible.icon}
          </div>
        </div>
      );
    } else {
      return (
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className,
          )}
          ref={ref}
          {...props}
        />
      );
    }
  },
);
Input.displayName = "Input";

export { Input };
