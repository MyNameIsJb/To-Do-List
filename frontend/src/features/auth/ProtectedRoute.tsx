import { CircularProgress, Container, Grid, Typography } from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";
import { useAppSelector } from "../../store/store";

export default function ProtectedRoute() {
  const { hasToken, loading } = useAppSelector((state) => state.auth);
  if (!hasToken) {
    return (
      <Container maxWidth="xl">
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{
              marginTop: "5rem",
              padding: "1rem",
              textAlign: "center",
            }}
          >
            {loading ? (
              <CircularProgress />
            ) : (
              <>
                <Typography sx={{ fontSize: "5em" }} variant="h1" gutterBottom>
                  401 Unauthorized
                </Typography>
                <Typography
                  sx={{ fontSize: "1.5em" }}
                  variant="h3"
                  gutterBottom
                >
                  <NavLink to="/login">Login</NavLink> to gain access
                </Typography>
              </>
            )}
          </Grid>
        </Grid>
      </Container>
    );
  }

  // returns child route elements
  return <Outlet />;
}
