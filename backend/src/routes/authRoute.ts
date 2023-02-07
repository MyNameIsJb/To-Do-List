import { Router } from "express";
import { signin, signup } from "../controllers/userController";

const router: Router = Router();

router.post("/login", signin);
router.post("/register", signup);

export default router;
