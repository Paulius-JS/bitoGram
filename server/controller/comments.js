import express from "express";

import { auth } from "../middleware/auth.js";
import db from "../database/connect.js";

const router = express.Router();

router.post("/new", auth, async (req, res) => {
  try {
    req.body.userId = req.session.user.id;
    const comment = await db.Comments.create(req.body);

    res.json(comment);
  } catch (error) {
    console.log(error);
    res.status(418).send("Server error");
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const comments = await db.Comments.findAll({
      include: {
        model: db.Users,
        attributes: ["user_name"],
      },
    });
    res.json(comments);
  } catch (error) {
    console.log(error);
    res.status(418).send("Server error");
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const comment = await db.Comments.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json(comment);
  } catch (error) {
    console.log(error);
    res.status(418).send("Server error");
  }
});

export default router;
