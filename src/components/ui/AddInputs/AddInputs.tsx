import { useForm, Controller } from "react-hook-form";
import { TextField, Button, IconButton, Snackbar, Alert } from "@mui/material";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Close } from "@mui/icons-material";
import { useState } from "react";
import { addFormInput } from "../../../api/api";
import { useNavigate } from "react-router-dom";

interface AddInputsProps {
  setIsInputVisible: (visible: boolean) => void;
  formId: string | undefined;
}

const schema = z.object({
  labelInput: z.string().min(1, "Label is required"),
  placeholderInput: z.string().min(1, "Placeholder is required"),
});

export type AddInputsData = z.infer<typeof schema>;

const SNACKBAR_DURATION = 2000;

const useSnackbar = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error"
  });

  const handleSnackbarClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'click away') return;
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return { snackbar, setSnackbar, handleSnackbarClose };
}

function AddInputs({ setIsInputVisible, formId }: AddInputsProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const { snackbar, setSnackbar, handleSnackbarClose } = useSnackbar();
  const navigate  = useNavigate();

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { labelInput: "", placeholderInput: "" },
  });

  const handleClose = () => setIsInputVisible(false);

  const showSuccessAndClose = () => {
    setSnackbar({ open: true, message: "Input added successfully!", severity: "success" });
    reset({ labelInput: "", placeholderInput: "" });
  };

  const onSubmit = async (data: AddInputsData) => {
    try {
      setLoading(true);
      await addFormInput(formId!, data);
      showSuccessAndClose();
      setTimeout(() => {
        navigate(0);
      }, SNACKBAR_DURATION);
    } catch (error) {
      console.error("Error adding input:", error);
      setSnackbar({ open: true, message: "An unexpected error occurred", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-start justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div>
          <div className="flex justify-end">
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </div>
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
                helperText={errors.labelInput?.message || ""}
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
                helperText={errors.placeholderInput?.message || ""}
                fullWidth
                margin="normal"
              />
            )}
          />
        </div>
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? "Adding..." : "Add Input"}
        </Button>
      </form>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={SNACKBAR_DURATION} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default AddInputs;

