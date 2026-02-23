import Grid from '@mui/material/Grid2';

interface UserGridProps {
  children?: React.ReactNode;
  menu?: React.ReactNode;
}
export const UserGrid: React.FC<UserGridProps> = ({ children, menu }: UserGridProps) => (
  <Grid container rowSpacing={1} columnSpacing={1}>
    <Grid size={{ xs: 12, sm: 4, md: 3, lg: 2 }}>
      {menu}
    </Grid>
    <Grid size={{ xs: 12, sm: 8, md: 9, lg: 10 }}>
      {children}
    </Grid>
  </Grid>
);
