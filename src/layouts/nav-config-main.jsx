import { paths } from "@/routes/paths";

import { Iconify } from "@/components/iconify";

// ----------------------------------------------------------------------

export const mainNavData = [
  {
    title: "Home",
    path: paths.home,
    icon: <Iconify width={22} icon="solar:home-2-bold-duotone" />,
  },
  {
    title: "About",
    path: paths.about,
    icon: <Iconify width={22} icon="solar:users-group-rounded-bold-duotone" />,
  },
  {
    title: "XTEP Technologies",
    path: paths.service.root,
    icon: <Iconify width={22} icon="solar:cpu-bolt-bold-duotone" />,
  },
  {
    title: "Contact",
    path: paths.contact,
    icon: <Iconify width={22} icon="solar:phone-calling-rounded-bold-duotone" />,
  },
];

// Rendered after the category links in the desktop header
export const mainNavTrailingData = [
  {
    title: "Marathon Registration",
    path: "https://register.xtepnepal.com",
    icon: <Iconify width={22} icon="solar:user-plus-bold-duotone" />,
  },
];