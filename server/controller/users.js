import express from "express";
import bcrypt from "bcrypt";
import db from "../database/connect.js";
import { registerValidator, loginValidator } from "../middleware/validate.js";
import { auth } from "../middleware/auth.js";
import upload from "../middleware/multer.js";

import { Op } from "sequelize";

const router = express.Router();

router.get("/search/:keyword", auth, async (req, res) => {
  try {
    const users = await db.Users.findAll({
      where: {
        user_name: {
          [Op.like]: "%" + req.params.keyword + "%",
        },
      },

      attributes: ["id", "user_name", "image"],
    });
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(418).send("server error");
  }
});

router.post("/register", registerValidator, async (req, res) => {
  try {
    const userExists = await db.Users.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (userExists) {
      res.status(401).send("Email already exists");
      return;
    }

    req.body.password = await bcrypt.hash(req.body.password, 10);

    await db.Users.create(req.body);
    res.send("successfully registered");
  } catch (error) {
    console.log(error);
    res.status(418).send("server error");
  }
});

router.post("/login", loginValidator, async (req, res) => {
  try {
    const user = await db.Users.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) return res.status(401).send("user not found");

    if (await bcrypt.compare(req.body.password, user.password)) {
      req.session.loggedin = true;
      req.session.user = {
        id: user.id,
        user_name: user.user_name,
        image: user.image,
        email: user.email,
        role: user.role,
      };
      res.json({ message: "successfully logd in", user: req.session.user });
    } else {
      res.status(401).send("login failed");
    }
  } catch (error) {
    console.log(error);
    res.status(418).send("server error");
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.send("successful logout");
});

router.get("/check-auth", auth, async (req, res) => {
  res.json(req.session.user);
});

router.put("/user-panel", auth, upload.single("image"), async (req, res) => {
  try {
    if (req.file) req.body.image = "/uploads/" + req.file.filename;
    const post = await db.Users.findByPk(req.session.user.id);
    post.update(req.body);

    res.send("Įrašas sėkmingai atnaujintas");
  } catch (error) {
    console.log(error);
    res.status(500).send("Įvyko serverio klaida");
  }
});

export default router;
