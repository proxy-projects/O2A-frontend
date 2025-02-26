import { useState } from "react";
import { useParams } from "react-router-dom";
import { useFormData } from "../../hooks/useFormData";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createValidationSchema } from "../../validations/validations";
import { z } from "zod";
import Spinner from "../../components/ui/Spinner/Spinner";
import { StyledContainer } from "../../styles/styles";
import { ErrorDisplay } from "../../components/ui/ErrorDisplay/ErrorDisplay";
import { FormContent } from "../../components/ui/FormContent/FormContent";
import { submitFormData } from "../../api/api";
import { Alert, Snackbar } from "@mui/material";

function UserForm() {
    const { organizationId } = useParams<{ organizationId: string }>();
    const formState = useFormData(organizationId);
    const [showSuccess, setShowSuccess] = useState(false);
  
    const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting, isDirty, isValid },
      trigger,
      reset,
      watch,
    } = useForm<z.infer<ReturnType<typeof createValidationSchema>>>({
      resolver: zodResolver(createValidationSchema(formState.inputs)),
      mode: "onChange",
      defaultValues: formState.inputs.reduce((acc, input) => {
        acc[input.id] = "";
        return acc;
      }, {} as Record<string, string>),
    });
  
    const formValues = watch();
  
    const onSubmit = async (data: z.infer<ReturnType<typeof createValidationSchema>>) => {
      const isValidForm = await trigger();
      const hasEmptyRequiredFields = formState.inputs
        .filter((input) => input.required)
        .some((input) => !data[input.id]);
  
      if (!isValidForm || hasEmptyRequiredFields) {
        await trigger();
        return;
      }
  
      try {
        const enhancedFormData = formState.inputs.map(input => ({
          id: input.id,
          label: input.label,
          value: data[input.id],
        }))

        const result = await submitFormData(organizationId!, enhancedFormData);

        if(result.error) throw result.error;

        setShowSuccess(true)

        reset();
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    };
  
    if (formState.error) {
      return <ErrorDisplay message={formState.error} severity="error"/>;
    }
  
    if (formState.isLoading) {
      return <Spinner />;
    }
  
    return (
      <StyledContainer maxWidth="lg">
        <FormContent
          formState={formState}
          register={register}
          errors={errors}
          isSubmitting={isSubmitting}
          isDirty={isDirty}
          isValid={isValid}
          formValues={formValues}
          onSubmit={handleSubmit(onSubmit)}
        />
        <Snackbar
        open={showSuccess}
        autoHideDuration={2000}
        onClose={()=> setShowSuccess(false)}
        >
          <Alert severity="success">Form submitted  successfully</Alert>
        </Snackbar>
      </StyledContainer>
    );
  }
  
  export default UserForm;