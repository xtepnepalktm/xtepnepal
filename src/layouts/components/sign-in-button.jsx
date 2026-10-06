import { RouterLink } from "@/routes/components";
import { paths } from "@/routes/paths";

import { useAppSelector } from "@/redux/hooks";
import { Iconify } from "@/components/iconify";

// ----------------------------------------------------------------------

export function SignInButton({ className, style, ...other }) {
  const { vendor } = useAppSelector((state) => state.vendor);

  const primaryColor = vendor?.primary_color;

  return (
    <RouterLink
      href={paths.auth.signIn}
      className={`
        inline-flex items-center gap-2 text-[15px] font-normal text-gray-900
        transition-colors duration-200 hover:text-gray-600
        ${className ?? ""}
      `}
      style={{
        ...(primaryColor && { color: primaryColor }),
        ...style,
      }}
      {...other}
    >
      <Iconify icon="solar:user-rounded-line-duotone" width={22} />
      {/* <span>Log in / Sign up</span> */}
      <span>Log in</span>
    </RouterLink>
  );
}
