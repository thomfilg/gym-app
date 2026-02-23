import React from 'react';
import { Container, Typography, Paper, Box, Card, CardContent } from '@mui/material';
import Grid from '@mui/material/Grid2';

const Analytics: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Research Analytics
        </Typography>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Research Metrics
                </Typography>
                <Typography variant="h3" color="primary">
                  24
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Active Research Projects
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Insights Generated
                </Typography>
                <Typography variant="h3" color="primary">
                  156
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  This Month
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  User Interviews
                </Typography>
                <Typography variant="h3" color="primary">
                  89
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Completed This Quarter
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Research Performance Overview
              </Typography>
              <Typography variant="body1">
                Analytics dashboard showing research activity trends, completion rates,
                and key performance indicators for product research initiatives.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Analytics;
