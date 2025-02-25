import { Box, Paper, Typography, styled } from "@mui/material";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';

interface ErrorDisplayProps {
  message: string;
  severity?: 'error' | 'warning';
}

const ErrorContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
  maxWidth: '400px',
  width: '90%',
  borderRadius: theme.spacing(1),
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
  border: `1px solid ${theme.palette.error.light}`,
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  color: theme.palette.error.main,
  animation: 'pulse 2s infinite',
  '@keyframes pulse': {
    '0%': {
      transform: 'scale(1)',
      opacity: 1,
    },
    '50%': {
      transform: 'scale(1.1)',
      opacity: 0.7,
    },
    '100%': {
      transform: 'scale(1)',
      opacity: 1,
    },
  },
}));

const ErrorMessage = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  textAlign: 'center',
  fontWeight: 500,
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',
  },
}));

const SubMessage = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textAlign: 'center',
  fontSize: '0.875rem',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.75rem',
  },
}));

export const ErrorDisplay = ({ message, severity = 'error' }: ErrorDisplayProps) => {
  const Icon = severity === 'error' ? ErrorOutlineIcon : ReportProblemOutlinedIcon;
  
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      px={2}
      sx={{
        background: (theme) => 
          `linear-gradient(45deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`,
      }}
    >
      <ErrorContainer elevation={3}>
        <IconWrapper>
          <Icon sx={{ fontSize: 64 }} />
        </IconWrapper>
        
        <Box textAlign="center">
          <ErrorMessage variant="h6" gutterBottom>
            {message}
          </ErrorMessage>
          
          <SubMessage>
            {severity === 'error' 
              ? 'Please try again later or contact support if the problem persists.'
              : 'You can try refreshing the page or going back to the previous page.'}
          </SubMessage>
        </Box>

        {/* Optional: Add a retry or go back button */}
        {/* <Button
          variant="contained"
          color={severity === 'error' ? 'error' : 'warning'}
          sx={{ mt: 2 }}
          onClick={() => window.location.reload()}
        >
          Retry
        </Button> */}
      </ErrorContainer>
    </Box>
  );
};