const mongoose = require("mongoose");
const Portfolio = mongoose.model("Portfolio");

exports.getPortfolios = async (req, res) => {
  const portfolios = await Portfolio.find({});
  return res.json(portfolios);
};

exports.getPortfoliosById = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    return res.json(portfolio);
  } catch (error) {
    return res.json({ message: "No file available..." });
  }
};

exports.createPortfolio = async (req, res) => {
  const portfolioData = req.body;
  // ToDo: extract from req
  const userId = "google-oauth2|117001720419944847142";
  const portfolio = new Portfolio(portfolioData);
  portfolio.userId = userId;

  try {
    const newPortfolio = await portfolio.save();
    return res.json(newPortfolio);
  } catch (e) {
    return res.status(422).send(error.message);
  }
};
