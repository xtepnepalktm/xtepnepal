import { getAppName } from "@/api";

import { EmailChangeVerificationView } from "@/auth/view";

// ----------------------------------------------------------------------

export async function generateMetadata() {
    const { appName } = await getAppName();

    return {
        metadataBase: new URL("https://xtepnepal.com"),
        title: "Email Change Verification",
        description: `Verify your new email address for ${appName}.`,
        robots: {
            index: false,
            follow: false,
        },
    };
}

export default function Page() {
    return <EmailChangeVerificationView />;
}
