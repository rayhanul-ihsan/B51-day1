const express = require('express')
const path = require('path')
const app = express()
const port = 4000

//config 
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'src/views'))

app.use("/assets" ,express.static('src/assets'))
app.use(express.urlencoded({extended: false}))

app.get('/home', home)
app.get('/contact-me', contactMe)
app.get('/project', addProjectView)
app.post('/project', addProject)
app.get('/project/:id', projectDetail)
app.get('/testimonials', testimonial)

function home (req,res) {
    res.render('index')
}
function contactMe (req,res) {
    res.render('contact-me')
}
function addProjectView (req,res) {
    res.render('add-project')
}
function addProject (req,res) {
    const project = req.body.project
    const content = req.body.content
    const start = req.body.start
    const end = req.body.end
     
    console.log("Project :", project)
    console.log("Content :", content)
    console.log("Start Date :", start)
    console.log("End Date :", end)
    res.redirect('home')
}
function projectDetail (req,res) {
    const id =req.params.id
    const project = "mencari berkah"
    const content = "apa ajaa"

    const data ={
        id,
        project,
        content
    }
    res.render('project-detail', {data})
}
function testimonial (req,res) {
    res.render('testimonials')
}

app.listen(port, () =>{
    console.log(`example app listening on port ${port}`)
})