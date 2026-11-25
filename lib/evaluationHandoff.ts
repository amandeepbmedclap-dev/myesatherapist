// import { STATE_INDEX } from "@/data/stateIndex";
// import { heallyPortalUrl, SURVEY_STATE_SLUGS, surveyRegisterUrl } from "@/components/common/stateModalDestination";
import { surveyRegisterUrl } from "@/components/common/stateModalDestination";

export type EvaluationLead = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  stateName: string;
};

export type EvaluationErrors = Partial<
  Record<"firstName" | "lastName" | "email" | "phone" | "terms", string>
>;

const NAME_PATTERN = /^[a-zA-Z'\-\s]+$/;
const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;
export const NAME_MAX_LENGTH = 50;
export const EMAIL_MAX_LENGTH = 100;

export function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length === 0) return "";
  if (digits.length < 4) return `(${digits}`;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export function validateEvaluationLead(lead: EvaluationLead, termsAccepted: boolean): EvaluationErrors {
  const errors: EvaluationErrors = {};
  const firstName = lead.firstName.trim();
  const lastName = lead.lastName.trim();
  const email = lead.email.trim();
  if (!NAME_PATTERN.test(firstName) || firstName.length > NAME_MAX_LENGTH) {
    errors.firstName = "Please enter a valid first name.";
  }
  if (!NAME_PATTERN.test(lastName) || lastName.length > NAME_MAX_LENGTH) {
    errors.lastName = "Please enter a valid last name.";
  }
  if (!EMAIL_PATTERN.test(email) || email.length > EMAIL_MAX_LENGTH) {
    errors.email = "Enter a valid email.";
  }
  const phoneDigits = lead.phone.replace(/\D/g, "");
  if (!lead.phone.trim() || phoneDigits.length === 0) {
    errors.phone = "Please enter your phone number.";
  } else if (phoneDigits.length !== 10 || /[a-zA-Z]/.test(lead.phone)) {
    errors.phone = "Please enter a valid 10-digit phone number.";
  }
  if (!termsAccepted) {
    errors.terms = "You must accept the terms.";
  }
  return errors;
}

// All 50 states + DC now go to the survey (survey.myesatherapist.com).
export function evaluationDestination(lead: EvaluationLead) {
  // const entry = STATE_INDEX.find((state) => state.name === lead.stateName);
  // const abbreviation = entry?.abbreviation || "CA";
  // if (entry && SURVEY_STATE_SLUGS.has(entry.slug)) {
  return surveyRegisterUrl({
    firstName: lead.firstName,
    lastName: lead.lastName,
    email: lead.email,
    phone: lead.phone,
    state: lead.stateName,
  });
  // }
  //
  // return heallyPortalUrl({
  //   abbreviation,
  //   firstName: lead.firstName,
  //   lastName: lead.lastName,
  //   email: lead.email,
  //   phone: lead.phone,
  // });
}

export function trackHeallySubmit(_email: string, stateAbbreviation: string) {
  // Never push emails or other personal data to the dataLayer / GA4.
  const layer = ((window as Window & { dataLayer?: Record<string, string>[] }).dataLayer ??= []);
  layer.push({
    event: "heallyValidatedSubmit",
    user_state: stateAbbreviation,
  });
}
