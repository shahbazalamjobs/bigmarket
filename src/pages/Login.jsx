import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import LoginForm from "../components/auth/LoginForm";

function Login() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (isAuthenticated) {
    return <Navigate to="/profile" replace />;
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border bg-white p-8 shadow-xl transition hover:shadow-2xl sm:p-10">
        {/* Header */}

        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-violet-600 text-2xl font-bold text-white shadow-lg">
              B
            </div>
          </div>

          <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>

          <p className="mt-2 text-sm text-gray-500">
            Login to continue shopping with BigMarket
          </p>
        </div>

        <LoginForm />

        {/* Demo Account */}

        <div className="mt-6 rounded-lg bg-violet-50 p-4 text-sm text-violet-700">
          <p className="font-medium">Demo Account</p>

          <p className="mt-1">Username: emilys</p>

          <p>Password: emilyspass</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
