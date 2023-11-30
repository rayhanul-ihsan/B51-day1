//import package
const express = require('express');
const path = require('path');
const app = express();
const port = 5000;

//postgreSQL dan Sequelize
const config = require('./src/config/config.json');
const { Sequelize, QueryTypes } = require('sequelize');
const sequelize = new Sequelize(config.development);

//config
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src/views'));

app.use('/assets', express.static('src/assets'));
app.use(express.urlencoded({ extended: false }));

//routing
app.get('/home', home);

app.get('/contact-me', contactMe);
app.post('/delete-project/:id', deleteProject);

app.get('/project', addProjectView);
app.post('/project', addProject);

app.get('/edit-project/:id', editProjectView);
app.post('/edit-project', editProject);

app.get('/project-detail/:id', projectDetail);
app.get('/testimonials', testimonial);

// const data = []; // This line is not being used

//callback
async function home(req, res) {
  try {
    const query = `SELECT * FROM public.projects`;
    const obj = await sequelize.query(query, { type: QueryTypes.SELECT });
    console.log('data dari database:', obj);
    res.render('index', { dataProject: obj });
  } catch (error) {
    console.log(error);
  }
}

function contactMe(req, res) {
  res.render('contact-me');
}

function addProjectView(req, res) {
  res.render('project');
}

function duration(startDate, endDate) {
  let start = new Date(startDate);
  let end = new Date(endDate);

  let difference = end - start;
  let day = difference / (1000 * 3600 * 24);
  let week = Math.floor(day / 7);
  let month = Math.floor(week / 4);
  let year = Math.floor(month / 12);
  var durasi = '';

  if (day > 0) {
    durasi = `${day} days`;
  }
  if (week > 0) {
    durasi = `${week} weeks`;
  }
  if (month > 0) {
    durasi = `${month} months`;
  }
  if (year > 0) {
    durasi = `${year} years`;
  }
  return durasi;
}
async function addProject(req, res) {
  try {
    var { project, content, startDate, endDate, nodejs, nextjs, reactjs, typescript } = req.body;

    let image = "pic1.jpg";
    var Durations = duration(startDate, endDate);

    if (nodejs === 'on') {
      nodejs = true;
    } else {
      nodejs = false;
    }
    if (nextjs === 'on') {
      nextjs = true;
    } else {
      nextjs = false;
    }
    if (reactjs === 'on') {
      reactjs = true;
    } else {
      reactjs = false;
    }
    if (typescript === 'on') {
      typescript = true;
    } else {
      typescript = false;
    }

    await sequelize.query(
      `INSERT INTO public.projects (name, start_date, end_date, duration, description, nodejs, nextjs, reactjs, typescript, image) 
            VALUES ('${project}', '${startDate}', '${endDate}', '${Durations}', '${content}', ${nodejs}, ${nextjs}, ${reactjs}, ${typescript}, '${image}')`
    );
    res.redirect('/home');
  } catch (error) {
    console.log(error);
    res.redirect('/project');
  }
}

async function editProjectView(req, res) {
  const { id } = req.params;

  const query = `SELECT * FROM public.projects WHERE id=${id}`;
  const obj = await sequelize.query(query, { type: QueryTypes.SELECT });
  res.render('edit-project', { data: obj[0] });
}
async function editProject(req, res) {
// const { id } = req.params;

  var { project, content, startDate, endDate, nodejs, nextjs, reactjs, typescript, id} = req.body;
  var Durations = duration(startDate, endDate);

  if (nodejs === "on") {
    nodejs = true;
  } else {
    nodejs = false;
  }
  if (nextjs === "on") {
    nextjs = true;
  } else {
    nextjs = false;
  }
  if (reactjs === "on") {
    reactjs = true;
  } else {
    reactjs = false;
  }
  if (typescript === "on") {
    typescript = true;
  } else {
    typescript = false;
  }
    const query = `UPDATE public.projects 
    SET name='${project}', start_date='${startDate}', end_date='${endDate}', duration='${Durations}', description='${content}', nodejs='${nodejs}', reactjs='${reactjs}', nextjs='${nextjs}', typescript='${typescript}'
    WHERE id=${id}`;
    const obj = await sequelize.query(query, { type: QueryTypes.UPDATE });
    console.log('berhasil di update', obj);
    res.redirect("/home");
}

    // try{
        // var { project, content, startDate, endDate, id } = req.body;
        // var Durations = duration(startDate, endDate);
    
        // var query = `UPDATE public.projects SET name='${project}', start_date='${startDate}', end_date='${endDate}', duration='${Durations}', description='${content}' WHERE id=${id}`;
        // var obj = await sequelize.query(query, { type: QueryTypes.UPDATE });
        
        // console.log('berhasil di update', obj);
       
        // res.redirect('/home');
    // } catch (error) {
    //     console.log(error);
    //     // res.redirect('/edit-project');
    // }

    // const { project, content, startDate, endDate, id } = req.body;
    // const Duration = duration(startDate, endDate);
  
    // const query = `UPDATE public.projects SET name='${project}', start_date='${startDate}', end_date='${endDate}', duration='${Duration}', description='${content}' WHERE id=${id}`;
    // const obj = await sequelize.query(query);

    // await sequelize.query(
    //     `UPDATE INTO public.projects SET '${project}', start_date='${startDate}', end_date='${endDate}', duration='${Durations}', description='${content}', nodejs=${nodejs}, nextjs=${nextjs}, reactjs=${reactjs}, typescript=${typescript} WHERE id=${id})`
    //     );
  
  
    // res.redirect('/home');
  


async function deleteProject(req, res) {
  const { id } = req.params;

  const query = `DELETE FROM public.projects WHERE id=${id}`;
  const obj = await sequelize.query(query, { type: QueryTypes.DELETE });

  console.log('berhasil', obj);

  res.redirect('/home');
}

async function projectDetail(req, res) {
  const { id } = req.params;
  const query = `SELECT * FROM public.projects WHERE id=${id}`;
  const obj = await sequelize.query(query, { type: QueryTypes.SELECT });

  console.log('data aman', obj);

  res.render('project-detail', { data: obj[0] });
}
function testimonial(req, res) {
  res.render('testimonials');
}
//setup localhost
app.listen(port, () => {
  console.log(`example app listening on port ${port}`);
});
