import { useState } from "react";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export const inputStyles =
  "w-full rounded-2xl border border-black bg-white px-5 py-4 text-lg placeholder:text-gray-500";

function isDate(value: unknown): value is Date {
  return value instanceof Date && !isNaN(value.getTime());
}

export function InputField({
  name,
  type,
  fieldName,
  value,
  placeholder,
  required = false,
  error,
  changeHandler,
}: {
  readonly name: string;
  readonly type: "input" | "email" | "textarea" | "tel" | "number" | "date";
  readonly fieldName: string;
  readonly value: string;
  readonly placeholder: string;
  readonly required?: boolean;
  readonly error?: string;
  readonly changeHandler?: (value: string) => void;
}) {
  const [isPristine, setIsPristine] = useState(true);

  function handleChange(value: string) {
    setIsPristine(false);

    if (type === "tel") {
      const formatted = parsePhoneNumberFromString(value);
      changeHandler?.(formatted?.formatInternational() ?? value);
      return;
    }

    changeHandler?.(value);
  }

  return (
    <div className="w-full">
      <label className="flex flex-col gap-2" htmlFor={name}>
        <div>
          <span>{fieldName}</span>
          {required ? (
            <span className="text-gray-500 italic"> (required)</span>
          ) : null}
        </div>
      </label>

      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          value={value}
          placeholder={placeholder}
          required={required}
          className={inputStyles}
          onChange={(e) => handleChange(e.target.value)}
        />
      ) : type === "date" ? (
        <div className="date-picker-wrapper w-full">
          <DatePicker
            id={name}
            name={name}
            selected={value ? new Date(value) : null}
            onChange={(date: unknown) =>
              handleChange(isDate(date) ? date.toISOString().split("T")[0] : "")
            }
            minDate={new Date(Date.now() + 24 * 60 * 60 * 1000)}
            maxDate={new Date(Date.now() + 6 * 24 * 60 * 60 * 1000)}
            wrapperClassName="w-full"
            className={inputStyles}
            calendarClassName="tat-date-picker"
            placeholderText={placeholder}
            dateFormat="yyyy-MM-dd"
          />
        </div>
      ) : (
        <input
          id={name}
          type={type}
          value={value}
          name={name}
          placeholder={placeholder}
          required={required}
          className={inputStyles}
          onChange={(e) => handleChange(e.target.value)}
        />
      )}

      <span className="w-full text-red-500 block px-4 h-[1lh]">
        {!isPristine && error}
      </span>
    </div>
  );
}

export function CheckboxField({
  name,
  text,
  checked,
  error,
  required = false,
  changeHandler,
}: {
  readonly name: string;
  readonly text: string;
  readonly checked: boolean;
  readonly error?: string;
  readonly required?: boolean;
  readonly changeHandler?: (value: boolean) => void;
}) {
  const [isPristine, setIsPristine] = useState(true);

  function handleChange(value: boolean) {
    setIsPristine(false);
    changeHandler?.(value);
  }

  return (
    <div className="w-full">
      <div className="flex items-center gap-2">
        {required ? (
          <span className="text-gray-500 italic">(required)</span>
        ) : (
          " "
        )}
      </div>
      <div className="w-full flex gap-2">
        <input
          id={name}
          type="checkbox"
          name={name}
          checked={checked}
          required={required}
          onChange={(e) => handleChange(e.target.checked)}
        />
        <label htmlFor={name} className="">
          {text}
        </label>
      </div>

      <span className="w-full text-red-500 block px-4 h-[1lh]">
        {!isPristine && error}
      </span>
    </div>
  );
}

export function SelectField({
  name,
  fieldName,
  error,
  required = false,
  value,
  defaultValue,
  values,
  changeHandler,
}: {
  readonly name: string;
  readonly fieldName: string;
  readonly error?: string;
  readonly required?: boolean;
  readonly value: string | null;
  readonly defaultValue?: string;
  readonly values: ReadonlyArray<{
    readonly value: string;
    readonly label: string;
  }>;
  readonly changeHandler?: (value: string) => void;
}) {
  const [isPristine, setIsPristine] = useState(true);
  const effectiveValue = value ?? defaultValue ?? "";

  function handleChange(value: string) {
    setIsPristine(false);
    changeHandler?.(value);
  }

  return (
    <div className="w-full">
      <label className="flex flex-col gap-2" htmlFor={name}>
        <div>
          <span>{fieldName}</span>
          {required ? (
            <span className="text-gray-500 italic"> (required)</span>
          ) : null}
        </div>
      </label>

      <select
        id={name}
        name={name}
        className={inputStyles}
        value={effectiveValue}
        required={required}
        onChange={(e) => handleChange(e.target.value)}
      >
        <option value="" disabled>
          Select a tour
        </option>
        {values.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <span className="w-full text-red-500 block px-4 h-[1lh]">
        {!isPristine && error}
      </span>
    </div>
  );
}
