const { randomDrink } = require("../middlewares/custom-middleware");

module.exports = (app) => {
  app.use(randomDrink, (req, res, next) => {
    res.status(404).render("not-found", { result: req.session.randomDrink });
  });

  martini = {
    name: "Dry Martini",
    ingredients: [
      {
        name: "Gin",
        amount: 60,
        unit: "ml",
      },
      {
        name: "Dry Vermouth",
        amount: 10,
        unit: "ml",
      },
    ],
    garnish:
      "Squeeze oil from lemon peel onto the drink, or garnish with a green olives if requested.",
    method:
      "Pour all ingredients into mixing glass with ice cubes. Stir well. Strain into chilled martini cocktail glass.",
    source: "The Unforgettables",
    imageUrl:
      "https://iba-world.com/wp-content/uploads/2021/02/IBA-TU-11-Dry-Martini.jpg",
  };
  
  app.use((err, req, res, next) => {
    console.error("ERROR", req.method, req.path, err);
    // only render if the error ocurred before sending the response
    if (!res.headersSent) {
      res.status(500).render("error", { martini });
    }
  });
};
