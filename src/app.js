import express from "express";

const app = express();


app.listen(process.env.PORT, () => {
  console.log(
    `Server 💚 is running at PORT:(${process.env.PORT}) : ENV:${process.env.BUILD_ENV}`,
  );
});
