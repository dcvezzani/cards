import _ from 'lodash'
import uuidv4 from 'uuid/v4'

export function init(server, socketioPort) {
	let io  = require('socket.io')(server, { path: '/cards/socket.io'}).listen(socketioPort);
	// let io = require('socket.io').listen(8085);

	io.origins((origin, callback) => {
		// if (origin !== 'https://foo.example.com') {
		//   return callback('origin not allowed', false);
		// }
		// console.log(['origins, cors', origin])
		callback(null, true);
	});

	// {'dave@greenseedtech.com': {
	// 		seat: 'player-1', 
	// 		cards: [], 
	// 	}
	// }

	let players = {};
	// {"asdf@asdf.com": {seat: 'player-3', cards: [
	// 	{uuid: 'aaa', name: 'asdf'}, 
	// 	{uuid: 'bbb', name: 'qwer'}, 
	// 	{uuid: 'ccc', name: 'zxcv'}, 
	// ]}}

	let disconnectTimeout = {};

	io.on('connection', function(socket){
		console.log('a user connected');
		socket.emit('connect');

		socket.on('initCardTable', function(email=null){
			 console.log(['initCardTable', email]); 
			// players = {};
			_.forIn(players, (player, email) => {
				player.cards = [];

				players[email].cards = _.map([1,2,3,4,5], idx => {
					let uuid = uuidv4();
					return ({uuid, text: uuid.slice(0, 4)});
				});
				
				// registerUser(socket, email);
			})
			
			io.emit('renderCardTable', {players});
			io.emit('initCardTable');
		});

		socket.on('renderCardTable', function(){
			io.emit('renderCardTable', {players});
		});

		socket.on('registerPlayer', function(email){
			registerUser(socket, email);
		});

		socket.on('renderCards', function({email}){
			console.log(['renderCards', players, email, players[email]])
			renderCards(socket, email);
		});

		socket.on('passCard', function({cardId, fromEmail, toEmail}){
			initPlayer(fromEmail);
			initPlayer(toEmail);

			const cards = _.remove(players[fromEmail].cards, (card) => {
				return (card.uuid === cardId);
			})
			// console.log(['passCard', cardId, fromEmail, toEmail, cards, players])
			
			cards.forEach(card => players[toEmail].cards.push(card))
			io.emit('passCard');
			io.emit('renderCardTable', {players});
		});

		socket.on('disconnect', function(chk){
			disconnectTimeout[socket.email] = setTimeout(() => {
				delete players[socket.email];
				delete disconnectTimeout[socket.email];
				io.emit('renderCardTable', {players});
				io.emit('notify', `${socket.email} has left`);
				console.log(['user disconnected', socket.email]);
			}, 3000);
		});
	});

	function initPlayer(email) {
		if (_.isNil(players[email])) {
			players[email] = {seat: null, cards: []};
			return true;
		} else {
			return false
		}
	}

	function renderCards(socket, email) {
		console.log(['renderCards', players, email]);
		if (!_.isNil(email) && !_.isNil(players[email])) {
			socket.emit('renderCards', {cards: players[email].cards});
		}
	}

	function registerUser(socket, email, callback) {
			socket.email = email;

				console.log(['trace 0.1']);
			if (!_.isNil(disconnectTimeout[socket.email])) {
				console.log(['trace 0.2']);
				clearTimeout(disconnectTimeout[socket.email]);

				io.emit('registerPlayer');
				io.emit('renderCardTable', {players});
				// renderCards(socket, email);
				io.emit('notify', `${socket.email} has joined`);
				return;
			}

				console.log(['trace 0.3']);
			const size = Object.keys(players).length;
			if (size < 4) {
				console.log(['trace 0.4']);
				if (initPlayer(email)) {
				console.log(['trace 0.5']);
					let seats = []; //_.mapKeys(players, (player, email) => { player.seat })
					_.forIn(players, (player, email) => seats.push(player.seat))
					let availableSeats = _.filter(_.range(4), idx => !_.includes(seats, `player-${idx+1}`))
					availableSeats.sort()
					
					// console.log(['assignedSeat', players, seats, availableSeats, `player-${availableSeats[0]+1}`]);
					players[email].seat = `player-${availableSeats[0]+1}`
				}

				let emails = [];
				console.log(['trace 1', email])
				if ( !_.isNil(players[email].cards) && players[email].cards.length === 0 ) {
				console.log(['trace 2'])
					players[email].cards = _.map([1,2,3,4,5], idx => {
						let uuid = uuidv4();
						return ({uuid, text: uuid.slice(0, 4)});
					});
				}
				console.log(['trace 3', players])

				io.emit('registerPlayer');
				io.emit('renderCardTable', {players});
				// renderCards(socket, email);
				
				io.emit('notify', `${socket.email} has joined`);

			} else {
				const error = "Sorry! There are no more seats available at this card table";
				socket.emit('error', {error});
			}

			if (!_.isNil(callback)) {
				callback();
			}
	}
}

