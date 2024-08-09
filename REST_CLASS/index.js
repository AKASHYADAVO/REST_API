const express = require("express");
const app = express();
const path = require("path");
const port = 8080;
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override')


app.use(methodOverride('_method'))



app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));



let posts = [
    {    id:uuidv4(),
        username: "AKASH YADAV",
        content: " THIS WEB-PAGE IS CREATED BY ME , USING EXPRESS ,EJS ,NODE , TO DEMONSTRATE HOW API WORKING AND I FOLLOW REST_API STRUCTURE,"

    },
    {    id:uuidv4(),
        username: "RAM",
        content: "working AT TCS"

    },
    {   id:uuidv4(),
        username: "MITUL",
        content: "got internship"

    }

];


app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id,username, content });
    res.redirect("/posts");

});

app.get("/posts/:id", (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    console.log(post);
    res.render("show.ejs",{post});
    

});

app.patch("/posts/:id",(req,res)=>{
    let {id} =req.params;
    let newcontent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content=newcontent;
    console.log(newcontent);
    console.log(id);
    console.log(post);
    res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res)=>{
    let {id} =req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs",{post});
});

app.delete("/posts/:id",(req,res)=>{
    let {id} =req.params;
     posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts")
});


app.listen(port, () => {
    console.log(`listening to port ${port}`);
});


