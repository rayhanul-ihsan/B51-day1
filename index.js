//import package
const express = require('express');
const path = require('path');
const app = express();
const port = 5000;
const bcrypt = require('bcrypt');
const session = require('express-session');
const flash = require('express-flash');

//import file
const upload = require('./src/middlewares/uploadFile');

//postgreSQL dan Sequelize
const config = require('./src/config/config.json');
const { Sequelize, QueryTypes } = require('sequelize');
const sequelize = new Sequelize(config.development);

//config
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src/views'));

app.use('/assets', express.static('src/assets'));
app.use('/uploads', express.static('src/uploads'));

app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
  name:'data_login',
  secret: 'sangat rahasia', //generate secret key
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: false,
    maxAge: 1000 * 60  * 60 * 24
  }
}));


//routing
app.get('/home', home);

app.get('/contact-me', contactMe);
app.post('/delete-project/:id', deleteProject);

app.get('/project', addProjectView);
app.post('/project', upload.single("image"), addProject);

app.get('/edit-project/:id', editProjectView);
app.post('/edit-project',editProject);

app.get('/project-detail/:id', projectDetail);
app.get('/testimonials', testimonial);

app.get('/register', registerProject);
app.post('/register', registerr);

app.get('/login', loginProject);
app.post('/login', login);

app.get('/logout', logout);

// const data = []; // This line is not being used

//callback
async function home(req, res) {
  try {
    const query = `SELECT projects.id, projects.name, start_date, end_date, duration, projects.description, nodejs, nextjs, reactjs, typescript, image,
    users.name AS author FROM projects LEFT JOIN users ON 
    projects."authorId"=users.id;`;
    const obj = await sequelize.query(query, { type: QueryTypes.SELECT });
    console.log('data dari database:', obj);

    const isLogin = req.session.isLogin;
    const users = req.session.users;

    res.render('index', { dataProject: obj, users, isLogin });

  } catch (error) {
    console.log(error);
  }
}
function registerProject(req,res) {
  res.render('register');
}
async function registerr(req,res) {
  const {name, email, password} = req.body;
  
  console.log("name:", name);
  console.log("email:", email);
  console.log("password:", password);

  const salt = 10;
  // let hashPassword = "";

  bcrypt.hash(password, salt, async (err, hash) => {
    if (err) {
      console.error("password failed!!");
      req.flash('danger', 'register failed : password failed!!');
      return req.redirect('/register');
    }

    console.log("hasil hash:", hash);

    // const query = `INSERT INTO users(name, email, password) VALUES ('${name}', '${email}', '${hash}')`;
    await sequelize.query(`INSERT INTO users(name, email, password) VALUES ('${name}', '${email}', '${hash}')`);
    req.flash('success', 'register success!!');
    res.redirect('/home');   
  });
   
}
function loginProject(req,res) {
  res.render('login');
}
async function login(req,res) {
  const {email, password} = req.body;
  const query = `SELECT * FROM users WHERE email='${email}'`;
  const obj = await sequelize.query(query, {type: QueryTypes.SELECT});
  console.log(obj);

  if (!obj.length) {
    console.error("user not registered!");
    req.flash('danger', 'Login failed : Email is Wrong!!');
    return res.redirect('/login');
  }

  bcrypt.compare(password, obj[0].password, (err, result) => {
    if (err) {
      req.flash('danger', 'Login failed : Password is Wrong!!');
      return console.error("login: Internal Server Error!!");
    }
    if (!result) {
      console.error("password is wrong!");
      req.flash('danger', 'Login failed!!');
      return res.redirect('/login');
    }
    console.log('login success');
    req.flash('success', 'Login success!!');
    req.session.isLogin = true;  //pernyataan kalau login berhasil
    req.session.users = {
      id: obj[0].id,
      name: obj[0].name,
      email:obj[0].email
    }
    res.redirect('/home');
  }); 
  
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

    
    var Durations = duration(startDate, endDate);
    const image = req.file.filename;
    const authorId = req.session.users.id;

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
      `INSERT INTO public.projects (name, start_date, end_date, duration, description, nodejs, nextjs, reactjs, typescript, image, "authorId") 
            VALUES ('${project}', '${startDate}', '${endDate}', '${Durations}', '${content}', ${nodejs}, ${nextjs}, ${reactjs}, ${typescript}, '${image}', '${authorId}');`
    );
    // const isLogin = req.session.isLogin;
    // const users = req.session.users;
    res.redirect('/home');
  } catch (error) {
    console.log(error);
    res.redirect('/project');
  }
}

async function editProjectView(req, res) {
  if (!req.session.isLogin) {
    return res.redirect('/login')
  }
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
async function deleteProject(req, res) {
  if (!req.session.isLogin) {
    return res.redirect('/login')
  }
  const { id } = req.params;

  const query = `DELETE FROM public.projects WHERE id=${id}`;
  const obj = await sequelize.query(query, { type: QueryTypes.DELETE });

  console.log('berhasil', obj);

  res.redirect('/home');
}

async function projectDetail(req, res) {
  const { id } = req.params;

  const query = `SELECT projects.id, projects.name, start_date, end_date, duration, projects.description, nodejs, nextjs, reactjs, typescript, image,
  users.name AS author FROM projects LEFT JOIN users ON 
  projects."authorId"=users.id WHERE projects.id=${id}`;
  const obj = await sequelize.query(query, { type: QueryTypes.SELECT });

  console.log('data aman', obj);

  res.render('project-detail', { data: obj[0] });
}
function testimonial(req, res) {
  res.render('testimonials');
}
function logout(req, res) {
  req.session.isLogin = false;
  req.session.users = {};
  req.flash('success', 'Logout success!!');
  res.redirect('/login');
}
//setup localhost
app.listen(port, () => {
  console.log(`example app listening on port ${port}`);
});
