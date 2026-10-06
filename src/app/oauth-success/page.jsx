import { OAuthSuccessView } from "@/auth/view";

// ----------------------------------------------------------------------

export const metadata = { title: "Google OAuth" };

export default function Page() {
  return <OAuthSuccessView />;
}
