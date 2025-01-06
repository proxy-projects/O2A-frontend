import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../components/ui/Button/Button";
import Input from "../../components/ui/Input/Input";
import { Link } from "react-router-dom";

const loginSchema = z.object({
  email: z.string().email("Provide a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
});

type LoginData = z.infer<typeof loginSchema>;

function Login() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginData) => {
    try {
      console.log(data);
      // Add your login logic here
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="space-y-7 w-1/3 border py-10 px-8 shadow rounded-3xl">
        <div className="space-y-1 mb-10">
          <h1 className="text-3xl text-center">Login</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
          <Input
            name="email"
            control={control}
            type="email"
            placeholder="johndoe@example.com"
          />
          <Input
            name="password"
            control={control}
            type="password"
            placeholder="**********"
          />
          <p className="text-blue-600 cursor-pointer hover:text-blue-500 text-sm">
            Forgot password?
          </p>
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 text-white w-full"
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>
        <div className="flex space-x-2 mt-10 items-center justify-center">
          <p className="text-center text-gray-600">Don't have an account?</p>
          <Link
            to="/signup"
            className="text-blue-600 cursor-pointer hover:text-blue-500"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
