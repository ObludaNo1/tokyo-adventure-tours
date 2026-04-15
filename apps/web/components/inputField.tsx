import { useState } from "react";

export const inputStyles =
  "w-full rounded-2xl border border-black bg-white px-5 py-4 text-lg placeholder:text-gray-500";

export default function InputField({
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
  readonly type: "input" | "email" | "textarea";
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
    changeHandler?.(value);
  }

  return (
    <div className="w-full">
      <label className="flex flex-col gap-2">
        <div>
          <span>{fieldName}</span>
          {required ? (
            <span className="text-gray-500 italic"> (required)</span>
          ) : null}
        </div>
      </label>
      {type === "textarea" ? (
        <textarea
          name={name}
          value={value}
          placeholder={placeholder}
          required={required}
          className={inputStyles}
          onChange={(e) => handleChange(e.target.value)}
        />
      ) : (
        <input
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
