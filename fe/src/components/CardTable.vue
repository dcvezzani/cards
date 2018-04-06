<template>
  <div class="card-table">
		<div class="container">
			<div>{{ player.email }}</div>
			<button @click="initCardTable()">initCardTable</button>
			<div class="columns">
				<div class="column"> </div>
				<div id="player-1" class="column">
					<Hand :email="player1.email" :cardCount="player1.cardCount"></Hand>
				</div>
				<div id="player-2" class="column">
					<Hand :email="player2.email" :cardCount="player2.cardCount"></Hand>
				</div>
				<div class="column"> </div>
			</div>
			<div class="columns">
				<div class="column"> </div>
				<div id="player-3" class="column">
					<Hand :email="player3.email" :cardCount="player3.cardCount"></Hand>
				</div>
				<div id="player-4" class="column">
					<Hand :email="player4.email" :cardCount="player4.cardCount"></Hand>
				</div>
				<div class="column"> </div>
			</div>
		</div>
  </div>
</template>

<script>
import Hand from '@/components/Hand'
import Card from '@/components/Card'
import _ from 'lodash'
import jwt from 'jsonwebtoken';

export default {
  name: 'CardTable',
  components: { Hand, Card }, 
  data () {
    return {
      msg: 'Welcome to Your Vue.js App', 
			player: {email: null, cards: []}, 
			player1: {email: null, cardCount: 0}, 
			player2: {email: null, cardCount: 0}, 
			player3: {email: null, cardCount: 0}, 
			player4: {email: null, cardCount: 0}, 
    }
  },
  sockets:{
    connect: function(){
      console.log('socket connected')
    },

		initCardTable: function() {
			// this.initCardTable(false);
			console.log(['initCardTable', {}]);
		}, 
		registerPlayer: function() {
			console.log(['registerPlayer', {}])
		}, 
		renderCardTable: function(data) {
			console.log(['renderCardTable', data])
			this.initCardTable(false);

			_.forIn(data.players, (player, email) => {
			console.log(['renderCardTable', data, player, email])
				const playerSeat = player.seat.replace(/-/, '');
				this[playerSeat].email = email;
				this[playerSeat].cardCount = player.cards.length;
			})
			Socket.emit('renderCards', {email: this.player.email})
		}, 
		renderCards: function(data) {
			console.log(['renderCards', data])
			this.player.cards = data.cards;
			this.$nextTick(() => {
				console.log(['x:renderCards', this.player])
				Event.$emit('renderCards', {player: this.player});
			});
		}, 
		passCard: function() {
			console.log(['passCard', {}])
		}, 
		error: function(data) {
			console.log(['error', data])
		}, 
		notify: function(data) {
			console.log(['notify', data])
		}, 
  },
	methods: {
		initCardTable: function(remote=true) {
			console.log(['initCardTable', remote])
			if (remote === true) {
				Socket.emit('initCardTable', this.player.email);

			} else {
				this.player.cards = [];
				this.player1 = {email: null, cardCount: 0};
				this.player2 = {email: null, cardCount: 0};
				this.player3 = {email: null, cardCount: 0};
				this.player4 = {email: null, cardCount: 0};
			}
		}, 
		registerPlayer: function(email) {
			Socket.emit('registerPlayer', email);
		}, 
		passCard: function({cardId, fromEmail, toEmail}) {
			Socket.emit('passCard', {cardId, fromEmail, toEmail});
		}, 
	}, 
	mounted() {
    window.Socket = this.$socket;
	
		$( function() {
			$( ".draggable" ).draggable();
		} );

		let md = document.location.search.match(/token=([^\&]+)/);
		if (!_.isNil(md)) {
			var decoded = jwt.decode(md[1]);
			console.log(['token', decoded.email]);
			this.player.email = decoded.email;
			this.registerPlayer(this.player.email);
		}
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
