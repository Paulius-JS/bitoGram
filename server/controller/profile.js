import express from "express";
import db from "../database/connect.js";
import { auth } from "../middleware/auth.js";

// import { registerValidator, loginValidator } from "../middleware/validate.js";

const router = express.Router();

router.get("/:id", auth, async (req, res) => {
  try {
    const data = await db.Users.findByPk(req.params.id, {
      attributes: ["id", "user_name"],
      include: {
        model: db.Posts,
        attributes: ["id", "text", "image"],
      },
    });
    console.log(data);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(418).send("server error");
  }
});

export default router;
