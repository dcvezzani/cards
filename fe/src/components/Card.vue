<template>
	<div :id="uuid" class="card draggable ui-widget-content">
		<p>{{ text }}</p>
	</div>
</template>

<script>
export default {
  name: 'Card',
	props: [ 'uuid', 'text' ], 
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  sockets:{
  },
	mounted() {
		$( function() {
			$( ".draggable" ).draggable();
		} );
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

.draggable { width: 50px; height: 50px; padding: 0.5em; border: 1px solid black; background-color: white; font-size: 8pt; z-index: 100; margin-bottom: 20px; }

</style>
