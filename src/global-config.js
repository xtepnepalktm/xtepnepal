import packageJson from "../package.json";

import { paths } from "./routes/paths";

// ----------------------------------------------------------------------

export const CONFIG = {
  appName: "Xtep Nepal",

  appVersion: packageJson.version,

  serverUrl:
    process.env.NEXT_PUBLIC_SERVER_URL ??
    (typeof window !== "undefined"
      ? "/api/proxy/"
      : "https://venturekartapi.walkershive.com.np/api/frontend/"),

  assetsDir:
    process.env.NEXT_PUBLIC_ASSETS_DIR ?? "https://venturekartapi.walkershive.com.np/",

  vendorToken: "nZajCRVe50JCSqdRt3xCyzfknmooS0PuX0CBXMZYutUJo0tq55U03mWRwAi2",

  vendorId: process.env.NEXT_PUBLIC_VENDOR_ID ?? "1",

  // Store-specific redux-persist key so storefronts on the same origin don't share login/cart
  persistKey: `xtep-${process.env.NEXT_PUBLIC_VENDOR_ID ?? "1"}`,

  auth: {
    redirectPath: paths.home,
  },

  genericErrorMessage: "Oops! Something went wrong. Please try again.",

  pusher: {
    key: "c35c0621c3312fb4fe89",
    cluster: "ap2",
  },
};