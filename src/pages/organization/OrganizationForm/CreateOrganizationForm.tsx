import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Snackbar,
  CircularProgress,
  Alert,
  AlertColor,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UserAuth } from "../../../context/AuthContext";
import { useState } from "react";
import { fetchOrganization, submitForm } from "../../../api/api";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
});

interface FormDataResponse {
  id: string;
  title: string;
  description: string;
}

const CreateOrganizationForm = () => {
  const navigate = useNavigate();
  const { session } = UserAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ title: string; description: string }>({
    resolver: zodResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: AlertColor;
  }>({ open: false, message: "", severity: "success" });
  const [formCreated, setFormCreated] = useState(false);

  const handleGoBack = () => {
    navigate(-1);
  };

  const currentUserId = session?.user?.id;


  const navigateToFormPage = (id?: string) => {
    navigate(`/form/${id}`);
  };

  const onSubmit = async (data: { title: string; description: string }) => {
    setLoading(true);
    try {
      const { data: organization, error: orgError } = await fetchOrganization(
        currentUserId
      );

      if (orgError) throw new Error("Failed to fetch organization");

      const { data: formData , error: formError } = await submitForm(
        organization.id,
        currentUserId,
        data
      )

      if (formError) throw new Error("Failed to create form");

      // setSnackbar({
      //   open: true,
      //   message: "Form created successfully!",
      //   severity: "success",
      // });

      console.log(organization)

      console.log(formData)

      // if(formData) {
      //   console.log(formData)
      //   setFormCreated(true);
      // }

      // if (formCreated) {
      //   navigateToFormPage(formData?.id);
      // } else {
      //   console.log("the form was not created")
      // }


    } catch (error) {
      console.error("An error occurred while creating form", error);
      setSnackbar({
        open: true,
        message: (error as Error).message,
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="p-4" maxWidth="sm" style={{ textAlign: "center" }}>
      {loading && (
        <CircularProgress
          style={{ position: "absolute", top: "50%", left: "50%" }}
        />
      )}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
      <Button
        onClick={handleGoBack}
        className="mt-4"
        startIcon={<ArrowBack />}
        style={{ position: "absolute", top: 16, left: 16 }}
      />
      <h1 className="text-xl font-bold mb-4">Create Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="title"
          control={control}
          defaultValue=""
          rules={{ required: "Title is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Form Title"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.title}
              helperText={errors.title ? (errors.title.message as string) : ""}
              disabled={formCreated}
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          defaultValue=""
          rules={{ required: "Description is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Form Description"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.description}
              helperText={
                errors.description ? (errors.description.message as string) : ""
              }
              disabled={formCreated}
            />
          )}
        />

        <div className="flex justify-end">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="mt-4"
            sx={{ padding: "10px 20px" }}
            disabled={formCreated}
          >
            {loading ? "Creating..." : "Create Form"}
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default CreateOrganizationForm;
