import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { checkoutSchema } from "../../features/checkout/checkoutSchema";
import { Input } from "../ui/input";

const fields = [
  {
    name: "fullName",
    label: "Full Name",
    type: "text",
    placeholder: "Enter your full name",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
  },
  {
    name: "phone",
    label: "Phone Number",
    type: "tel",
    placeholder: "Enter your phone number",
  },
  {
    name: "address",
    label: "Address",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    name: "city",
    label: "City",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    name: "state",
    label: "State",
    type: "text",
    placeholder: "Enter your state",
  },
  {
    name: "postalCode",
    label: "Postal Code",
    type: "text",
    placeholder: "Enter your postal code",
  },
  {
    name: "country",
    label: "Country",
    type: "text",
    placeholder: "Enter your country",
  },
];

function ShippingForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkoutSchema),

    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
  });

  return (
    <div className="rounded-xl border p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-semibold">Shipping Address</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-5 md:grid-cols-2"
      >
        {fields.map((field) => (
          <div
            key={field.name}
            className={field.name === "address" ? "md:col-span-2" : ""}
          >
            <label className="mb-2 block text-sm font-medium">
              {field.label}
            </label>

            <Input
              type={field.type}
              placeholder={field.placeholder}
              {...register(field.name)}
            />

            {errors[field.name] && (
              <p className="mt-1 text-sm text-red-500">
                {errors[field.name]?.message}
              </p>
            )}
          </div>
        ))}

        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            Save Shipping Information
          </button>
        </div>
      </form>
    </div>
  );
}

export default ShippingForm;
