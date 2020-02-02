<template>
	<view class="page">
		<view class="search-block">
			<view class="search-ico-wapper">
				<image src="../../static/icos/search.png" class="search-ico"></image>
			</view>
			<input 
			   type="text" 
			   placeholder="搜索预告" 
			   maxlength="10" 
			   class="search-text"
			   confirm-type="search"
			   @confirm="searchMe"
			>
		</view>
		<view class="movie-list page-block">
			<view class="movie-wapper" v-for="trailer in trailerList">
			<image 
			   :src="trailer.cover" 
			   :data-trailerId="trailer.id" 
			   @click="showTrailer"
			   class="poster"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				trailerList:[],
				keywords: '',
				page:1,
				totalPages:1
			}
		},
		onReachBottom() {
			var page = this.page + 1; // 查询下一页面
			var keywords = this.keywords;
			var totalPages = this.totalPages;
			
			// 如果当前需要分页的分页数和总页数相等，则不分页
			if(page>totalPages) {
				return;
			}
			this.pagedTrailerList(keywords,page,15)
		},
		onLoad() {
			uni.showLoading({
				mask:true,
				title:'请稍后'
			});
			uni.showNavigationBarLoading();
			// 查询电影列表
			uni.request({
				url: this.serverUrl + '/search/list?keywords=&qq=38833964&&page=&pageSize=',
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
						this.trailerList = res.data.data.rows;
					}
			
				},
				complete: () => {
					uni.hideNavigationBarLoading();
					uni.hideLoading();
				}
			});
		},
		methods: {
			// 分页功能
			pagedTrailerList(keywords,page,pageSize) {
				uni.showLoading({
					mask:true,
					title:'请稍后'
				});
				uni.showNavigationBarLoading();
				// 查询电影列表
				uni.request({
					url: this.serverUrl + '/search/list?keywords='+keywords
					+'&qq=38833964&&page='+page
					+'&pageSize=' + pageSize,
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
							var tempList = res.data.data.rows;
							this.trailerList = this.trailerList.concat(tempList)
							this.totalPages = res.data.data.total;
							this.page = page;
						}
				
					},
					complete: () => {
						uni.hideNavigationBarLoading();
						uni.hideLoading();
					}
				});
			},
			searchMe(e) {
				var me = this;
				var value = e.detail.value;
				me.keywords = value;
				me.trailerList = [];
				
				this.pagedTrailerList(value, 1, 15);
			},
			showTrailer(e) {
				var trailerId = e.currentTarget.dataset.trailerid;
				uni.navigateTo({
					url:'../movie/movie?trailerId='+trailerId
				})
			}
		}
		
	}
</script>

<style>
@import url('search.css') 
</style>
