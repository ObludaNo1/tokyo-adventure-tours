"use client";

import {
  isNonEmpty,
  isValidDate,
  isValidEmail,
  isValidPhoneNumber,
  validateEmail,
  validateNonEmpty,
  validatePhoneNumber,
} from "@/common/validators";
import { Title } from "@/components/headers";
import {
  CheckboxField,
  InputField,
  SelectField,
} from "@/components/inputField";
import { getTourBySlug, tours } from "@/data/tours";
import { useEffect, useMemo, useReducer, useState, useTransition } from "react";
import Image from "next/image";
import Button from "@/components/button";

interface BookATourProps {
  readonly searchParams: Promise<{
    readonly tour?: string;
  }>;
}

interface BookState {
  readonly firstName: string;
  readonly surname: string;
  readonly email: string;
  readonly phone: string;
  readonly peopleInGroup: string;
  readonly tour: string | null;
  readonly desiredStartDate: string | null;
  readonly message: string;
  readonly mediaContentAgreement: boolean;
  readonly acknowledgement: boolean;
  readonly termsAgreement: boolean;
}

export default function BookATour({ searchParams }: BookATourProps) {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [state, updateState] = useReducer(
    (state: BookState, newState: Partial<BookState>) => ({
      ...state,
      ...newState,
    }),
    {
      firstName: "",
      surname: "",
      email: "",
      phone: "",
      peopleInGroup: "",
      tour: null,
      desiredStartDate: null,
      message: "",
      mediaContentAgreement: false,
      acknowledgement: false,
      termsAgreement: false,
    },
  );

  useEffect(() => {
    searchParams.then(({ tour }) => {
      if (tour && getTourBySlug(tour)) {
        console.log("Setting tour to", tour);
        updateState({ tour });
      }
    });
  }, [searchParams]);

  const validData = useMemo(() => {
    if (
      isNonEmpty(state.firstName) &&
      isNonEmpty(state.surname) &&
      isValidEmail(state.email) &&
      (!isNonEmpty(state.phone) || isValidPhoneNumber(state.phone)) &&
      isValidDate(state.desiredStartDate ?? "") &&
      getTourBySlug(state.tour ?? "") != null &&
      state.acknowledgement &&
      state.termsAgreement
    )
      return true;
  }, [state]);

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
        updateState({
          firstName: "",
          surname: "",
          email: "",
          phone: "",
          peopleInGroup: "",
          tour: null,
          desiredStartDate: null,
          message: "",
          mediaContentAgreement: false,
          acknowledgement: false,
          termsAgreement: false,
        });
      } catch {
        setStatus("error");
      }
    });
  }

  return (
    <div className="flex flex-col gap-16">
      <Title>
        Start Your
        <br />
        Next Adventure With Us
      </Title>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
        <div className="hidden lg:block relative flex-1 overflow-hidden">
          <Image
            src="/images/tokyo_sky_tree_through_sakura_in_night_00.webp"
            alt="A view of the Tokyo Sky Tree through cherry blossoms at night"
            fill
            className="object-cover object-center skewed-clip"
          />
        </div>
        <form>
          <div className="grid grid-cols-2 gap-4">
            <InputField
              name="firstName"
              type="input"
              value={state.firstName}
              fieldName="First Name"
              placeholder="John"
              error={
                validateNonEmpty(state.firstName, "First Name") || undefined
              }
              required
              changeHandler={(value) => updateState({ firstName: value })}
            />
            <InputField
              name="surname"
              type="input"
              value={state.surname}
              fieldName="Surname"
              placeholder="Carpenter"
              error={validateNonEmpty(state.surname, "Surname") || undefined}
              required
              changeHandler={(value) => updateState({ surname: value })}
            />
          </div>
          <InputField
            name="email"
            type="input"
            value={state.email}
            fieldName="Email"
            placeholder="john.carpenter@example.com"
            error={validateEmail(state.email) || undefined}
            required
            changeHandler={(value) => updateState({ email: value })}
          />
          <InputField
            name="phone"
            type="tel"
            value={state.phone}
            fieldName="Phone Number"
            placeholder="+81 90 1234 5678"
            error={validatePhoneNumber(state.phone) || undefined}
            changeHandler={(value) => updateState({ phone: value })}
          />
          <InputField
            name="peopleInGroup"
            type="number"
            value={state.peopleInGroup}
            fieldName="Number of people in group"
            placeholder=""
            changeHandler={(value) => updateState({ peopleInGroup: value })}
          />
          <InputField
            name="desiredStartDate"
            type="date"
            value={state.desiredStartDate ?? ""}
            fieldName="Desired Start Date"
            placeholder={
              new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                .toISOString()
                .split("T")[0]
            }
            required
            error={
              validateNonEmpty(
                state.desiredStartDate ?? "",
                "Desired Start Date",
              ) || undefined
            }
            changeHandler={(value) => updateState({ desiredStartDate: value })}
          />
          <SelectField
            name="tour"
            value={state.tour}
            defaultValue={undefined}
            fieldName="Select a tour"
            required
            error={
              validateNonEmpty(state.tour ?? "", "Tour selection") || undefined
            }
            values={tours.map((tour) => ({
              value: tour.slug,
              label: tour.name,
            }))}
            changeHandler={(value) => updateState({ tour: value })}
          />
          <InputField
            name="message"
            type="textarea"
            value={state.message}
            fieldName="Additional Message"
            placeholder="Let us know if you have any specific requests or questions..."
            changeHandler={(value) => updateState({ message: value })}
          />
          <CheckboxField
            name="mediaContentAgreement"
            text="I agree that photos/videos taken during the tour may be used for promotional purposes (website, social media, etc.)."
            checked={state.mediaContentAgreement}
            changeHandler={(checked) =>
              updateState({ mediaContentAgreement: checked })
            }
          />
          <CheckboxField
            name="acknowledgement"
            text="I acknowledge that the booking is confirmed only after payment is received and a confirmation email has been sent by us."
            checked={state.acknowledgement}
            required
            error={
              state.acknowledgement ? undefined : "This field is required."
            }
            changeHandler={(checked) =>
              updateState({ acknowledgement: checked })
            }
          />
          <CheckboxField
            name="termsAgreement"
            text="By checking this box, I confirm that I have read and accept the Terms of Service."
            checked={state.termsAgreement}
            required
            error={state.termsAgreement ? undefined : "This field is required."}
            changeHandler={(checked) =>
              updateState({ termsAgreement: checked })
            }
          />
          <Button
            size="lg"
            disabled={!validData || isPending}
            onClick={submitForm}
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
