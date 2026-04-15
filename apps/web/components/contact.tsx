"use client";

import { useState, useTransition } from "react";
import { Header1 } from "./headers";
import Button from "./button";
import { InputField } from "./inputField";
import { validateEmail, validateNonEmpty } from "@/common/validators";

export default function Contact() {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const isFormValid =
    !validateNonEmpty(firstName, "First Name") &&
    !validateNonEmpty(surname, "Surname") &&
    !validateEmail(email) &&
    !validateNonEmpty(message, "Message");

  async function submitForm() {
    startTransition(async () => {
      try {
        // TODO implement form submission
        // const _data = {
        //   firstName,
        //   surname,
        //   email,
        //   message,
        // };

        await new Promise((res) => setTimeout(res, 500));

        if (0 == 0) {
          throw new Error("Not implemented yet");
        }

        setStatus("success");
        setFirstName("");
        setSurname("");
        setEmail("");
        setMessage("");
      } catch {
        setStatus("error");
      }
    });
  }

  return (
    <section className="w-full">
      <div className="mt-8 grid grid-cols-1 items-start gap-16 lg:grid-cols-2 xl:gap-24">
        <div className="flex flex-col justify-center">
          <Header1>Contact Us</Header1>
          <p className="max-w-xl text-lg leading-8">
            Is there anything you would like to ask us? Fill out the form and we
            will be in touch shortly. We can't wait to hear from you.
          </p>
        </div>
        <form action={submitForm} className="w-full flex flex-col gap-4">
          <div className="w-full grid grid-cols-2 gap-4">
            <InputField
              name="firstName"
              type="input"
              value={firstName}
              fieldName="First Name"
              placeholder="John"
              error={validateNonEmpty(firstName, "First Name") || undefined}
              required
              changeHandler={setFirstName}
            />
            <InputField
              name="surname"
              type="input"
              value={surname}
              fieldName="Surname"
              placeholder="Carpenter"
              error={validateNonEmpty(surname, "Surname") || undefined}
              required
              changeHandler={setSurname}
            />
          </div>
          <InputField
            name="email"
            type="email"
            value={email}
            fieldName="Email"
            placeholder="john.carpenter@example.com"
            error={validateEmail(email) || undefined}
            required
            changeHandler={setEmail}
          />
          <InputField
            name="message"
            type="textarea"
            value={message}
            fieldName="Message"
            placeholder="Is it possible to also have a night tour?"
            error={validateNonEmpty(message, "Message") || undefined}
            required
            changeHandler={setMessage}
          />

          <div>
            <Button
              type="submit"
              size="lg"
              disabled={!isFormValid || isPending}
            >
              {isPending ? "Sending..." : "Send"}
            </Button>
          </div>

          {status === "success" && <p>Message sent!</p>}
          {status === "error" && <p>Something went wrong.</p>}
        </form>
      </div>
    </section>
  );
}
