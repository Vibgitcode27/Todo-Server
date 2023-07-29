const express = require(`express`);
const app = express()
const fs = require(`fs`);

listener = () =>
{
    console.log(`server is running at port 3000`);
}

app.listen(3000 , listener)

app.use(express.json())

// todos = [];

getTodo = (req ,res) =>
{ 
    fs.readFile(`todo.json` , `utf-8` , (err , data) =>
    {
        if(err) throw err;
        let ans = JSON.parse(data)
        res.status(201).send(ans)
    })
}

app.get(`/todos` , getTodo)

getTodoID = (req ,res) =>
{
    fs.readFile(`todo.json` , `utf-8` , (err ,data) =>
    {
        if(err) throw err;
        const todos = JSON.parse(data)
        let todoid = todos.find(todoid => todoid.id == req.body.id)
        if(todoid == null)
        {
            res.status(404).send(`Cannot find todo`);
        }
        else
        {
            res.status(200).send(todoid);
        }
    })
}

app.get(`/todos/:id` , getTodoID)

postTodos = (req ,res) =>
{
    fs.readFile(`todo.json` , `utf-8`, (err ,data) =>
    {
        if(err) throw err;
        let posttodo = 
        {
            id : Math.floor(Math.random()*10000000) , 
            title : req.body.title,
            completed : req.body.completed,
            description: req.body.description 
        }
        const todos = JSON.parse(data)
        todos.push(posttodo);
        fs.writeFile(`todo.json` , JSON.stringify(todos) , (err) =>
        {
            if (err) throw err;
            res.status(201).send(posttodo)
        })
    })
}

app.post(`/todos` , postTodos)

putTodos = (req,res) =>
{
    fs.readFile(`todo.json` , `utf-8` , (err , data) =>
    {
        if(err) throw err;
        let todos = JSON.parse(data)
        const todoIndex = todos.findIndex(t => t.id === parseInt(req.body.id));
        if (todoIndex === -1) {
          res.status(404).send(`Cannot find todo with mentioned ID`);
        } else {
          let updatedTodo = {
            id : todos[todoIndex].id ,
            title : req.body.title,
            completed : req.body.completed,
            description: req.body.description
          }
          todos[todoIndex] = updatedTodo
        }
        fs.writeFile(`todo.json` , JSON.stringify(todos) , (err) =>
        {
            if(err) throw err 
            res.status(201).send(todos[todoIndex])
        })
    })
}

app.put(`/todos/:id` , putTodos)

deleteTodos = (req , res) =>
{
    fs.readFile(`todo.json` , `utf-8` , (err, data) =>
    {   
        if(err) throw err;
        const todos = JSON.parse(data)
        const todoIndex = todos.findIndex(t => t.id === parseInt(req.body.id));
      if (todoIndex == -1) {
        res.status(404).send("Cannot find mentioned ID");
      } else {
        todos.splice(todoIndex , 1)
        fs.writeFile(`todo.json` , JSON.stringify(todos) , (err) =>
        {
            if (err) throw err
              res.status(201).send("Deleted");
        })
    }
    })
}

app.delete(`/todos/:id` , deleteTodos)

app.use((req ,res, nest) =>
{
    res.status(404).send(`Incorrect Path`)
})