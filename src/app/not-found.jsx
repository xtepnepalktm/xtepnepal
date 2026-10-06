import { getAppName } from "@/api";

import { NotFoundView } from "@/sections/error";

// ----------------------------------------------------------------------

export async function generateMetadata() {
  try {
    const { appName } = await getAppName();
    return {
      title: `404 page not found! | Error - ${appName}`,
    };
  } catch (error) {
    console.error("Error generating metadata for not-found page:", error);
    return {
      title: "404 page not found! | Error",
    };
  }
}

// ----------------------------------------------------------------------

export default function Page() {
  return <NotFoundView />;
}
