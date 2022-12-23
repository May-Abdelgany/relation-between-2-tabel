import { Router } from "express";
import * as user from "./controller/users.js";
const router = Router();

router.get("/users", user.users);
router.get("/usersWithConditionAge", user.users2);
router.get("/usersWith2Condition", user.users3);
router.get("/usersWith3Condition", user.users4);
router.get("/", user.allUsers);
router.get("/:id", user.getUserById);
router.post("/signup", user.signup);
router.post("/signin", user.signin);
router.put("/:id", user.update);
router.delete("/:id", user.deleteuser);

export default router;
