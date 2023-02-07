import * as React from "react";
import { useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Button, Grid, Skeleton, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Task } from "../../interfaces/Task";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { deleteTask, getTaskById, updateTask } from "./taskSlice";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

const schema = yup
  .object({
    taskName: yup.string().required("Task Name is required"),
    description: yup.string().required("Description is required"),
    category: yup.string().required("Category is required"),
    endDate: yup.string().required("End Date is required"),
  })
  .required();

export default function EditTaskPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const user = localStorage.getItem("name");
  const { singleTask, loading } = useAppSelector((state) => state.tasks);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Task>({
    resolver: yupResolver(schema),
    defaultValues: {
      taskName: singleTask?.taskName,
      description: singleTask?.description,
      category: singleTask?.category,
      endDate: singleTask?.endDate,
    },
  });

  useEffect(() => {
    dispatch(getTaskById(id!));
  }, [dispatch, id]);

  useEffect(() => {
    reset({
      taskName: singleTask?.taskName,
      description: singleTask?.description,
      category: singleTask?.category,
      endDate: moment(singleTask?.endDate).utc().format("YYYY-MM-DD"),
    });
  }, [reset, singleTask]);

  const onSubmit = (data: Task) => {
    const finalData = {
      _id: id,
      ...data,
      updator: user,
    };
    dispatch(updateTask(finalData));
    reset();
    navigate("/");
  };

  const handleDelete = () => {
    dispatch(deleteTask(id!));
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
                Edit Task
              </Typography>
              <Grid item sx={{ margin: "1rem" }}>
                {loading ? (
                  <Skeleton variant="text" sx={{ lineHeight: "3" }} />
                ) : (
                  <TextField
                    error={errors.taskName ? true : false}
                    helperText={errors.taskName?.message}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    label="Task Name"
                    {...register("taskName")}
                  />
                )}
              </Grid>
              <Grid item sx={{ margin: "1rem" }}>
                {loading ? (
                  <Skeleton variant="text" sx={{ lineHeight: "3" }} />
                ) : (
                  <TextField
                    error={errors.description ? true : false}
                    helperText={errors.description?.message}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    label="Description"
                    {...register("description")}
                  />
                )}
              </Grid>
              <Grid item sx={{ margin: "1rem" }}>
                {loading ? (
                  <Skeleton variant="text" sx={{ lineHeight: "3" }} />
                ) : (
                  <TextField
                    error={errors.category ? true : false}
                    helperText={errors.category?.message}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    label="Category"
                    {...register("category")}
                  />
                )}
              </Grid>
              <Grid item sx={{ margin: "1rem" }}>
                {loading ? (
                  <Skeleton variant="text" sx={{ lineHeight: "3" }} />
                ) : (
                  <TextField
                    error={errors.endDate ? true : false}
                    helperText={errors.endDate?.message}
                    InputLabelProps={{ shrink: true }}
                    type="date"
                    fullWidth
                    label="End Date"
                    {...register("endDate")}
                  />
                )}
              </Grid>
              <Grid item xs={12}>
                {loading ? (
                  <>
                    <Skeleton variant="text" sx={{ lineHeight: "3" }} />
                    <Skeleton variant="text" sx={{ lineHeight: "3" }} />
                  </>
                ) : (
                  <>
                    {user === singleTask?.creator && (
                      <>
                        {" "}
                        <Button
                          sx={{ marginBottom: "0.5rem" }}
                          type="submit"
                          fullWidth
                          variant="contained"
                          disableElevation
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={handleDelete}
                          sx={{ marginBottom: "0.5rem" }}
                          fullWidth
                          variant="contained"
                          disableElevation
                          color="error"
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </>
                )}
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Container>
    </React.Fragment>
  );
}
