// styles/styles.ts
import { styled } from "@mui/material/styles";
import { Container, Paper, Box, Typography } from "@mui/material";

export const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(3),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
}));

export const FormPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  borderRadius: theme.spacing(1),
  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
}));

export const FormContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
  maxWidth: "100%",
  margin: "0 auto",
}));

export const ErrorText = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  fontSize: "0.75rem",
  marginTop: theme.spacing(0.5),
}));

export const FormTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.5rem",
  [theme.breakpoints.up("sm")]: {
    fontSize: "2rem",
  },
  fontWeight: 600,
  textAlign: "center",
  marginBottom: theme.spacing(1),
}));

export const FormDescription = styled(Typography)(({ theme }) => ({
  fontSize: "0.875rem",
  [theme.breakpoints.up("sm")]: {
    fontSize: "1rem",
  },
  textAlign: "center",
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(4),
}));
