const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

var users = [{
  name : 'john',
  kidneys : [{ healthy : false}, {healthy : true}]
}, {
  name : 'nike',
  kidneys : [{ healthy : true}, {healthy : true}]
}]

// console.log(users[0]);

function getData(user) {
  let obj = {
    'name' : user,
    'no. of kidneys' : 0,
    'no. of healthy kidneys' : 0,
    'no. of unhealthy kidneys' : 0
  };
  for(let i=0; i<users.length; i++) 
  {
    if(users[i].name == user)
    {
      obj['no. of kidneys'] = users[i].kidneys.length;
      users[i].kidneys.forEach(value => {
        if(value.healthy == true) obj['no. of healthy kidneys'] += 1; 
        else obj['no. of unhealthy kidneys'] += 1;
      });
      break;
    }
  }
  return obj;
}

function addData(user) {
  for(let i=0; i<users.length; i++) {
    if(user.name == users[i].name) {
      if(user.kidney == 'healthy') users[i].kidneys.push({'healthy' : true});
      else users[i].kidneys.push({'healthy' : false});
    }
  }
  return;
}

app.get('/', (req, res) =>{
  let user = req.query.user;
  res.send(getData(user));
})

app.post('/', (req, res) =>{
  let user = req.body;
  // console.log(user);
  addData(user);
  res.json({msg : 'done'});
})

app.put('/', (req, res) =>{
    for(let i=0; i<users[0].kidneys.length; i++){
      users[0].kidneys[i].healthy = true;
    }
    // console.log(getData('john'));
    res.json({msg : 'done'});
})


app.delete('/', (req, res) =>{
    let arr = [];
    let noOfHealthyKidneys = 0;
    for(let i=0; i<users[0].kidneys.length; i++) {
      if(users[0].kidneys[i].healthy) noOfHealthyKidneys++;
    }
    for(let i=0; i<noOfHealthyKidneys; i++) {
      arr.push({healthy : true});
    }
    users[0].kidneys = arr;
    res.json({msg : 'done'});
})

app.listen(port, ()=>{
  console.log(`listening on port ${port}`);
})