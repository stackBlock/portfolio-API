const express = require("express");
const router = express.Router();
const { checkJwt } = require("../controllers/auth");
const {
  getPortfolios,
  getPortfoliosById,
  createPortfolio,
} = require("../controllers/portfolios");

router.get("/", getPortfolios);

router.get("/:id", getPortfoliosById);

router.post("", checkJwt, createPortfolio);

module.exports = router;
