function GetResponse()
{
    fetch(`http://localhost:3000/todos` , {
        method : 'GET'
    }).then((value)=>
    {
        value.json().then((parsedRes) =>
            {  
                console.log(parsedRes)
            })
    })
}