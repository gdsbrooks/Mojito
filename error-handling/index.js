const { randomDrink } = require("../middlewares/custom-middleware");

module.exports = (app) => {
  app.use(randomDrink, (req, res, next) => {
    res.status(404).render("not-found", {result: req.session.randomDrink})
  });

  app.use((err, req, res, next) => {
    console.error("ERROR", req.method, req.path, err);
    // only render if the error ocurred before sending the response
    if (!res.headersSent) {
      res.status(500).render("error", {result: req.session.randomDrink});
    }
  });
};
