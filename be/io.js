export function init(server, socketioPort) {
	let io  = require('socket.io')(server, { path: '/cards/socket.io'}).listen(socketioPort);
	// let io = require('socket.io').listen(8085);

	io.origins((origin, callback) => {
		// if (origin !== 'https://foo.example.com') {
		//   return callback('origin not allowed', false);
		// }
		console.log(['origins, cors', origin])
		callback(null, true);
	});

	io
	.on('connection', function(socket){
		console.log('a user connected');
		socket.emit('connect');

		socket.on('disconnect', function(){
			console.log('user disconnected');
		});
	});
}

