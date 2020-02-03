<template>
	<view class="page page-fill">
		<view class="header">
			<view v-if="userisLogin">
				<image src="http://122.152.205.72:88/group1/M00/00/05/CpoxxFw_-5-AFyVyAABLIH8xBTw233.png" class="face"></image>
			</view>
			<view v-else>
				<image src="http://122.152.205.72:88/group1/M00/00/05/CpoxxFw_-5-AFyVyAABLIH8xBTw233.png" class="face"></image>
			</view>
			
			
			<view v-if="userisLogin" class="info-wapper">
				<view class="nickname">
					小许
				</view>
				<view class="nav-info">ID：{{userInfo.id}}</view>
			</view>
			<view v-else>
				<navigator url="../registLogin/registLogin">
					<view class="nickname regist-login">
						注册/登录
					</view>
				</navigator>
			</view>
			
			<view class="set-wapper" v-if="userisLogin">
					<image src="../../static/icos/settings.png" class="settings"></image>	
			</view>
	    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userisLogin: true,// 默认用户登陆
				userInfo: {}
			}
		},
		onShow() {
			// 判断是否登录
			var me = this;
			// 用户状态的切换
			var userInfo = uni.getStorageSync('globalUser')
			// 用户状态的切换
			var userInfo = uni.getStorageSync("globalUser");
			if (userInfo != null && userInfo != "" && userInfo != undefined) {
				me.userIsLogin = true;
				me.userInfo = userInfo;
			} else {
				me.userIsLogin = false;
				me.userInfo = {};
			}
		},
		methods: {
		}
	}
</script>

<style>
@import url("me.css");
</style>
