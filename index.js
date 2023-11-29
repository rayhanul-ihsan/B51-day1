const express = require('express')
const path = require('path')
const app = express()
const port = 5000

//config 
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'src/views'))

app.use("/assets" ,express.static('src/assets'))
app.use(express.urlencoded({extended: false}))

app.get('/home', home)

app.get('/contact-me', contactMe)
app.post('/delete-project/:id', deleteProject)

app.get('/project', addProjectView)
app.post('/project', addProject)

app.get('/edit-project/:id', editProjectView)
app.post('/edit-project', editProject)

app.get('/project/:id', projectDetail)
app.get('/testimonials', testimonial)

const data = []

function home (req,res) {
    res.render('index', {dataProject : data})
}
function contactMe (req,res) {
    res.render('contact-me')
}
function addProjectView (req,res) {
    res.render('project')
}
function duration(startDate, endDate) {
    let start = new Date(startDate).getTime()
    let end = new Date(endDate).getTime()
  
    let difference = end - start
    let day = difference / (1000 * 3600 * 24)
    let week = Math.floor(day / 7)
    let month = Math.floor(week / 4)
    let year = Math.floor(month / 12)
    let durasi = ""
  
    if (day > 0) {
      durasi = `${day} days`
    }
    if (week > 0) {
      durasi = `${week} weeks`
    }
    if (month > 0) {
      durasi = `${month} months`
    }
    if (year > 0) {
      durasi = `${year} years`
    }
    return durasi
}
function addProject (req,res) {
    const { project, content, startDate, endDate, nodejs, nextjs, reactjs, typescript } = req.body 
    const Duration = duration(startDate, endDate) 

    console.log("Project :", project)
    console.log("Content :", content)
    console.log("Start Date :", startDate)
    console.log("End Date :", endDate)
    console.log("nodejs :", nodejs)
    console.log("nextjs :", nextjs)
    console.log("reactjs :", reactjs)
    console.log("typescript :", typescript)

    const dataProject = {
        project, 
        content, 
        Duration,
        startDate, 
        endDate, 
        nodejs, 
        nextjs, 
        reactjs, 
        typescript
    }

    data.unshift(dataProject)

    res.redirect('home')
}

function editProjectView (req,res) {
    // destructuring
    const{id} = req.params

    const dataFilter = data[parseInt(id)]
    dataFilter.id = parseInt(id)
    console.log("dataFilter:", {dataFilter})
    res.render('edit-project',{ data: dataFilter})
}
function editProject (req,res) {
    const { project, content, startDate, endDate, nodejs, nextjs, reactjs, typescript, id } = req.body;
    const Duration = duration(startDate, endDate)

    console.log("id :", id)
    console.log("Project :", project)
    console.log("Content :", content)
    console.log("Start Date :", startDate)
    console.log("End Date :", endDate)
    console.log("duration :", Duration)
    console.log("nodejs :", nodejs)
    console.log("nextjs :", nextjs)
    console.log("reactjs :", reactjs)
    console.log("typescript :", typescript)

    data[parseInt(id)] = {
        project,
        content,
        Duration,
        startDate,
        endDate,
        nodejs,
        nextjs,
        reactjs,
        typescript      
    }
    res.redirect('/home')
}

function deleteProject(req,res){
    const {id} = req.params

    data.splice(id, 1)
    res.redirect('/home')
}
function projectDetail (req,res) {
    const id =req.params.id
    const project = "mencari berkah"
    const content = "apa ajaa"
    const startDate = "01 nov 2023"
    const endDate = "01 des 2023"
    const Duration = duration(startDate, endDate)

    const data ={
        id,
        project,
        content,
        startDate,
        endDate,
        Duration
    }
    res.render('project-detail', {data})
}

function testimonial (req,res) {
    res.render('testimonials')
}

app.listen(port, () =>{
    console.log(`example app listening on port ${port}`)
})