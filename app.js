const express = require("express");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static("public"));

// MONGO CONNECTION
mongoose.connect('mongodb://localhost:27017/blogDB', {useNewUrlParser: true, useUnifiedTopology: true});

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
});

const Post = mongoose.model("Post", postSchema);

// const post = new Post({
//   title: "Testing post",
//   content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mattis enim ut tellus elementum sagittis vitae et leo duis. Tortor posuere ac ut consequat semper viverra nam libero justo."
// });
// post.save();




const homeStartingContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mattis enim ut tellus elementum sagittis vitae et leo duis. Tortor posuere ac ut consequat semper viverra nam libero justo. Quisque non tellus orci ac auctor. Nam libero justo laoreet sit amet cursus. Gravida arcu ac tortor dignissim convallis. Et ultrices neque ornare aenean euismod elementum. Egestas egestas fringilla phasellus faucibus scelerisque eleifend donec pretium. Pretium aenean pharetra magna ac placerat vestibulum lectus. Fames ac turpis egestas maecenas pharetra convallis posuere. Sodales neque sodales ut etiam sit amet nisl purus. Vestibulum mattis ullamcorper velit sed ullamcorper. Mi eget mauris pharetra et ultrices neque ornare aenean euismod. Amet nulla facilisi morbi tempus iaculis urna id volutpat lacus.";
const aboutContent = "Netus et malesuada fames ac turpis egestas integer eget. Blandit volutpat maecenas volutpat blandit. Id interdum velit laoreet id donec ultrices. Ullamcorper malesuada proin libero nunc consequat interdum varius. Et netus et malesuada fames ac turpis. Commodo nulla facilisi nullam vehicula ipsum a arcu. Facilisis sed odio morbi quis commodo odio aenean sed. Massa tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada. Id consectetur purus ut faucibus pulvinar elementum. Diam sollicitudin tempor id eu nisl nunc mi ipsum faucibus. Nunc mi ipsum faucibus vitae aliquet nec. Facilisis magna etiam tempor orci eu. Neque vitae tempus quam pellentesque nec. Porta lorem mollis aliquam ut porttitor. Bibendum arcu vitae elementum curabitur vitae nunc sed velit dignissim. Velit aliquet sagittis id consectetur purus. Sodales ut etiam sit amet nisl purus in mollis nunc. Dui vivamus arcu felis bibendum. Non nisi est sit amet. Vitae congue mauris rhoncus aenean vel elit.";
const contactContent = "In iaculis nunc sed augue lacus viverra vitae. Ut ornare lectus sit amet est placerat in egestas. Lacus sed turpis tincidunt id aliquet risus feugiat in. Netus et malesuada fames ac turpis egestas integer eget. Et sollicitudin ac orci phasellus egestas tellus rutrum. Risus at ultrices mi tempus. Nisi est sit amet facilisis magna etiam tempor orci. Sem fringilla ut morbi tincidunt augue interdum velit euismod. Porttitor lacus luctus accumsan tortor posuere ac ut. Ullamcorper malesuada proin libero nunc consequat. Et tortor at risus viverra adipiscing at in tellus integer. In iaculis nunc sed augue lacus viverra vitae congue eu. Commodo sed egestas egestas fringilla. In arcu cursus euismod quis viverra. Ullamcorper a lacus vestibulum sed arcu.";




// GET REQUESTS - FUNCTIONS
app.get("/", function(req, res) {
  Post.find({}, function(err, foundPosts) {
    if (err) {
      console.log(err);
    } else {
      res.render("home", {homeStartingContent: homeStartingContent, posts: foundPosts});
    }
  })
  
})

app.get("/about", function(req, res) {
  res.render("about", {aboutContent: aboutContent});
})

app.get("/contact", function(req, res) {
  res.render("contact", {contactContent: contactContent});
})

app.get("/compose", function(req, res) {
  res.render("compose");
})



app.get("/posts/:postId", function(req, res) {
  // console.log(req.params.postID);
  Post.findById(req.params.postId, function(err, foundPost){
    if (err) {
      console.log(err);
    } else {
      res.render("post", {title: foundPost.title, content: foundPost.content});
    }
  })
})


// POST FOR COMPOSE
app.post("/compose", function(req, res) {
  const newPost = new Post ({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  newPost.save(function(err) {
    if (!err) {
      res.redirect("/");
    }
  });
})


app.listen(3000, function() {
  console.log("Server started on port 3000");
});