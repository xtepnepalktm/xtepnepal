import { paths } from "@/routes/paths";

import { Iconify } from "@/components/iconify";

export const mobileNavData = [
  {
    title: "Home",
    path: paths.home,
    icon: <Iconify width={22} icon="solar:home-2-bold-duotone" />,
  },
  {
    title: "Product",
    path: paths.product.root,
    icon: <Iconify width={22} icon="solar:bag-smile-bold" />,
  },
  {
    title: "About",
    path: paths.about,
    icon: <Iconify width={22} icon="solar:info-circle-bold" />,
  },
  {
    title: "Cart",
    path: paths.cart,
    icon: <Iconify width={22} icon="solar:cart-large-2-bold-duotone" />,
  },
  {
    title: "Profile",
    path: paths.profile.root,
    icon: <Iconify width={22} icon="solar:user-id-bold" />,
  },
  {
    title: "Contact",
    path: paths.contact,
    icon: <Iconify width={22} icon="solar:phone-bold-duotone" />,
  },
];
