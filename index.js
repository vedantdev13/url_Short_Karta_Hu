const express = require("express");
const path = require("path");
const { connectToMongoDB } = require("./connect");


const URL = require("./models/url");

const urlRoutes = require("./routes/url");
const staticRouter = require("./routes/staticRouter");

const userRoutes = require("./routes/user");

const app = express();
const port = process.env.PORT || 8001;

connectToMongoDB(process.env.MONGO_URL)
.then(() => console.log("Connected MongoDB"))
.catch((err) => console.log("MongoDB connection error:", err));

app.set("view engine", "ejs");  // view engin
app.set("views", path.resolve("./views"));   // views folder

app.use(express.json());
app.use(express.urlencoded({ extended: false })); // this is for form data

app.use("/url",urlRoutes);
app.use("/user",userRoutes);
app.use("/",staticRouter);

// will make router 




// ab short id generate hone k bad ye run krna h 
//isme 2 cheez karni h (1 - pehele DB se fetch krnan ansd 2 - user ko redirect ) 
app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId; // ✅ 

  const entry = await URL.findOneAndUpdate(
    { shortId }, // ✅  
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    },
    { new: true }
  );

  if (!entry) {
    return res.status(404).send("Short URL does not exist");
  }

  res.redirect(entry.redirectURL);
});


app.listen(port, () => {    
  console.log(`Server started on http://localhost:${port}`);
});

