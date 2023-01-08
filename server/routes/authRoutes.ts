import express from "express";
const router: any = express.Router();
import authControllers from "../controllers/authControllers";
import validRegister from "../middleware/valid";

router.post("/register", validRegister, authControllers.register);

router.post("/login", authControllers.login);

router.get("/users", authControllers.getUsers);
router.get("/refresh_token", authControllers.refreshToken);
router.get("/logout", authControllers.logout);

export default router;
