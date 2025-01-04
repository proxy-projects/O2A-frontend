import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../components/ui/Input/Input";
import Button from "../../components/ui/Button/Button";

const signUpSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Provide a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    confirmPassword: z.string(),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: "accept our terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignUpFormData = z.infer<typeof signUpSchema>;

function SignUpForm() {
  const { control, handleSubmit } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const onSubmit = (data: SignUpFormData) => {
    console.log(data);
  };

  return (
    <div className="h-screen flex items-center justify-center border border-red-400">
      <div className="w-1/3 border rounded-3xl pt-6 pb-10 px-8 space-y-5">
        <h1 className="text-3xl text-center">Register</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <Input name="username" control={control} placeholder="Username" />
          <Input
            name="email"
            control={control}
            type="email"
            placeholder="Email"
          />
          <div className="relative">
            <Input
              name="password"
              control={control}
              type="password"
              placeholder="Password"
            />
          </div>
          <div className="relative">
            <Input
              name="confirmPassword"
              control={control}
              type="password"
              placeholder="Confirm Password"
            />
          </div>
          <div className="flex items-center space-x-2">
            <div>
              <Input
                name="acceptTerms"
                control={control}
                type="checkbox"
                className="mt-1"
              />
            </div>
            <p className="text-sm text-gray-600">
              Agree to our{" "}
              <a
                href="#"
                className="text-blue-600 hover:text-blue-500 underline"
              >
                terms and conditions
              </a>
              ?
            </p>
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3"
          >
            Register
          </Button>
        </form>
        <p className="font-light text-center">Already registered? <span className="font-semibold">Login</span></p>
      </div>
    </div>
  );
}

export default SignUpForm;
