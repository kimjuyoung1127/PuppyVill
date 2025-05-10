import * as React from "react";
import { cn } from "@/lib/utils";

export interface ToggleProps extends React.HTMLAttributes<HTMLDivElement> {
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  disabled?: boolean;
}

const Toggle = React.forwardRef<HTMLDivElement, ToggleProps>(
  ({ className, pressed = false, onPressedChange, disabled = false, ...props }, ref) => {
    const handleClick = () => {
      if (!disabled && onPressedChange) {
        onPressedChange(!pressed);
      }
    };

    return (
      <div 
        ref={ref} 
        role="switch"
        aria-checked={pressed}
        data-state={pressed ? "on" : "off"}
        data-disabled={disabled ? "true" : undefined}
        onClick={handleClick}
        className={cn(
          "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
          pressed ? "bg-primary" : "bg-gray-200",
          disabled && "opacity-50 cursor-not-allowed",
          !disabled && "cursor-pointer",
          className
        )}
        {...props}
      >
        <span 
          className={cn(
            "inline-block h-5 w-5 rounded-full bg-white transform transition-transform",
            pressed ? "translate-x-5" : "translate-x-1"
          )}
        />
      </div>
    );
  }
);

Toggle.displayName = "Toggle";

export { Toggle };
