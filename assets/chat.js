var url= "http://127.0.0.1:3000/";
var socket= io.connect(url);


function send(){
	socket.emit("chat",{
		message: document.getElementById('message').value,
		handle: document.getElementById('handle').value
	});
}

socket.on("chat", function(data){
	output.innerHTML+='<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

function typing(){
	console.log("I'm typing");
	socket.emit("typing", document.getElementById('handle').value);
}

socket.on("typing", function(data){
	console.log("someone typed");
	feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});

function stopped(){
	console.log("Not Really");
	socket.emit("not_typing");
}

socket.on("not_typing", function(data){
	console.log("someone stopped");
	setTimeout(function(){feedback.innerHTML = '';},2000);
});
