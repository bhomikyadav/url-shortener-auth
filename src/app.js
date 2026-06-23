async function startServer() {
  const { default: app } = await import("./config/express.config");

  app.listen(process.env.PORT, () => {
    console.log(
      `Server 💚 is started at (${process.env.PORT}): ENV : ${process.env.CURRENT_ENV}`,
    );
  });
}

startServer();
