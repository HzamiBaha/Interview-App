const jsonServer = require("json-server");
const auth = require("json-server-auth");
const cors = require("cors");
const path = require("path");
const express = require("express"); 

const app = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

const rules = auth.rewriter({
  users: 600,
  tasks: 660
});

app.db = router.db;

app.use(cors());
app.use(middlewares);

// ✅ Serve static files from ./public using express.static
app.use("/", express.static(path.join(__dirname, "public")));

app.use(rules);
app.use(auth);
app.use(router);

app.listen(3000, () => {
  console.log("✅ Backend running at http://localhost:3000");
});
