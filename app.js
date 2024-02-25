const express = require("express");
const mongoose = require("mongoose");
const dbConnect = require("./modol/db");
const data = require("./user/user");
const app = express();
const cors = require("cors");
const LoginModel = require("./user/Login");
const bcrypt = require("bcrypt");
app.use(express.json());
const comapnyschema = require("./user/Company");
const Data = require("./user/Data");
app.use(cors());
require("dotenv").config();
dbConnect();


const jwt = require("jsonwebtoken");
app.get("/", async (req, res) => {
  res.send("hi");
});

// app.get("/company", (req, res) => {
//   res.json([
//     { imges: "https://media.wisemarket.com.pk/brand/tecno-998062397.png" },
//     { imges: "https://media.wisemarket.com.pk/brand/vivo-726415989.png" },
//     { imges: "https://media.wisemarket.com.pk/brand/oneplus-715905569.png" },
//     { imges: "https://media.wisemarket.com.pk/brand/sony-485960290.png" },
//     { imges: "https://media.wisemarket.com.pk/brand/itel-294459200.png" },
//     { imges: "https://media.wisemarket.com.pk/brand/qmobile-923782323.png" },
//     { imges: "https://media.wisemarket.com.pk/brand/dell-597443241.png" },
//     { imges: "https://media.wisemarket.com.pk/brand/hp-12487988.png" },
//     { imges: "https://media.wisemarket.com.pk/brand/toshiba-63787965.png" },
//     { imges: "https://media.wisemarket.com.pk/brand/qcy-577557843.png" },
//     { imges: "https://media.wisemarket.com.pk/brand/mi-668952314.png" },
//     { imges: "https://media.wisemarket.com.pk/brand/baseus-103103752.png" },
//     { imges:  "https://media.wisemarket.com.pk/brand/baseus-103103752.png" },
//   ]);
// });

app.get("/getdata", async (req, resp) => {
  const data = await Data.find();

  resp.json(data);
});

app.get("/Moblies", async (req, resp) => {
  const data = await Data.find();

  resp.json(data);
});

app.post("/collection", async (req, resp) => {
  const { imgpath, priice, Discount, person, name, button, Dlevery } = req.body;

  const data = new Data({
    imgpath,
    priice,
    Discount,
    person,
    name,
    button,
    Dlevery,
  });

  await data.save();

  resp.json(data);
});

app.post("/company", async (req, res) => {
  const { imagpath } = req.body;
  const company = new comapnyschema({
    imagpath,
  });

  await company.save();

  res.json(company);
});

app.get("/company", async (req, resp) => {
  const schema = await comapnyschema.find();

  resp.json(schema);
});

app.post("/logindata", async (req, res) => {
  const { name, password, Email, Address } = req.body;
  try {
    if (!name || !password || !Email || !Address) {
      res.json({ message: "Invalid Fields" });
      alert("data base");
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const ok = new LoginModel({
      name,
      password: hashedPassword,
      Email,
      Address,
    });

    const RESULT = await ok.save();

    console.log("Data saved to the database:", RESULT);

    res.json(RESULT);
  } catch (error) {
    console.log(error);
  }
});

app.post("/sigup", async (req, res) => {
  const { name, password } = req.body;
  try {
    if (!name || !password) {
      res.json("invalid fields");
      return;
    }

    console.log(name, password);

    const user = await LoginModel.findOne({ name });

    if (user) {
      const checkPassword = await bcrypt.compare(password, user.password);
      if (checkPassword) {
        const token = jwt.sign({ user: user._id }, "tokenn", {
          expiresIn: "1d",
        });
        res.json(token);

        console.log(token);

        return;
      } else {
        res.status(404).json("user not found");
      }
    } else {
      res.status(404).json("user not found");
    }
  } catch (error) {
    console.log(error);
    res.json("error");
  }
});

app.get("/user/:token", async (req, res) => {
  try {
    const { token } = req.params;

    console.log(token);

    if (!token) {
      res.json({ message: "Access Fail" });
    }
    const decoded = jwt.verify(token, "tokenn");

    const { user } = decoded;

    console.log({ user });

    const userData = await LoginModel.findById(user);
    res.json(userData);

    console.log(userData);
  } catch (error) {
    res.json(error);
    console.log(error);
  }
});

app.post("/post", async (req, res) => {
  const { name, password, email, age } = req.body;

  if (!name || !password || !email || !age) {
    res.json({ message: "Invalid Fields" });
    return;
  }

  const api = new data({
    age,
    name,
    password,
    email,
  });
  const result = await api.save();
  res.json(result);
});

app.get("/getapi", async (req, res) => {
  const product = await data.find({});

  res.json(product);
});

app.delete("/deleteuser/:userId", async (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  const isUserDeleted = await data.findByIdAndDelete(userId);

  res.json(isUserDeleted);
});

app.patch("/putapi/:useris", async (req, res) => {
  const { name, password, email, age } = req.body;

  const { useris } = req.params;
  console.log(useris);
  const value = await data.findByIdAndUpdate(useris, {
    name,
    password,
    age,
    email,
  });
  res.json(value);
});

app.listen(5000, () => {
  console.log(`Example app listening on port`);
  console.log("conn");
});
