<template>
	<view class="page">
		<!-- 视频播放 -->
		<view class="player">
			<video 
			    id="myTrailer"
			   :src="trailerInfo.trailer"
			   :poster="trailerInfo.poster"
			   class="movie"
			   controls></video>
		</view>
		<!-- 影片基本信息 -->
		<view class="movie-info">
			<navigator :url="'../cover/cover?cover='+ trailerInfo.cover">
			<image :src="trailerInfo.cover" class="cover"></image>
			</navigator>
			<view class="movie-desc">
				<view class="title">{{trailerInfo.name}}</view>
				<view class="basic-info">{{trailerInfo.basicInfo}}</view>
				<view class="basic-info">{{trailerInfo.originalName}}</view>
				<view class="basic-info">{{trailerInfo.totalTime}}</view>
				<view class="basic-info">{{trailerInfo.releaseDate}}</view>
				
				<view class="score-block">
					<view class="big-score">
						<view class="score-words">综合评分：</view>
						<view class="movie-score">{{trailerInfo.score}}</view>
					</view>
					
					<view class="score-stars">
						<block v-if="trailerInfo.score >= 0">
							<trailerStars :innerScore="trailerInfo.score" showNum="0"></trailerStars>
						</block>
						
						<view class="prise-counts">
							{{trailerInfo.prisedCounts}}  人点赞
						</view>
					</view>
				</view>
			</view>
		</view>
	    	<view class="line-wapper">
			<view class="line"></view>
		</view>
		
		<!-- 剧情介绍 start -->
		<view class="plots-block">
			<view class="plots-title">剧情介绍</view>
			<view class="plots-desc">{{trailerInfo.plotDesc}}</view>
		</view>
		<!-- 剧情介绍 end -->
		
		<!-- 演职人员 -->
		<view class="scroll-block">
			<view class="plots-title">演职人员</view>
			<scroll-view scroll-x class="scroll-list">
				<view class="actor-wapper" v-for="director in directorArray" >
					<image 
					   :src="director.photo" 
					   class="single-actor"
					   mode="aspectFill"></image>
					<view class="actor-name">{{director.name}}</view>
					<view class="actor-role">{{director.actName}}</view>
				</view>
				<view class="actor-wapper" v-for="actor in actorArray" >
					<image   
					   :src="actor.photo" 
					   class="single-actor"
					   mode="aspectFill"></image>
					<view class="actor-name">{{actor.name}}</view>
					<view class="actor-role">{{actor.actName}}</view>
				</view>
			</scroll-view>
		</view>
		
		<!-- 剧照 -->
		<view class="scroll-block">
			<view class="plots-title">剧照</view>
			<scroll-view scroll-x class="scroll-list">
				<image 
				   v-for="(img, imgIndex) in plotPicsArray" 
				   :src="img" 
				   class="plot-image"
				   mode="aspectFill"
				   @click="lookme(imgIndex)"></image>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import trailerStars from '../../components/trailerStars.vue'
	export default {
		data() {
			return {
				trailerInfo: {},
				plotPicsArray: [],//剧照
				directorArray: [], //导演列表
				actorArray:[] //演员列表
			}
		},
		// 监听导航栏的按钮
		onNavigationBarButtonTap(e) {
			var index = e.index
			var me = this;
			var trailerInfo = me.trailerInfo;
			var trailerId = trailerInfo.id;
			var trailerName = trailerInfo.name;
			var cover = trailerInfo.cover;
			var poster = trailerInfo.poster;
			if (index == 0) {
				uni.share({
					provider: "weixin",
					scene: "WXSenceTimeline",
					type: 0,
					href: "http://www.imovietrailer.com/#/pages/movie/movie?trailerId=" + trailerId,
					title: "NEXT超英预告：《" + trailerName + "》",
					summary: "NEXT超英预告：《" + trailerName + "》",
					imageUrl: cover,
					success: function (res) {
						console.log("success:" + JSON.stringify(res));
					}
				});
			}
		},
		// 此函数仅仅只支持在小程序段的分享，分享到微信群或微信好友
		onShareAppMessage(res) {
			var me = this;
			return {
				title: 'me.trailerInfo.name',
				path:'pages/movie/movie?trailerId='+me.trailerInfo.id
			}
		},
		// 页面初次渲染完成，获得视频上下文对象
		onReady() {
			this.videoContext = uni.createVideoContext('myTrailer');
		},
		onHide() {
			// 页面被隐藏的时候，暂停播放
			this.videoContext.pause();
		},
		onShow() {
			// 页面被再次显示的时候，可以继续播放
			if (this.videoContext) {
				this.videoContext.play();
			}
		},
		onLoad(params) {
			// 通过api修改导航栏的属性
			uni.setNavigationBarColor({
				frontColor:'#ffffff',
				backgroundColor:'#000000'
			})
			var trailerId =  params.trailerId 
			// 获取预告片的详细信息
			uni.request({
				url: this.serverUrl + '/search/trailer/' + trailerId,
				method: "POST",
				header:{
				  'content-type':'application/x-www-form-urlencoded'
				},
				data:{
				    qq:'38833964'
								},
				success: (res) => {
					// 获取真实数据之前，务必判断状态是否为200
					if (res.data.status == 200) {
						var trailerInfo = res.data.data;
						this.trailerInfo = trailerInfo;
						// console.log(this.trailerInfo)
						var plotPicsArray = JSON.parse(trailerInfo.plotPics)
						this.plotPicsArray = plotPicsArray
						console.log(this.plotPicsArray)
					}
				}
			});
			// 获取导演
			uni.request({
				url: this.serverUrl + '/search/staff/' + trailerId + '/1',
				method: "POST",
				header:{
				  'content-type':'application/x-www-form-urlencoded'
				},
				data:{
				    qq:'38833964'
								},
				success: (res) => {
					// 获取真实数据之前，务必判断状态是否为200
					if (res.data.status == 200) {
						this.directorArray = res.data.data;
						// console.log(this.directorArray)
					}
				}
			});
			// 获取演员
			uni.request({
				url: this.serverUrl + '/search/staff/' + trailerId + '/2',
				method: "POST",
				header:{
				  'content-type':'application/x-www-form-urlencoded'
				},
				data:{
				    qq:'38833964'
								},
				success: (res) => {
					// 获取真实数据之前，务必判断状态是否为200
					if (res.data.status == 200) {
						this.actorArray = res.data.data;
					}
				}
			});
		},
		methods: {
			lookme(imgIndex) {
				uni.previewImage({
					current:this.plotPicsArray[imgIndex],
					urls:this.plotPicsArray
				})
			}
		},
		components: {
			trailerStars
		}
	}
</script>

<style>
@import url("movie.css");
</style>
