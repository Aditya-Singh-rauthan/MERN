const express = require("express");
const connectDB = require("./config/db");
const app = express();
const path = require("path");
const cors = require("cors");
connectDB();

// app.get("/", (req, res) => {
//   res.send("API Running");
// });

app.use(cors());
//Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

//serve static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 8000;


server=app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});


var io =require('socket.io')(server,{
  cors: {
    origin: "*",
  },
})


io.on('connection',(socket)=>{
  socket.on('newPost',()=>{
    io.emit('reload')
  })
  socket.on('postDeleted',()=>{
    io.emit('reload')
  })
})