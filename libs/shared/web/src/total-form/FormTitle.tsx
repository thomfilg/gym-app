import { Typography } from '@mui/material';

export interface FormTitleProps {
  title: string;
}

export const FormTitle: React.FC<FormTitleProps> = ({ title }: FormTitleProps) => (
  <Typography component="h1" variant="h5" sx={{ mb: 1 }}>
    {title}
  </Typography>
);