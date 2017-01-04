<style>
	.demo-list{  width:1200px; max-width:100%; margin:0 auto; padding-bottom:50px}
	.demo-list li{ height:auto;  background:#fafafa; border-bottom:2px solid #ddd; margin-top:25px; position:relative; border-radius: 5px; float:left; width:23%; margin: 10px 1%; padding:10px; -webkit-box-sizing:border-box; box-sizing:border-box}
	.demo-list li:hover{ box-shadow:0 0 5px rgba(0,0,0,0.3)}
	.demo-list li,.demo-list li a{ -webkit-transition:all 0.2s linear;transition:all 0.2s linear;}
	.demo-list li a:hover{ color:#3e9ef6; text-decoration:none}

	.demo-title{ height:44px; line-height:44px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;font-size: 14px;}
	.demo-image{ width:100%; text-align:center; overflow:hidden; position:relative;}
	.demo-image img{ display:block; width:100%}
	.demo-tool{ width:100%; height:30px; line-height:30px; text-align:right; padding:0 20px; -webkit-box-sizing:border-box;box-sizing:border-box;}
	.demo-tool a{/* background:url(../images/heart.png) no-repeat left center;*/ display:inline-block; padding-left:28px; font-size:14px}
	.demo-ti{ position:relative; width:auto; height:auto; overflow:hidden; cursor:pointer;}
	.demo-tag{ padding-left:40px; color:#999}
	.demo-tag dt{ width:40px; float:left; margin-left:-40px; font-weight:bold}
	.demo-tag dd span{ padding:0 2px}

	@media screen and (max-width:1002px){
		.demo-list li{ width:31%}
	}
	@media screen and (max-width:768px){
		.demo-list li{ width:47%}
	}
	@media screen and (max-width:460px){
		.demo-list li{ width:97%}
	}

</style>

<template>
	<ul class="demo-list clearfix">
		<li>
			<a href="sub.html" title="">
				<div class="demo-image"><img src="http://o7miho7g9.bkt.clouddn.com/o_1b2cvlsb11pu2ajp15e0aktpl9f.png" alt="" title=""></div>
				<div class="demo-title">网易考拉：我有洋气吗？不服来战！</div>
			</a>
			<dl class="demo-tag clearfix">
				<dt>标签：</dt>
				<dd>
					<span>活动宣传</span>
					<span>视频</span>
				</dd>
			</dl>
		</li>
	</ul>
</template>