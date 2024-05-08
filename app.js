import express from "express";
import ViteExpress from "vite-express";
import bodyParser from "body-parser";

const app = express();
const port = 8888;
ViteExpress.config({ printViteDevServerHost: true });

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "." });
});

app.get("/api/data", (req, res) => {
  const userToken = req.headers.accessToken;
  // find the user in the DB
  // compare the user's DB accessToken to the token that was sent in this request
  // if they match, then the user is authorized
});

app.post("/order-cookies", (req, res) => {
  const qty = Number(req.body.qty);
  const cookieType = req.body.cookieType;
  if (Number.isNaN(qty) || qty < 1) {
    res.json({
      msg: "Invalid Order",
      total: 0,
    });
  } else {
    const unitPrice = qty > 6 ? 1.8 : 2.0;
    res.json({
      msg: `Your order of ${qty} ${cookieType} cookies is confirmed`,
      total: unitPrice * qty,
    });
  }
});

ViteExpress.listen(app, port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
