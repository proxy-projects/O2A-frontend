import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { supabase } from "../../../config/supabaseClient";
import { useNavigate } from "react-router-dom";

const organizationSchema = z.object({
  name: z
    .string()
    .min(2, "Organization name must be at least 2 characters")
    .max(50, "Organization name must be less than 50 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be less than 500 characters")
    .optional(),
});

type OrganizationFormData = z.infer<typeof organizationSchema>;

function CreateOrganization() {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<OrganizationFormData>({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (organizationData: OrganizationFormData) => {
    try {
      const { data, error } = await supabase
        .from("organizations")
        .insert([
          {
            organization_name: organizationData.name,
            organization_description: organizationData.description,
          },
        ])
        .select()
        .single();

      if (error) {
        console.error("Enter organization data");
        return;
      }

      if (data) {
        navigate("/" + data.id);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-lg space-y-8 pb-8 bg-white rounded-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight">
            Add organization
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Input
              name="name"
              control={control}
              placeholder="Organization name"
              type="text"
            />
          </div>

          <div className="space-y-2">
            <Input
              name="description"
              control={control}
              placeholder="Organization description"
              type="text"
            />
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full bg-blue-600 text-white hover:bg-blue-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Organization"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default CreateOrganization;
