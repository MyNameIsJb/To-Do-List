import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Task } from "../../interfaces/Task";
import { getTasks, statusUpdate } from "./taskSlice";

export default function TasksPage() {
  const dispatch = useAppDispatch();
  const { tasks, loading } = useAppSelector((state) => state.tasks);
  const user = localStorage.getItem("name");
  const updateStatus = (task: Task) => {
    let status = "";
    if (task.status === "pending") {
      status = "on going";
    } else if (task.status === "on going") {
      status = "done";
    } else if (task.status === "done") {
      status = "pending";
    }
    dispatch(
      statusUpdate({
        ...task,
        status: status,
        updator: localStorage.getItem("name"),
      })
    );
  };

  const initApp = React.useCallback(async () => {
    await dispatch(getTasks());
  }, [dispatch]);

  React.useEffect(() => {
    initApp();
  }, [initApp, dispatch]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl">
        <Grid container>
          {loading ? (
            <CircularProgress />
          ) : (
            tasks &&
            tasks.map(
              (task) =>
                task.creator === user && (
                  <Grid item xs={6} key={task._id}>
                    <Card sx={{ minWidth: 275, margin: "1rem" }}>
                      <CardContent>
                        <Link to={`/editTask/${task._id}`}>
                          <Typography
                            sx={{ fontSize: "1.5em" }}
                            variant="h1"
                            gutterBottom
                          >
                            {task.taskName}
                          </Typography>
                        </Link>
                        <Typography sx={{ fontSize: "1em" }} variant="body1">
                          Description:{" "}
                          {task.description
                            ? task.description
                            : "No Description"}
                        </Typography>
                        <Typography sx={{ fontSize: "1em" }} variant="body1">
                          Category:{" "}
                          {task.category ? task.category : "No Category"}
                        </Typography>
                        <Typography sx={{ fontSize: "1em" }} variant="body2">
                          End Date:{" "}
                          {task.endDate
                            .toString()
                            .substring(0, 10)
                            .replaceAll("-", "/")}
                        </Typography>
                        <Button
                          onClick={() => updateStatus(task)}
                          variant="contained"
                          color={
                            task.status === "pending"
                              ? "secondary"
                              : task.status === "on going"
                              ? "primary"
                              : "success"
                          }
                          sx={{ marginTop: "1rem" }}
                        >
                          {task.status}
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                )
            )
          )}
        </Grid>
      </Container>
    </React.Fragment>
  );
}
