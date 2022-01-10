const express = require('express');
const app = express();
const port = 5000;

const users = { 
   users_list :
   [
      { 
         id : 'xyz789',
         name : 'Charlie',
         job: 'Janitor',
      },
      {
         id : 'abc123', 
         name: 'Mac',
         job: 'Bouncer',
      },
      {
         id : 'ppp222', 
         name: 'Mac',
         job: 'Professor',
      }, 
      {
         id: 'yat999', 
         name: 'Dee',
         job: 'Aspring actress',
      },
      {
         id: 'zap555', 
         name: 'Dennis',
         job: 'Bartender',
      }
   ]
}

app.use(express.json());

app.get('/', (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.get('/users', (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  console.log(`${name} ${job}`);
  if(name != undefined && job != undefined) {
    let result = findUserByNameAndJob(name, job);
    result = {users_list: result};
    res.send(result);
  }
  else if(name != undefined) {
    let result = findUserByName(name);
    result = {users_list: result};
    res.send(result);
  }
  else if(job != undefined) {
    let result = findUserByJob(job);
    result = {users_list: result};
    res.send(result);
  }
  else {
    res.send(users);
  }
});


const findUserByName = (name) => {
  return users['users_list'].filter( (user) => user['name'] == name);
}

const findUserByJob = (job) => {
  return users['users_list'].filter( (user) => user['job'] == job);
}

const findUserByNameAndJob = (name, job) => {
  return users['users_list'].filter( (user) => user['name'] == name && user['job'] == job);
}


app.get('/users/:id', (req, res) => {
  const id = req.params.id;
  let result = findUserById(id);
  if(result != undefined && result.length != 0) {
    result = {users_list: result};
    res.send(result);
  }
  else {
    res.status(404).send('Resource not found.');
  }
});

const findUserById = (id) => {
  return users['users_list'].filter( (user) => user['id'] == id);
}

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.status(200).end();
});

function addUser(user) {
    users['users_list'].push(user);
}

app.delete('/users/:id', (req, res) => {
  const id = req.params.id;
  let result = findUserById(id);
  if(result != undefined && result.length != 0) {
    deleteUser(id);
    res.status(200).end();
  }
  else {
    res.status(404).send('Resource not found.');
  }
});

function deleteUser(id) {
  console.log(users['users_list']);
  users['users_list'] = users['users_list'].filter( (user) => user['id'] != id);
  console.log(users['users_list']);
}
