import { z } from "zod";

export const checkoutSchema = z.object({
  fullName: z.string().min(3, "Name must be at least 3 characters"),

  email: z.string().email("Invalid email address"),

  phone: z.string().min(10, "Phone number must be 10 digits"),

  address: z.string().min(5, "Address is required"),

  city: z.string().min(2, "City is required"),

  state: z.string().min(2, "State is required"),

  postalCode: z.string().min(5, "Postal code is required"),

  country: z.string().min(2, "Country is required"),
});
