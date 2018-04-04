<template>
	<div class="hand card">
		<header class="card-header">
			<p class="card-header-title">
				Component
			</p>
			<a href="#" class="card-header-icon" aria-label="more options">
				<span class="icon">
					<i class="fas fa-angle-down" aria-hidden="true"></i>
				</span>
			</a>
		</header>
		<div class="card-content">
			<div class="content">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
				<a href="#">@bulmaio</a>. <a href="#">#css</a> <a href="#">#responsive</a>
				<br>
				<time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
			</div>
		</div>
		<footer class="card-footer">
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
  components: { Card },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  sockets:{
  },
	mounted() {
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
