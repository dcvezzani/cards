<template>
	<div class="card draggable ui-widget-content">
		<p>Drag me around</p>
	</div>
</template>

<script>
export default {
  name: 'Card',
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

.draggable { width: 150px; height: 150px; padding: 0.5em; border: 1px solid black; background-color: white; }

</style>
