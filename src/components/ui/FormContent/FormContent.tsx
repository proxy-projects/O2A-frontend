import { 
    Box, 
    Button, 
    CircularProgress, 
    TextField, 
  } from "@mui/material";
  import { FieldErrors } from "react-hook-form";
import { FormState } from "../../../types/types";
import { ErrorText, FormContainer, FormDescription, FormPaper, FormTitle } from "../../../styles/styles";
  
  interface FormContentProps {
    formState: FormState;
    register: any;
    errors: FieldErrors;
    isSubmitting: boolean;
    isDirty: boolean;
    isValid: boolean;
    formValues: Record<string, string>;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  }
  
  export const FormContent = ({
    formState,
    register,
    errors,
    isSubmitting,
    isDirty,
    isValid,
    formValues,
    onSubmit,
  }: FormContentProps) => {
    return (
      <Box sx={{ maxWidth: "600px", width: "100%", margin: "0 auto", my: { xs: 2, sm: 4 } }}>
        <FormPaper>
          <FormTitle variant="h1">
            {formState.title}
          </FormTitle>
          
          <FormDescription>
            {formState.description}
          </FormDescription>
  
          <form onSubmit={onSubmit} noValidate>
            <FormContainer>
              {formState.inputs.map((input) => (
                <Box key={input.id}>
                  <TextField
                    fullWidth
                    label={input.label}
                    placeholder={input.placeholder}
                    variant="outlined"
                    required={input.required}
                    type={input.type}
                    error={!!errors[input.id]}
                    helperText={errors[input.id]?.message as string}
                    {...register(input.id)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-error": {
                          "& fieldset": {
                            borderColor: "error.main",
                          },
                        },
                      },
                      "& .MuiFormLabel-root": {
                        "&.Mui-error": {
                          color: "error.main",
                        },
                      },
                    }}
                  />
                </Box>
              ))}
  
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={
                  isSubmitting || 
                  !isDirty || 
                  !isValid || 
                  formState.inputs
                    .filter(input => input.required)
                    .some(input => !formValues[input.id])
                }
                sx={{
                  mt: 2,
                  py: 1.5,
                  backgroundColor: "primary.main",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                  },
                  "&.Mui-disabled": {
                    backgroundColor: "#e0e0e0",
                    color: "#9e9e9e",
                  },
                  textTransform: "none",
                  fontWeight: 600,
                }}
              >
                {isSubmitting ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Submit"
                )}
              </Button>
  
              {Object.keys(errors).length > 0 && (
                <ErrorText sx={{ textAlign: "center" }}>
                  Please fill in all required fields correctly
                </ErrorText>
              )}
            </FormContainer>
          </form>
        </FormPaper>
      </Box>
    );
  };