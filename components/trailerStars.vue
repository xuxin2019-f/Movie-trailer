<template name='trailerStars'>
	<view class="movie-score-wapper">
		<image v-for="(a, i) in yellowScore" :key="i" src="/static/icos/star-yellow.png" class="star-ico"></image>
		<image v-for="(gray, index) in grayScore" :key="index" src="/static/icos/star-gray.png" class="star-ico"></image>
		<view class="movie-score" v-if="showNum == 1">
			{{innerScore}}
		</view>
	</view>
</template>

<script>
	export default {
		name: 'trailerStars',
		data() {
			return {
				yellowScore :0,
				grayScore: 5
			};
		},
		props:{
			innerScore: 0,  // 定义外部传入的分数默认为0
			showNum: 0  // 是否需要显示具体分数，1为显示，0为不显示
		},
		// 组件创建完成后被调用
		created() {
			var tempScore = 0;
			if (this.innerScore != null && this.innerScore != undefined && this.innerScore != '') {
				tempScore = this.innerScore;
			}
			
			var yelloScore = parseInt(tempScore / 2);
			var grayScore = 5 - yelloScore;
			
			this.yellowScore = yelloScore;
			this.grayScore = grayScore;
			console.log(this.yellowScore)
		}
	}
</script>

<style>

.movie-score-wapper {
		display: flex;
		flex-direction: row;
	}
	.star-ico {
		width: 20rpx;
		height: 20rpx;
		margin-top: 6rpx;
	}
	.movie-score {
		font-size: 12px;
		color: grey;
		margin-left: 8upx;
	}

</style>
