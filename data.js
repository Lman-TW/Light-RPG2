const fs = require('fs')

//帶入
function load (client) {
  client.Users = []
  client.Users_Class = []
  client.Users_Area = []
  client.Users_Unlock_Area = []
  client.User = ''
  client.Class = ''
  client.Area = ''
  fs.readFile('users.txt', function(err, data) {
     if(err) throw err;
  
     const arr = data.toString().replace(/\r\n/g,'\n').split('\n');

     for (const i of arr) {
       client.Users.push(i)
     }
  });

  fs.readFile('class.txt', function(err, data) {
     if(err) throw err;
  
     const arr = data.toString().replace(/\r\n/g,'\n').split('\n');

     for (const i of arr) {
       client.Users_Class.push(i)
     }
  });
  
  fs.readFile('area.txt', function(err, data) {
     if(err) throw err;
  
     const arr = data.toString().replace(/\r\n/g,'\n').split('\n');

     for (const i of arr) {
       client.Users_Area.push(i)
     }
  });

  fs.readFile('unlock_area.txt', function(err, data) {
     if(err) throw err;
  
     const arr = data.toString().replace(/\r\n/g,'\n').split('\n');

     for (const i of arr) {
       client.Users_Unlock_Area.push(i)
     }
  });
  console.log('L.load')
  console.log(client.Users)
  console.log(client.Users_Class)
}

//儲存
function save (client) {
  console.log(client.Users)
  console.log(client.Users_Class)
  fs.writeFile('users.txt', '', function(){})
  fs.writeFile('class.txt', '', function(){})
  fs.writeFile('area.txt', '', function(){})
  fs.writeFile('unlock_area.txt', '', function(){})

  for(let run =0; run < client.Users.length; run++) {
    fs.appendFile('users.txt', `${client.Users[run]}\n`, function (err) {})
  }

  for(let run =0; run < client.Users_Class.length; run++) {
    fs.appendFile('class.txt', `${client.Users_Class[run]}\n`, function (err) {})
  }

  for(let run =0; run < client.Users_Area.length; run++) {
    fs.appendFile('area.txt', `${client.Users_Area[run]}\n`, function (err) {})
  }

  for(let run =0; run < client.Users_Unlock_Area.length; run++) {
    fs.appendFile('unlock_area.txt', `${client.Users_Unlock_Area[run]}\n`, function (err) {})
  }
  console.log('L.save')
}

//取得用戶資料
function get_user_profile (client, user) {
  client.User = ''
  client.Class = ''
  client.Area = ''
  if (client.Users.includes(user.id)) {
    client.User = user.id
    client.Class = client.Users_Class.indexOf(user.id)
    client.Area = client.Users_Area.indexOf(user.id)
    return
  } else {
    client.User = 'none'
    client.Class = 'none'
    client.Area = 'none'
    return
  }
}

//登記玩家資料
function add (client, _User, _Class) {
  console.log(`user:${_User} class:${_Class}`)
  client.Users.push(_User)
  client.Users_Class.push(_Class)
  client.Users_Area.push('翠綠平原')
  return
}

module.exports = { load, save, add, get_user_profile }