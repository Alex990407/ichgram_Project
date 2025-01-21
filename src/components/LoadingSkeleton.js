import React from "react";
import { Container, Grid, Skeleton } from "@mui/material";

const LoadingSkeleton = () => (
  <div style={{ display: "flex", minHeight: "100vh" }}>
    <Container sx={{ flex: 1, marginTop: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <Skeleton variant="circular" width={120} height={120} />
        </Grid>
        <Grid item xs={12} sm={9}>
          <Skeleton variant="text" width={200} height={40} />
          <Skeleton variant="text" width={300} height={20} />
          <Skeleton variant="rectangular" width="100%" height={150} />
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ marginTop: 4 }}>
        {[...Array(6)].map((_, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Skeleton
              variant="rectangular"
              width="100%"
              height={200}
              sx={{ borderRadius: 2 }}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  </div>
);

export default LoadingSkeleton;
