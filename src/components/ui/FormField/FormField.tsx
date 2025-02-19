import { Box, TextField } from "@mui/material";
import { FormInput } from "../../../types/types";

interface FormFieldProps {
  input: FormInput;
  register: any;
  error?: string;
}

export const FormField = ({ input, register, error }: FormFieldProps) => (
  <Box key={input.id}>
    <TextField
      fullWidth
      label={input.label}
      placeholder={input.placeholder}
      variant="outlined"
      required={input.required}
      type={input.type}
      error={!!error}
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
    {error && <p>{error}</p>}
  </Box>
);
