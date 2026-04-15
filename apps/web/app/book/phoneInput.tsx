import * as phonePrefixes from "libphonenumber-js";
import { useState } from "react";

function isValidCountryCode(code: string): code is phonePrefixes.CountryCode {
  return phonePrefixes
    .getCountries()
    .includes(code as phonePrefixes.CountryCode);
}

export default function PhoneInput({}) {
  const [country, setCountry] = useState<phonePrefixes.CountryCode | null>(
    null,
  );
  const [phone, setPhone] = useState("");

  return (
    <div>
      <select
        name="phonePrefix"
        required
        value={country ?? ""}
        onChange={(e) => {
          const value = e.target.value;
          if (isValidCountryCode(value)) {
            setCountry(value);
          } else if (value === "") {
            setCountry(null);
          }
        }}
      >
        {phonePrefixes.getCountries().map((country) => (
          <option key={country} value={country}>
            {country} (+{phonePrefixes.getCountryCallingCode(country)})
          </option>
        ))}
      </select>
      <input
        type="tel"
        name="phone"
        placeholder="123-456-7890"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
    </div>
  );
}
