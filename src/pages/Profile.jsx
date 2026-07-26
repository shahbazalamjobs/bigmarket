import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LogOut, Package, Heart, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

import { logout } from "../features/auth/authSlice";

function Profile() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());

    toast.success("Logged out successfully");
  };

  if (!user) {
    return (
      <div className="flex h-96 items-center justify-center">Please login</div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <h1 className="text-4xl font-bold">My Account</h1>

      {/* Profile Header */}

      <div className="rounded-xl border p-6 shadow-sm">
        <div className="flex items-center gap-6">
          <img
            src={user.image}
            alt={user.firstName}
            className="h-24 w-24 rounded-full object-cover"
          />

          <div>
            <h2 className="text-2xl font-bold">
              {user.firstName} {user.lastName}
            </h2>

            <p className="text-gray-500">@{user.username}</p>

            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Account Links */}

      <div className="grid gap-5 md:grid-cols-3">
        <Link
          to="/orders"
          className="flex items-center gap-3 rounded-xl border p-5 hover:bg-gray-50"
        >
          <Package />
          <span>Orders</span>
        </Link>

        <Link
          to="/wishlist"
          className="flex items-center gap-3 rounded-xl border p-5 hover:bg-gray-50"
        >
          <Heart />
          <span>Wishlist</span>
        </Link>

        <Link
          to="/cart"
          className="flex items-center gap-3 rounded-xl border p-5 hover:bg-gray-50"
        >
          <ShoppingCart />
          <span>Cart</span>
        </Link>
      </div>

      {/* Personal Information */}

      <div className="rounded-xl border p-6">
        <h2 className="mb-5 text-xl font-semibold">Personal Information</h2>

        <div className="space-y-3 text-gray-600">
          <p>
            <strong>Name:</strong> {user.firstName} {user.lastName}
          </p>

          <p>
            <strong>Email:</strong> {user.email}
          </p>

          <p>
            <strong>Phone:</strong> {user.phone || "Not available"}
          </p>

          <p>
            <strong>Gender:</strong> {user.gender || "Not available"}
          </p>
        </div>
      </div>

      {/* Address */}

      <div className="rounded-xl border p-6">
        <h2 className="mb-5 text-xl font-semibold">Address</h2>

        <p className="text-gray-600">
          {user.address?.address || "No address"}
          <br />
          {user.address?.city}
          <br />
          {user.address?.state}
        </p>
      </div>

      {/* Logout */}

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 rounded-lg bg-red-600 px-6 py-2 text-white hover:bg-red-700"
      >
        <LogOut size={20} />
        Logout
      </button>
    </div>
  );
}

export default Profile;
