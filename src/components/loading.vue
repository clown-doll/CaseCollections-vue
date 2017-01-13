<style>
	.loader, .loader:before, .loader:after {
		width: 1em;
		height: 3em;
		background: #95e428;
		animation: load 1s infinite ease-in-out;
		/*执行用动画*/
		z-index: 99999;
	}

	.loader {
		position: absolute;
		top: 50%;
		left: 50%;
		margin: -2em 0 0 -0.5em;
		text-indent: -9999em;
		animation-delay: -0.16s;
	}
	.loader:before {
		content: "";
		position: absolute;
		top: 0;
		left: 1.5em;
		animation-delay: -0.32s;
	}
	.loader:after {
		content: "";
		position: absolute;
		top: 0;
		right: 1.5em;
	}

	.loading .overlay {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background-color: #fff;
		z-index: 9999;
	}

	@keyframes load {
		0%,
		80%,
		100% {
			box-shadow: 0 0 #95e428;
			height: 3em;
		}
		40% {
			box-shadow: 0 -2em #95e428;
			height: 4em;
		}
	}

</style>
<template>
	<div class="loading">
		<div class="overlay"></div>
		<div class="loader">
			loading ...
		</div>
	</div>
</template>