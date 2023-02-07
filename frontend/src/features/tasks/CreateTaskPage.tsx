import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Task } from "../../interfaces/Task";
import { useAppDispatch } from "../../store/store";
import { createTask } from "./taskSlice";
import { useNavigate } from "react-router-dom";

const schema = yup
  .object({
    taskName: yup.string().required("Task Name is required"),
    description: yup.string().required("Description is required"),
    category: yup.string().required("Category is required"),
    endDate: yup.string().required("End Date is required"),
  })
  .required();

export default function CreateTaskPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Task>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: Task) => {
    let finalData = {
      ...data,
      creator: localStorage.getItem("name"),
    };
    dispatch(createTask(finalData));
    reset();
    navigate("/");
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md">
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <Grid container>
            <Grid
              item
              xs={12}
              sx={{
                border: "2px solid #bdbdbd",
                borderRadius: "20px",
                marginTop: "5rem",
                padding: "1rem",
              }}
            >
              <Typography sx={{ fontSize: "1.5em" }} variant="h1" gutterBottom>
                Add Task
              </Typography>
              <Grid item sx={{ margin: "1rem" }}>
                <TextField
                  error={errors.taskName ? true : false}
                  helperText={errors.taskName?.message}
                  fullWidth
                  label="Task Name"
                  {...register("taskName")}
                />
              </Grid>
              <Grid item sx={{ margin: "1rem" }}>
                <TextField
                  error={errors.description ? true : false}
                  helperText={errors.description?.message}
                  fullWidth
                  label="Description"
                  {...register("description")}
                />
              </Grid>
              <Grid item sx={{ margin: "1rem" }}>
                <TextField
                  error={errors.category ? true : false}
                  helperText={errors.category?.message}
                  fullWidth
                  label="Category"
                  {...register("category")}
                />
              </Grid>
              <Grid item sx={{ margin: "1rem" }}>
                <TextField
                  error={errors.endDate ? true : false}
                  helperText={errors.endDate?.message}
                  InputLabelProps={{ shrink: true }}
                  type="date"
                  fullWidth
                  label="date"
                  {...register("endDate")}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disableElevation
                >
                  Create
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Container>
    </React.Fragment>
  );
}
