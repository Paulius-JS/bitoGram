import express from "express";
import cors from "cors";
import session from "express-session";
import { Users, Posts, Comments, Profiles } from "./controller/index.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use(express.urlencoded({ extended: true }));

app.set("trust proxy", 1);

app.use(
  session({
    secret: "wow so secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 6000000,
    },
  })
);

app.use("/api/", Users);
app.use("/api/posts/", Posts);
app.use("/api/comments/", Comments);
app.use("/api/profile/", Profiles);

app.listen(3000);
