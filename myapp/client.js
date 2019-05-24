    var app = require('./app');
    var http = require('http');
    var server = http.createServer(app);
    server.listen('3000');


var request  = require('request');

//callback hell / pyramid of doom


request.get('http://localhost:3000/',function(err,req,res){
    if (err)  commonErrorHandler();
    console.log(res);
    request.get('http://localhost:3000/users', function(err,req,res){
        if (err)  commonErrorHandler();
        console.log(res);
        request.get('http://localhost:3000/tasks', function(err,req,res){
            if (err)  commonErrorHandler();
            console.log(res);
            request.get('http://localhost:3000/projects',function(err,req,res){
                if (err) commonErrorHandler();
                console.log(res);
                console.log('all apis called..callback hell..')
            })
        })
    })
})


function commonErrorHandler(){
    console.log('error');
    return;
}




function apiCall(api) {
    return new Promise(function(resolve,reject){
        request.get(api,function(err,req,res){
            if (err) reject(err);
            resolve(res);
        })
    })
}

apiCall('http://localhost:3000').then (
    (result) => {
        console.log(result);
        apiCall('http://localhost:3000/users'). then(
            (result) => {
                console.log(result);
                apiCall('http://localhost:3000/tasks').then(
                    (result) => {
                        console.log(result);
                        apiCall('http://localhost:3000/projects').then(
                            (result)=>{
                                console.log(result);
                            }
                        ).catch(
                            (error) => console.log(error)
                        )
                    }
                ).catch(
                    (error) => console.log(error)
                )
            }
        ).catch(
            (error) => console.log(error)
        )
    }
). catch (
    (error) => console.log(error)
)
