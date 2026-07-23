import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";


import LoginForm from "../components/auth/LoginForm";

function Login() {
  const { isAuthenticated } = useSelector(
    (state) => state.auth
  );

  if (isAuthenticated) {
    return <Navigate to="/profile" replace />;
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="w-full max-w-md rounded-lg border bg-white p-8 shadow">
        <h1 className="mb-2 text-center text-3xl font-bold">
          Welcome Back
        </h1>

        <p className="mb-6 text-center text-gray-500">
          Login to continue shopping
        </p>

        <LoginForm />
      </div>
    </div>
  );
}

export default Login;