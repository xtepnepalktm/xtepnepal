import React from "react";

import Grid from "@mui/material/Grid2";
import {
  styled,
  Box,
  Link,
  Divider,
  Container,
  Typography,
  Stack,
  IconButton,
} from "@mui/material";

import { paths } from "@/routes/paths";
import { RouterLink } from "@/routes/components";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setBrand, setCategory } from "@/redux/actions";

import { FacebookIcon, LinkedinIcon, InstagramIcon } from "@/assets/icons";

import { Logo } from "@/components/logo";

import { useGetBrands, useGetHomeRecentProducts } from "@/api";

// ----------------------------------------------------------------------

export const socials = [
  {
    value: "facebook",
    label: "Facebook",
    path: "https://www.facebook.com/caitlyn.kerluke",
  },
  {
    value: "instagram",
    label: "Instagram",
    path: "https://www.instagram.com/caitlyn.kerluke",
  },
  {
    value: "linkedin",
    label: "Linkedin",
    path: "https://www.linkedin.com/caitlyn.kerluke",
  },
];

const LEGAL_SECTIONS = [
  { name: "Terms and condition", href: "#" },
  { name: "Privacy policy", href: "#" },
];

// ----------------------------------------------------------------------

const FooterRoot = styled("footer")(({ theme }) => ({
  position: "relative",

  [theme.breakpoints.down("md")]: {
    paddingBottom: "var(--layout-nav-mobile-bottom-height)", // to prevent content to hide by nav mobile bottom"
  },
}));

export function Footer({
  sx,
  layoutQuery = "md",
  pages,
  categories,
  ...other
}) {
  const dispatch = useAppDispatch();

  const { vendor } = useAppSelector((state) => state.vendor);

  const { brands } = useGetBrands();

  const { recentProducts } = useGetHomeRecentProducts();

  const handleClickBrand = (brandId) => {
    dispatch(setBrand([brandId]));
    dispatch(setCategory(""));
  };

  const handleClickCategory = (categoryId) => {
    dispatch(setCategory(categoryId));
  };

  return (
    <FooterRoot
      sx={[
        { backgroundColor: vendor?.primary_color },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {/* <Divider /> */}

      <Container
        maxWidth="xl"
        sx={(theme) => ({
          py: 5,
          color: theme.palette.grey[300],
          display: "flex",
          flexDirection: "column",
          gap: 3,
          textAlign: "center",
          [theme.breakpoints.up(layoutQuery)]: { textAlign: "unset" },
        })}
      >
        <Logo />

        <Grid
          container
          sx={[
            (theme) => ({
              justifyContent: "center",
              [theme.breakpoints.up(layoutQuery)]: {
                justifyContent: "space-between",
              },
            }),
          ]}
        >
          <Grid size={{ xs: 12, [layoutQuery]: 3 }}>
            <Stack spacing={3}>
              <Typography
                variant="body2"
                sx={(theme) => ({
                  mx: "auto",
                  maxWidth: 280,
                  color: theme.palette.grey[200],
                  [theme.breakpoints.up(layoutQuery)]: { mx: "unset" },
                })}
              >
                We’re dedicated to providing a smooth and reliable shopping
                experience with a wide selection of quality products, fast
                delivery, and customer service you can count on. Shop with
                confidence and convenience.
              </Typography>

              <Box
                sx={(theme) => ({
                  display: "flex",
                  gap: 1,
                })}
              >
                {socials.map((social) => (
                  <IconButton key={social.label}>
                    {social.value === "facebook" && <FacebookIcon />}
                    {social.value === "instagram" && <InstagramIcon />}
                    {social.value === "linkedin" && <LinkedinIcon />}
                  </IconButton>
                ))}
              </Box>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, [layoutQuery]: 6 }}>
            <Box
              sx={(theme) => ({
                gap: 5,
                display: "flex",
                flexDirection: "column",
                [theme.breakpoints.up(layoutQuery)]: { flexDirection: "row" },
              })}
            >
              <Box
                sx={(theme) => ({
                  gap: 2,
                  width: 1,
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  [theme.breakpoints.up(layoutQuery)]: {
                    alignItems: "flex-start",
                  },
                })}
              >
                <Typography component="div" variant="subtitle2">
                  Brands
                </Typography>

                {brands?.slice(0, 4)?.map((brand) => (
                  <Link
                    key={brand.brand_id}
                    component={RouterLink}
                    href={paths.product.root}
                    color="inherit"
                    variant="body2"
                    title={brand.brand_name}
                    onClick={() => handleClickBrand(brand.brand_id)}
                  >
                    {brand.brand_name}
                  </Link>
                ))}
              </Box>

              <Box
                sx={(theme) => ({
                  gap: 2,
                  width: 1,
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  [theme.breakpoints.up(layoutQuery)]: {
                    alignItems: "flex-start",
                  },
                })}
              >
                <Typography component="div" variant="subtitle2">
                  {vendor?.vendor_name}
                </Typography>

                <Link
                  component={RouterLink}
                  href={paths.blog.root}
                  color="inherit"
                  variant="body2"
                  title="Blogs"
                >
                  Blogs
                </Link>

                {pages?.map((link) => {
                  if (link.show_in_footer === "0" || !link.path) {
                    return null;
                  }

                  return (
                    <Link
                      key={link.title}
                      component={RouterLink}
                      href={link.path}
                      color="inherit"
                      variant="body2"
                    >
                      {link.title}
                    </Link>
                  );
                })}
              </Box>

              <Box
                sx={(theme) => ({
                  gap: 2,
                  width: 1,
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  [theme.breakpoints.up(layoutQuery)]: {
                    alignItems: "flex-start",
                  },
                })}
              >
                <Typography component="div" variant="subtitle2">
                  Contact
                </Typography>

                <Link
                  component={RouterLink}
                  href={"#"}
                  color="inherit"
                  variant="body2"
                >
                  {vendor?.contact_info}
                </Link>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Grid container>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Stack spacing={2}>
              <Typography variant="h3" sx={{
                fontSize: {
                  xs: "0.8rem",
                  sm: "0.9rem",
                  md: "1rem"
                }
              }} >Shop By Category</Typography>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {categories?.map((category, index) => (
                  <React.Fragment key={category.category_id}>
                    <Link
                      key={category.category_id}
                      component={RouterLink}
                      href={paths.product.root}
                      color="inherit"
                      variant="body2"
                      onClick={() => handleClickCategory(category.category_id)}
                    >
                      {category.name}
                    </Link>

                    {index < categories?.length - 1 && (
                      <Divider orientation="vertical" sx={{ height: "22px" }} />
                    )}
                  </React.Fragment>
                ))}
              </Box>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Stack spacing={2}>
              <Typography variant="h3" sx={{
                fontSize: {
                  xs: "0.8rem",
                  sm: "0.9rem",
                  md: "1rem"
                }
              }} > Latest </Typography>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {recentProducts?.map((product, index) => (
                  <React.Fragment key={product.product_id}>
                    <Link
                      key={product.product_id}
                      component={RouterLink}
                      href={paths.product.details(product.slug)}
                      color="inherit"
                      variant="body2"
                    >
                      {product.name}
                    </Link>

                    {index < recentProducts?.length - 1 && (
                      <Divider orientation="vertical" sx={{ height: "22px" }} />
                    )}
                  </React.Fragment>
                ))}
              </Box>
            </Stack>
          </Grid>
        </Grid>

        <Divider />

        <Box
          sx={(theme) => ({
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          })}
        >
          <Typography variant="body2">
            © {vendor?.vendor_name} 2025 | All rights reserved.
          </Typography>

          <Box
            sx={(theme) => ({
              display: "flex",
              gap: 1,
              alignItems: "center",
            })}
          >
            {LEGAL_SECTIONS.map((link, index) => (
              <React.Fragment key={link.name}>
                <Link
                  component={RouterLink}
                  href={link.href}
                  color="inherit"
                  variant="body2"
                >
                  {link.name}
                </Link>

                {index < LEGAL_SECTIONS.length - 1 && (
                  <Divider orientation="vertical" sx={{ height: "22px" }} />
                )}
              </React.Fragment>
            ))}
          </Box>
        </Box>
      </Container>
    </FooterRoot>
  );
}
