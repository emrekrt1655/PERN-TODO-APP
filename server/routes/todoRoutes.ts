import express from "express";
const router: any = express.Router();
import todoControllers from "../controllers/todoContollers";

router.post("/create", todoControllers.create);
router.get("/get/:todoUserId", todoControllers.getTodos);
router.delete("/delete/:todoId", todoControllers.delete);
router.put("/update/:todoId", todoControllers.update);
router.put("/done/:todoId", todoControllers.done);

export default router;
