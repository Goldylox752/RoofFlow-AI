export const PRICING = {
  starter: {
    label: "Starter",
    price: 499,
    leads: "5–10",
    stripePriceId: process.env.STRIPE_PRICE_STARTER,
  },

  growth: {
    label: "Growth",
    price: 999,
    leads: "15–30",
    stripePriceId: process.env.STRIPE_PRICE_GROWTH,
  },

  domination: {
    label: "Domination",
    price: 1999,
    leads: "High volume + exclusivity",
    stripePriceId: process.env.STRIPE_PRICE_DOMINATION,
  },
};
