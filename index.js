
const express = require('express');
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true })); //what does this do in our app?
app.use(bodyParser.json({ extended: true }));

const users = require("./data/users");
const posts = require("./data/posts");

app.get('/', (req, res) => {
    res.send("Base home page")
});

//* To access users data 
app.get('/users', (req, res) => {
    res.json(users) // use .json to access your data
});

app
  .route("/users")
  .get((req, res) => {
    res.json(users)
  })
  .post((req, res) => { // very that info is not already taken
    if (req.body.name && req.body.username && req.body.email) {
      if (users.find((u) => u.username == req.body.username)) {
        res.json({ error: "Username Already Taken" });
        return;
      }

      const user = { // id will generate automatically
        id: users[users.length - 1].id + 1,
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        // How do we create/add a new property?! and how does that affect our posted objects?
      };

      users.push(user);
      res.json(users[users.length - 1]);
    } else res.json({ error: "Insufficient Data" });
  });

app.get('/posts', (req, res) => {
    res.json(posts)
});

//==========================

//TODO my nusers id were not showing, just blank page
// app.get('/users/:usersID', (req, res) => { //! leaving the mistake so I can compare it
//     const user = users.find((user) => user.id == req.params.userID) //* usersID
//     res.json(user)
// });

app.get('/users/:usersID', (req, res) => {
    //res.send(`User ID: ${req.params.usersID}`)
    const user = users.find((user)=> user.id == req.params.usersID)
    if(user) {res.json(user)}
    else {res.status(404).send("User not found")}
});

//* You can copy same layout/template and change the variable:
app.get('/posts/:postsID', (req, res) => {
    //res.send(`Posts ID: ${req.params.usersID}`)
    const post = posts.find((post)=> post.id == req.params.postsID)
    if(post) {res.json(post)}
    else {res.status(404).send("Post not found")}
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);    
});