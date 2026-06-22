import express from "express";

const app = express();

console.log("Hiiii");

app.listen(process.env.PORT, () => {
  console.log(
    `Server 💚 is running at PORT:(${process.env.PORT}) : ENV:${process.env.BUILD_ENV}`,
  );
});
