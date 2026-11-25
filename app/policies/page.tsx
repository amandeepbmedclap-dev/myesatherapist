import { permanentRedirect } from "next/navigation";

export default function PoliciesIndexPage() {
  permanentRedirect("/privacy-policy/");
}
