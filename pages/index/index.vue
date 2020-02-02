<template>
	<view class="page">
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" class="carousel">
			<swiper-item v-for="carousel in carouselList">
					<image :src="carousel.image" class="carousel"></image>
			</swiper-item>
			<!-- <swiper-item>
				<image src="../../static/carousel/batmanvssuperman.png" class="carousel"></image>
			</swiper-item>
			<swiper-item>
				<image src="../../static/carousel/spiderman.png" class="carousel"></image>
			</swiper-item> -->
		</swiper>
		<!-- 热门超英 -->
		<view class="page-block super-hot">
			<view class="hot-title-wapper">
				<image src="../../static/icos/hot.png" class="hot-ico"></image>
				<view class="hot-title">
					热门超英
				</view>
			</view>
			<scroll-view scroll-x="true" class="page-block hot">
				<view class="single-poster" v-for="(superhero, i) in hotSuperheroList" :key="i">
				<view class="poster-wapper">
						 <image :src="superhero.cover" class="poster"></image>
					<view class="movie-name">
						{{superhero.name}}
					</view>
						<trailerStars :innerScore="superhero.score" showNum="1"></trailerStars>
						</view>
					</view>
			</scroll-view>
		</view>
	    <!-- 热门预告 -->
		<view class="page-block super-hot">
	    	<view class="hot-title-wapper">
	    		<image src="../../static/icos/interest.png" class="hot-ico"></image>
	    		<view class="hot-title">
	    			热门预告
	    		</view>
	    	</view>
		</view>
		<view class="hot-movies page-block">
			<video 
			   :id='trailer.id'
			   @play="meIsplaying(trailer.id)"
			   v-for = "trailer in hotTrailerList"
			   :src="trailer.trailer" 
			   :poster="trailer.poster"
			   class="hot-movie-single"
			   controls></video>
		</view>
	    <!-- 猜你喜欢 -->
		<view class="page-block super-hot">
			<view class="hot-title-wapper">
				<image src="../../static/icos/guess-u-like.png" class="hot-ico"></image>
				<view class="hot-title">
					猜你喜欢
				</view>
			</view>
		</view>
	    <view class="page-block guess-u-like">
				<view class="single-like-movie" v-for="(guess, gIndex) in guessULikeList">
					<image :src="guess.cover" class="like-movie"></image>
					<view class="movie-desc">
						<view class="movie-title">
							{{guess.name}}
						</view>
						<trailerStars :innerScore="9.1" showNum="0"></trailerStars>
						<view class="movie-info">
							{{guess.basicInfo}}
						</view>
						<view class="movie-info">
							{{guess.releaseDate}}
						</view>
					</view>
					<view class="movie-oper" :data-gIndex="gIndex" @click="praiseme">
						<image src="../../static/icos/praise.png" class="praise-ico"></image>
					     <view class="praise-me">
					     	点赞
					     </view>
						 <view :animation="animationDataArr[gIndex]" class="praise-me animation-opacity">
						 	+1
						 </view>
					</view>
				</view>
			<!-- 静态版 -->
	    <!-- 	<view class="single-like-movie">
	    		<image src="../../static/poster/justice.png" class="like-movie"></image>
				<view class="movie-desc">
					<view class="movie-title">
						蝙蝠侠大战超人
					</view>
					<trailerStars :innerScore="9.1" showNum="0"></trailerStars>
					<view class="movie-info">
						主演主演主演
					</view>
					<view class="movie-info">
						
					</view>
				</view>
				<view class="movie-oper" @click="praiseme">
					<image src="../../static/icos/praise.png" class="praise-ico"></image>
				     <view class="praise-me">
				     	点赞
				     </view>
					 <view :animation="animationData" class="praise-me animation-opacity">
					 	+1
					 </view>
				</view>
	    	</view> -->
	    </view>
	</view>
</template>

<script>
	// 导入自定义组件
	import trailerStars from '../../components/trailerStars.vue'
	export default {
		data() {
			return {
				carouselList: [],
				hotSuperheroList: [],
				hotTrailerList: [],
				animationData:{},
				guessULikeList: [],
				animationDataArr: [
					{}, {}, {}, {}, {}
				]
			}
		},
		onUnload() {
			// 页面卸载时，清除动画数据
			this.animationData = {},
			this.animationDataArr = [
				{}, {}, {}, {}, {}
			];
		},
		onPullDownRefresh() {
			this.refresh()
		},
		onHide() {
			if(this.videoContext) {
				this.videoContext.pause();
			}
		},
		onLoad() {
			// 在页面创建的时候，创建一个临时动画对象
			// #ifdef APP-PLUS||MP-WEIXIN
			this.animation = uni.createAnimation();
			// #endif
			uni.request({
              url: this.serverUrl + '/index/carousel/list?qq=38833964', 
			  method:'POST',
			  header:{
	            'content-type':'application/x-www-form-urlencoded'
	          },

    //           data:{
	   //           qq:'38833964'
				// },
              success: (res) => {
               // console.log(res.data);
                // 获取真实数据前，判断状态是否为200
				if (res.data.status === 200) {
					this.carouselList = res.data.data
				}
               }
            });
				// 查询热门超英
			uni.request({
				url: this.serverUrl + '/index/movie/hot?type=superhero&&qq=38833964',
				method: "POST",
				header:{
				  'content-type':'application/x-www-form-urlencoded'
				},
				// data:{
				// 	type:'superhero',
				//     qq:'38833964'
				// 				},
				success: (res) => {
					// console.log(res.data);
					// 获取真实数据之前，务必判断状态是否为200
					if (res.data.status == 200) {
						this.hotSuperheroList = res.data.data;
					}

				}
			});
			// 查询超英预告
			uni.request({
				url: this.serverUrl + '/index/movie/hot?type=trailer&&qq=38833964',
				method: "POST",
				header:{
				  'content-type':'application/x-www-form-urlencoded'
				},
				// data:{
				// 	type:'superhero',
				//     qq:'38833964'
				// 				},
				success: (res) => {
					// console.log(res.data);
					// 获取真实数据之前，务必判断状态是否为200
					if (res.data.status == 200) {
						this.hotTrailerList = res.data.data;
					}
			
				}
			});
			// 由于猜你喜欢会在下拉刷新时复用，所以不在onload中写，而是定义成一个方法
			this.refresh()
		},
		methods: {
			// 播放一个视频，暂停其他视频
			meIsplaying(id) {
				if(id) {
					this.videoContext = uni.createVideoContext(id);
				}
				var hotTrailerList = this.hotTrailerList;
				for(var i = 0; i<hotTrailerList.length; i++) {
					if(hotTrailerList[i].id != id ) {
						uni.createVideoContext(hotTrailerList[i].id).pause();
					}
				}
			},
			refresh() {
				uni.showLoading({
					mask: true
				});
				uni.showNavigationBarLoading();
				// 查询猜你喜欢数据列表
				uni.request({
					url: this.serverUrl + '/index/guessULike?qq=38833964',
					method: "POST",
					header:{
					  'content-type':'application/x-www-form-urlencoded'
					},
					// data:{
					// 	type:'superhero',
					//     qq:'38833964'
					// 				},
					success: (res) => {
						// console.log(res.data);
						// 获取真实数据之前，务必判断状态是否为200
						if (res.data.status == 200) {
							this.guessULikeList = res.data.data;
						}
				
					},
					complete: () => {
						uni.hideNavigationBarLoading();
						uni.hideLoading();
						uni.stopPullDownRefresh();
					}
				});
			},
           // 实现点赞动画效果
		   // #ifdef APP-PLUS||MP-WEIXIN
		   praiseme(e) {
			   // 通过dataset获得data数据，注意这里gindex要小写（只识别小写）
			   var gIndex = e.currentTarget.dataset.gindex;
			   console.log(gIndex)
			   // 构建动画数据，并且通过step表示这组动画的完成
			   this.animation.translateY(-60).opacity(1).step({
				   duration:500
			   });
			   // 导出动画数据到view组件，实现组件的动画效果
			   this.animationData = this.animation;
			   this.animationDataArr[gIndex] = this.animationData.export(); 
			   // 还原动画
			   setTimeout(function() {
				   this.animation.translateY(0).opacity(0).step({
					   duration:0
				   })
				   this.animationData = this.animation;
				   this.animationDataArr[gIndex] = this.animationData.export();
			   }.bind(this), 500);
		   }
		   // #endif
		},
		components:{
			trailerStars
		}
	}
</script>

<style>
	@import url("index.css");
</style>
