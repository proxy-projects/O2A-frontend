import { useForm, Controller } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  labelInput: z.string().min(1, "Label is required"),
  placeholderInput: z.string().min(1, "Placeholder is required"),
});

function AddInputs() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      labelInput: "",
      placeholderInput: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="w-full flex flex-col items-start justify-center">
      <div className="w-full">
        <h1 className="text-start">Add New Input</h1>
        <Controller
          name="labelInput"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Label"
              variant="outlined"
              error={!!errors.labelInput}
              helperText={`${errors.labelInput?.message || ""}`}
              fullWidth
              margin="normal"
            />
          )}
        />
        <Controller
          name="placeholderInput"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Placeholder"
              variant="outlined"
              error={!!errors.placeholderInput}
              helperText={`${errors.placeholderInput?.message || ""}`}
              fullWidth
              margin="normal"
            />
          )}
        />
      </div>
      <Button
        onClick={handleSubmit(onSubmit)}
        variant="contained"
        color="primary"
      >
        Add Input
      </Button>
    </div>
  );
}

export default AddInputs;
