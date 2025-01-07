import { memo } from "react";
import {
  CheckIcon,
  ChevronsUpDownIcon,
  CircleAlertIcon,
  PlusCircleIcon,
} from "lucide-react";
import { UseFormReturn } from "react-hook-form";

import HoverTooltip from "@/components/hover-tooltip";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { generateRandomSlug } from "@/lib/functions/generate-random-slug";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

interface UniversalFormFieldProps {
  form: UseFormReturn<any>;
  label: string;
  name: string;
  placeholder: string;
  minLength?: number;
  maxLength?: number;
  type?: "input" | "textarea" | "checkbox" | "number" | "select";
  options?: { value: string; label: string }[];

  featuredField?: {
    generateSlug?: boolean;
    resetField?: boolean;
  };
}

const UniversalFormField = memo(
  ({
    form,
    label,
    name,
    placeholder,
    minLength = 3,
    maxLength = 100,
    type = "input",
    options,

    featuredField = {
      generateSlug: false,
      resetField: false,
    },
  }: UniversalFormFieldProps) => {
    const handleGenerateSlug = (name: string) => {
      const slug = generateRandomSlug({ stringToGenerate: name });
      form.setValue("slug", slug);
    };

    const handleGenerateClick = () => {
      if (form.getValues().name !== "") {
        const slug = generateRandomSlug({
          stringToGenerate: form.getValues().name,
          isRandowSuffix: true,
        });

        form.setValue("slug", slug);
      } else {
        alert("Будь ласка, введіть назву товару");
      }
    };

    const handleCreateCategory = () => {
      console.log("Create category");
    };

    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field, fieldState }) => {
          const hasError = !!fieldState.error;

          console.log(field.value);
          return (
            <FormItem>
              <div className="flex justify-between">
                <FormLabel>{label}</FormLabel>

                {featuredField.generateSlug && (
                  <Button
                    variant={"link"}
                    size="link"
                    onClick={handleGenerateClick}
                  >
                    Рандомний Slug
                  </Button>
                )}
              </div>
              <div className="flex items-center">
                <FormControl className="flex-1">
                  <div>
                    {/* Input */}
                    {type === "input" && (
                      <Input
                        placeholder={placeholder}
                        {...field}
                        min={minLength}
                        max={maxLength}
                        onChange={(e) => {
                          field.onChange(e);
                          if (name === "name") {
                            handleGenerateSlug(e.target.value);
                          }
                        }}
                      />
                    )}
                    {/* Textarea */}
                    {type === "textarea" && (
                      <Textarea placeholder={placeholder} {...field} />
                    )}
                    {/* Checkbox */}
                    {type === "checkbox" && (
                      <div className="flex items-center gap-x-2">
                        <Switch
                          {...field}
                          id={name}
                          checked={field.value}
                          onCheckedChange={(e) => {
                            field.onChange(e);
                          }}
                        />
                        <Label htmlFor={name}>{placeholder}</Label>
                      </div>
                    )}
                    {/* Number */}
                    {type === "number" && (
                      <div className="flex">
                        <Input
                          type="number"
                          placeholder={placeholder}
                          {...field}
                          onFocus={(e) => e.target.select()}
                          className="flex-1"
                          value={field.value || ""} // Значення за замовчуванням
                          onChange={(e) => {
                            const value = e.target.value
                              ? parseFloat(e.target.value)
                              : null;
                            field.onChange(value);
                          }}
                        />
                        {featuredField.resetField && (
                          <Button
                            type="button"
                            variant={"ghost"}
                            onClick={() => field.onChange(null)}
                          >
                            Reset
                          </Button>
                        )}
                      </div>
                    )}
                    {/* Select */}
                    {type === "select" && (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant={"outline"} className="w-full">
                            {field.value && field.value
                              ? options?.find(
                                  (option) => option.value === field.value
                                )?.label
                              : placeholder}

                            <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <Command>
                            <div className="flex gap-x-2">
                              <CommandInput
                                placeholder="Знайти..."
                                className="flex-1"
                              />
                              <Button
                                variant={"ghost"}
                                size={"icon"}
                                onClick={handleCreateCategory}
                              >
                                <HoverTooltip
                                  content="Додати новий елемент"
                                  asChild
                                >
                                  <PlusCircleIcon size={24} />
                                </HoverTooltip>
                              </Button>
                            </div>
                            {options?.length ? (
                              <>
                                <CommandEmpty>Немає результатів</CommandEmpty>
                                <CommandGroup>
                                  {options?.map((option) => (
                                    <CommandItem
                                      key={option.value}
                                      value={option.value}
                                      onClick={(cur) =>
                                        field.onChange(option.value)
                                      }
                                    >
                                      <CheckIcon
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          field.value === option.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                      {option.label}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </>
                            ) : null}
                          </Command>
                        </PopoverContent>
                      </Popover>
                    )}
                  </div>
                </FormControl>
                {hasError && (
                  <HoverTooltip content={fieldState.error?.message} side="left">
                    <FormMessage className="px-2">
                      <CircleAlertIcon size={24} />
                    </FormMessage>
                  </HoverTooltip>
                )}
              </div>
            </FormItem>
          );
        }}
      />
    );
  }
);

UniversalFormField.displayName = "UniversalFormField";

export default UniversalFormField;
