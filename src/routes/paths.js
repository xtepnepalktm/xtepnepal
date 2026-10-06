const ROOTS = {
  AUTH: "/auth",
};

// ----------------------------------------------------------------------

export const paths = {
  home: "/",

  about: "/about-us",

  contact: "/contact-us",

  faqs: "/faqs",

  product: {
    root: `/product`,
    details: (id) => `/product/${id}`,
    quickOrder: (id) => `/product/${id}/quick-order`,
  },

  category: "/category",

  // AUTH
  auth: {
    signIn: `${ROOTS.AUTH}/sign-in`,
    signUp: `${ROOTS.AUTH}/sign-up`,
    verifyEmail: `${ROOTS.AUTH}/verify-email`,
    verifyEmailChange: `${ROOTS.AUTH}/verify-email-change`,
    googleCallback: `${ROOTS.AUTH}/google/callback`,
  },

  profile: {
    root: "/profile",
    // edit: "/profile/edit",
  },

  cart: "/cart",

  checkout: "/checkout",

  wishlist: "/wishlist",

  order: {
    root: "/order",
    details: (id) => `/order/${id}`,
  },

  blog: {
    root: "/blog",
    details: (slug) => `/blog/${slug}`,
  },

  service: {
    root: "/technology",
    details: (slug) => `/technology/${slug}`,
  },
};
