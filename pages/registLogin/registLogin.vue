<template>
	<view class="body">
		<form @submit="formSubmit">
			<view class="face-wapper">
				<image src="../../static/icos/default-face.png" class="face"></image>
			</view>
			
			<view class="info-wapper">
				<label class="words-lbl">账号</label>
				<input name="username" type="text" value="" class="input" placeholder="请输入用户名" placeholder-class="graywords"/>
			</view>
			
			<view class="info-wapper" style="margin-top: 40upx;">
				<label class="words-lbl">密码</label>
				<input name="password" type="text" value="" password="true" class="input" placeholder="请输入密码" placeholder-class="graywords"/>
			</view>
			
			<button type="primary" form-type="submit" style="margin-top: 60upx;width: 90%;">注册/登录</button>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			formSubmit(e) {
				var me = this;
				var username = e.detail.value.username;
				var password = e.detail.value.password;
				
				// 发起登陆注册请求
				var serverUrl = me.serverUrl
				uni.request({
					url: 'http://116.62.63.223:9000/interface/post/user',
					header:{
					  'content-type':'application/x-www-form-urlencoded'
					},
					data: {
                         "username":username,
						 "password":password
					},
					method: "POST",
					success: (res) => {
						console.log(res)
						// 获取真实数据之前，务必判断状态是否为200
						if (res.statusCode == 200) {
							var userInfo = res.data;
							// 保存用户信息到全局的缓存中
							uni.setStorageSync("globalUser", userInfo);
							// 切换页面跳转，使用tab切换的api
							uni.switchTab({
								url: "../me/me"
							});
						} else if (res.statusCode == 500) {
							uni.showToast({
								title: res.msg,
								duration: 2000,
								image: "../../static/icos/error.png"
							})
						}
					}
				});
			}
		}
	}
</script>

<style>
@import url("registLogin.css");
</style>
