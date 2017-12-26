var express= require("express");
var socket= require("socket.io");

var app= express();

app.use(express.static("assets/"));

var server= app.listen(3000, function(){
	console.log("listening to port 3000");
}); 

var io= socket(server);
io.on("connection",function(socket){
	console.log("made socket connection", socket.id);
	socket.on("chat",function(data){
		io.sockets.emit("chat",data);
	});
	socket.on("typing",function(data){
		console.log("it's about typing");
		socket.broadcast.emit("typing",data);
	});
	socket.on("not_typing",function(data){
		socket.broadcast.emit("not_typing",data);
	});
});