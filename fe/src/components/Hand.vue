<template>
	<div class="hand card">
		<header class="card-header">
			<p class="card-header-title">
				{{ email }}
			</p>
			<a href="#" class="card-header-icon" aria-label="more options">
				<span class="icon">
					<i class="fas fa-angle-down" aria-hidden="true"></i>
				</span>
			</a>
		</header>
		<div class="card-content droppable">
			<div class="content">
				<div>{{ cardCount }}</div>
			</div>
			<ul>
				<li v-for="card in cards" :key="card.uuid">
					<Card :id="card.uuid" :text="card.text"></Card>
				</li>
			</ul>
			
		</div>
		<footer class="card-footer" style="display: none; ">
			<a href="#" class="card-footer-item">Save</a>
			<a href="#" class="card-footer-item">Edit</a>
			<a href="#" class="card-footer-item">Delete</a>
		</footer>
	</div>
</template>

<script>
import Card from '@/components/Card'

export default {
  name: 'Hand',
	props: [ 'email', 'cardCount' ], 
  components: { Card },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
			cards: [],
    }
  },
  sockets:{
  },
	mounted() {
		const self = this;
		Event.$on('renderCards', ({player}) => {
			console.log(['e:renderCards', self.email, player])
			if (self.email === player.email) {
				self.cards = player.cards;
			}
		});

    $( ".droppable" ).droppable({
      drop: function( event, ui ) {
				let droppableSeat = $(this).closest(".column").attr("id");
				let fromEmail = $(ui.helper).closest(".column").find(".card-header-title").text().trim();
				let toEmail = $(this).closest(".column").find(".card-header-title").text().trim();
				let draggableSeat = $(ui.helper).closest(".column").attr("id")
				let cardId = $(ui.helper).attr("id");
				// console.log(['dropped', this, event, ui.helper, $(this).closest(".column").attr("id")])
				console.log(['dropped', droppableSeat, fromEmail, toEmail, draggableSeat, cardId]);

				if ( droppableSeat !== draggableSeat && toEmail.length > 0 ) {
					$( ".droppable" ).removeClass("ui-state-highlight");
					$( this ).addClass( "ui-state-highlight" );
					$(`#${cardId}`).remove();

					console.log(['self.$parent', self.$parent])
					self.$parent.$options.methods.passCard({cardId, fromEmail, toEmail});
				}
      }
    });
	
		// self.$parent.$options.methods.passCard({cardId, fromEmail, toEmail});
	
	
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

.card-content {
	height: 225px; 
}

.ui-state-highlight {
	background-color: yellow; 
}
</style>
