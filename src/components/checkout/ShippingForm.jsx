import { forwardRef, useImperativeHandle } from "react";

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

const ShippingForm = forwardRef((props, ref) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkoutSchema),

    defaultValues: {
      fullName: "John Smith",
      email: "john.smith@gmail.com",
      phone: "+1 234 567 8901",
      address: "123 Main Street",
      city: "New York",
      state: "New York",
      postalCode: "10001",
      country: "United States",
    },
  });

  useImperativeHandle(ref, () => ({
    submit(onValid) {
      handleSubmit(onValid)();
    },
  }));

  return (
    <div className="rounded-xl border p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-semibold">Shipping Address</h2>

      <form className="grid gap-5 md:grid-cols-2">
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
                {errors[field.name].message}
              </p>
            )}
          </div>
        ))}
      </form>
    </div>
  );
});

ShippingForm.displayName = "ShippingForm";

export default ShippingForm;
