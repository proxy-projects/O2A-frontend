import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../../context/AuthContext";
import { createUser, createOrganization, updateOrganization } from '../../../api/api';

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
  const { session } = UserAuth();
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
      const { data: userData } = await createUser(session);

      if (userData?.organization_id) {
        console.error("User already has an organization");
        return;
      }

      const { data: orgData, error: orgError } = await createOrganization(organizationData, session.user.id);

      if (orgError) {
        console.error("Enter organization data", orgError);
        return;
      }

      const { error: updateError } = await updateOrganization(orgData.id, session.user.id);

      if (updateError) {
        console.error("Error updating  user's organization:", updateError);
        return;
      }

      navigate("/" + orgData.id);
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
