import express from "express";
import db from "../database/connect.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/:id", auth, async (req, res) => {
  try {
    const data = await db.Users.findByPk(req.params.id, {
      attributes: ["id", "user_name", "bio", "image"],
      include: {
        model: db.Posts,
        // Ordering is not working for now....
        order: [["createdAt", "DESC"]],
        attributes: ["id", "text", "image", "createdAt"],
        include: [db.Comments, db.Likes],
      },
    });

    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(418).send("server error");
  }
});

export default router;
