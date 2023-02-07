import {
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Auth } from "../../interfaces/Auth";
import { signUp } from "./authSlice";
import { useAppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";

const schema = yup
  .object({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
    confirmPassword: yup.string().required("Password is required"),
    firstName: yup.string().required("Password is required"),
    lastName: yup.string().required("Password is required"),
  })
  .required();

export default function RegistrationPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Auth>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: Auth) => {
    dispatch(signUp(data));
    reset();
    navigate("/");
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="md">
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <Grid container>
            <Grid
              item
              xs={10}
              sx={{
                border: "2px solid #bdbdbd",
                borderRadius: "20px",
                margin: "5rem auto",
                padding: "1rem",
              }}
            >
              <Typography sx={{ fontSize: "1.5em" }} variant="h1" gutterBottom>
                Registration
              </Typography>
              <Grid item sx={{ margin: "1rem" }}>
                <TextField
                  error={errors.username ? true : false}
                  helperText={errors.username?.message}
                  fullWidth
                  label="Username"
                  {...register("username")}
                />
              </Grid>
              <Grid item sx={{ margin: "1rem" }}>
                <TextField
                  error={errors.firstName ? true : false}
                  helperText={errors.firstName?.message}
                  fullWidth
                  label="First Name"
                  {...register("firstName")}
                />
              </Grid>
              <Grid item sx={{ margin: "1rem" }}>
                <TextField
                  error={errors.lastName ? true : false}
                  helperText={errors.lastName?.message}
                  fullWidth
                  label="Last Name"
                  {...register("lastName")}
                />
              </Grid>
              <Grid item sx={{ margin: "1rem" }}>
                <TextField
                  error={errors.password ? true : false}
                  helperText={errors.password?.message}
                  fullWidth
                  label="Password"
                  type="password"
                  {...register("password")}
                />
              </Grid>
              <Grid item sx={{ margin: "1rem" }}>
                <TextField
                  error={errors.confirmPassword ? true : false}
                  helperText={errors.confirmPassword?.message}
                  fullWidth
                  label="Confirm Password"
                  type="password"
                  {...register("confirmPassword")}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disableElevation
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
}
