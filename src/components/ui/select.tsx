"use client"

import * as React from "react"
import { Select as SelectPrimitive } from "radix-ui"
import { cn } from "@/lib/utils"
import { ChevronDownIcon, CheckIcon, ChevronUpIcon } from "lucide-react"
import ReactSelect from "react-select"

/* ==========================================================================
   1. RADIX SELECT PRIMITIVES (PREMIUM STYLED)
   ========================================================================== */

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />
}

function SelectGroup({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn("scroll-my-1 p-1", className)}
      {...props}
    />
  )
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default" | "lg"
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "flex w-full items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 transition-all outline-none select-none hover:bg-slate-50 focus-visible:border-rose-300 focus-visible:ring-2 focus-visible:ring-rose-100 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-rose-300 aria-invalid:ring-2 aria-invalid:ring-rose-100 data-placeholder:text-slate-400 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-4",
        size === "sm" && "h-9 rounded-lg text-xs py-1.5 px-3",
        size === "lg" && "h-12 rounded-2xl text-base px-5",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="pointer-events-none size-4 text-slate-400 transition-transform duration-200" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  position = "popper",
  align = "start",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          "relative z-50 max-h-[300px] min-w-[140px] w-[var(--radix-select-trigger-width)] overflow-x-hidden overflow-y-auto rounded-2xl bg-white text-slate-700 shadow-xl border border-slate-100 p-1.5 origin-top transition-all duration-200 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className
        )}
        position={position}
        align={align}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "p-1 space-y-0.5",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("px-2.5 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider", className)}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-2 text-sm text-slate-700 outline-none select-none hover:bg-slate-50 focus:bg-rose-50 focus:text-rose-900 transition-all data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-4",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <span className="flex size-4 items-center justify-center text-rose-500">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="pointer-events-none" size={16} />
        </SelectPrimitive.ItemIndicator>
      </span>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("pointer-events-none -mx-1.5 my-1.5 h-px bg-slate-100", className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "z-10 flex cursor-default items-center justify-center bg-white py-1 text-slate-400 [&_svg]:size-4",
        className
      )}
      {...props}
    >
      <ChevronUpIcon />
    </SelectPrimitive.ScrollUpButton>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "z-10 flex cursor-default items-center justify-center bg-white py-1 text-slate-400 [&_svg]:size-4",
        className
      )}
      {...props}
    >
      <ChevronDownIcon />
    </SelectPrimitive.ScrollDownButton>
  )
}

/* ==========================================================================
   2. HIGH-LEVEL PREMIUM CUSTOM SELECT COMPONENT
   ========================================================================== */

export interface SelectOption {
  value: string;
  label: string;
  desc?: string;
  icon?: React.ComponentType<any>;
}

export interface CustomSelectProps {
  options: SelectOption[];
  value: string | string[];
  onChange: (value: any) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  className?: string;
  triggerClassName?: string;
  size?: "sm" | "default" | "lg";
  disabled?: boolean;
  isMulti?: boolean;
  controlBg?: string;
}

export function CustomSelect({
  options,
  value,
  onChange,
  placeholder = "Select option",
  label,
  error,
  className,
  triggerClassName,
  size = "default",
  disabled = false,
  isMulti = false,
  controlBg,
}: CustomSelectProps) {
  const selectedOption = isMulti 
    ? options.filter((opt) => Array.isArray(value) && value.includes(opt.value))
    : options.find((opt) => opt.value === value) || null;

  const selectStyles = {
    control: (base: any, state: any) => ({
      ...base,
      borderRadius: size === "sm" ? "0.5rem" : size === "lg" ? "1rem" : "0.75rem",
      minHeight: size === "sm" ? "36px" : size === "lg" ? "48px" : "42px",
      borderColor: state.isFocused ? "#FF6014" : controlBg ? "transparent" : "#e2e8f0",
      backgroundColor: controlBg || "#ffffff",
      boxShadow: state.isFocused ? "0 0 0 2px #FFF0EB" : "none",
      "&:hover": {
        borderColor: state.isFocused ? "#FF6014" : controlBg ? "transparent" : "#cbd5e1"
      }
    }),
    valueContainer: (base: any) => ({
      ...base,
      padding: size === "sm" ? "0 8px" : size === "lg" ? "0 16px" : "0 12px",
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isSelected ? "#FF6014" : state.isFocused ? "#FFF0EB" : "white",
      color: state.isSelected ? "white" : "#0f172a",
      fontSize: "0.875rem",
      "&:active": {
        backgroundColor: "#E04F00",
      }
    }),
    menuPortal: (base: any) => ({
      ...base,
      zIndex: 999999,
    }),
    menu: (base: any) => ({
      ...base,
      zIndex: 999999,
      borderRadius: "0.75rem",
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      overflow: "hidden",
    }),
  };

  const CustomOption = (props: any) => {
    const { data, innerRef, innerProps, isSelected, isFocused } = props;
    return (
      <div 
        ref={innerRef} 
        {...innerProps} 
        className={cn(
          "px-3 py-2 text-xs cursor-pointer flex items-center justify-between transition-colors",
          isSelected ? "bg-[#FF6014] text-white font-bold" : isFocused ? "bg-[#FFF0EB] text-[#FF6014]" : "text-slate-700 hover:bg-slate-50"
        )}
      >
        <span className="truncate font-medium">{data.label}</span>
        {data.desc && (
          <span className={cn(
            "text-[10px] ml-2 font-bold px-1.5 py-0.5 rounded shrink-0",
            isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
          )}>
            {data.desc}
          </span>
        )}
      </div>
    );
  };

  const CustomSingleValue = (props: any) => {
    const { data, children, innerProps } = props;
    return (
      <div {...innerProps} className="flex items-center justify-between w-full text-xs font-semibold text-slate-800 pr-2">
        <span className="truncate">{data.label}</span>
        {data.desc && (
          <span className="text-[10px] bg-orange-50 text-[#FF6014] border border-orange-100 font-extrabold px-1.5 py-0.5 rounded ml-1.5 shrink-0">
            {data.desc}
          </span>
        )}
      </div>
    );
  };

  const id = React.useId();

  return (
    <div className={cn("space-y-1.5 w-full", className)}>
      {label && (
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider select-none">
          {label}
        </label>
      )}

      <ReactSelect
        instanceId={id}
        value={selectedOption}
        onChange={(selected: any) => {
          if (isMulti) {
            onChange(selected ? selected.map((s: any) => s.value) : []);
          } else {
            onChange(selected ? selected.value : "");
          }
        }}
        options={options}
        placeholder={placeholder}
        isDisabled={disabled}
        isMulti={isMulti}
        isClearable={isMulti}
        styles={selectStyles}
        menuPortalTarget={typeof window !== "undefined" ? document.body : null}
        menuPosition="fixed"
        menuPlacement="auto"
        components={isMulti ? { Option: CustomOption } : { Option: CustomOption, SingleValue: CustomSingleValue }}
      />

      {error && (
        <p className="text-xs text-rose-500 font-semibold animate-in fade-in duration-150">
          {error}
        </p>
      )}
    </div>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
