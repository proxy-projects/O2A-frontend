import { useEffect, useState } from "react";
import { FormState } from "../types/types";
import { fetchFormData, getOrganizationForm } from "../api/api";

export const useFormData = (organizationId: string | undefined) => {
  const [formState, setFormState] = useState<FormState>({
    title: "",
    description: "",
    inputs: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!organizationId) {
        setFormState((prev) => ({
          ...prev,
          error: "No organization ID found",
          isLoading: false,
        }));
        return;
      }

      try {
        const { formsData } = await getOrganizationForm(organizationId);
        if (!formsData?.id) throw new Error("No Form ID found");

        const { formInputsData, formInfoData } = await fetchFormData(
          formsData.id
        );

        setFormState({
          title: formInfoData?.title ?? "Form",
          description:
            formInfoData?.description ?? "Please fill out the form below",
          inputs: Array.isArray(formInputsData) ? formInputsData : [],
          isLoading: false,
          error: null,
        });
      } catch (error) {
        setFormState((prev) => ({
          ...prev,
          error: "No Form Found For this organization",
          isLoading: false,
        }));
        console.error("Error fetching form data:", error);
      }
    };

    fetchData();
  }, [organizationId]);

  return formState;
};
