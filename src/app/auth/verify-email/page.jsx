import { getAppName } from "@/api";

import { EmailVerificationView } from "@/auth/view";

// ----------------------------------------------------------------------

export async function generateMetadata() {
    const { appName } = await getAppName();

    return {
        metadataBase: new URL("https://xtepnepal.com"),
        title: "Email Verification",
        description: `Verify your email address for ${appName}.`,
        robots: {
            index: false,
            follow: false,
        },
    };
}

export default function Page() {
    return <EmailVerificationView />;
}
