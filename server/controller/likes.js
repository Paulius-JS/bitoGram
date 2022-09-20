import express from "express";
import db from "../database/connect.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const allLikes = await db.Likes.findAll({});
    res.json(allLikes);
  } catch (error) {
    console.log(error);
    res.status(418).send("server error");
  }
});

router.post("/:id", auth, async (req, res) => {
  try {
    const Like = await db.Likes.findOne({
      where: {
        userId: req.session.user.id,
        postId: req.params.id,
      },
    });

    if (Like) {
      await db.Likes.destroy({
        where: {
          userId: req.session.user.id,
          postId: req.params.id,
        },
      });
      res.send("unliked");
    } else {
      await db.Likes.create({
        userId: req.session.user.id,
        postId: req.params.id,
      });
      res.send("liked");
    }
  } catch (error) {
    console.log(error);
    res.status(418).send("server error");
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const Like = await db.Likes.findOne({
      where: {
        userId: req.session.user.id,
        postId: req.params.id,
      },
    });

    if (Like) {
      res.send("liked");
    } else {
      res.send("unliked");
    }
  } catch (error) {
    console.log(error);
    res.status(418).send("server error");
  }
});

export default router;
