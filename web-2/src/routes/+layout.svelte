<script>
	import '../app.css';
	import { page } from '$app/stores';
</script>

<div class="app">
	<slot/>
	<nav class="container mx-auto my-5">
		<div class="flex flex-col md:flex-row p-6 gap-4">
			<strong>NAVIS Peerhof 2023</strong>
		</div>
	</nav>
	<pre>{JSON.stringify(page)}</pre>
</div>