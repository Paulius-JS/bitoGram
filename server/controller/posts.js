import express from "express";
import db from "../database/connect.js";
import { auth } from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/new", auth, upload.single("image"), async (req, res) => {
  try {
    req.body.userId = req.session.user.id;
    req.body.image = "/uploads/" + req.file.filename;

    await db.Posts.create(req.body);

    res.send("Post created");
  } catch (error) {
    console.log(error);
    res.status(418).send("server error");
  }
});

router.get("/single/:id", auth, async (req, res) => {
  try {
    const post = await db.Posts.findByPk(req.params.id, {
      include: [
        {
          model: db.Users,
          attributes: ["id", "user_name", "image"],
        },
        {
          model: db.Comments,
          include: db.Users,
        },
        {
          model: db.Likes,
          include: db.Users,
        },
      ],
    });

    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(418).send("server error");
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const posts = await db.Posts.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: db.Users,
          attributes: ["id", "user_name", "image"],
        },
        {
          model: db.Comments,
          include: db.Users,
        },
        {
          model: db.Likes,
          include: db.Users,
        },
      ],
    });

    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(418).send("server error");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const post = await db.Posts.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(418).send("Server error");
  }
});

export default router;
