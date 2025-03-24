<template>
	<view class="login-container">
		<view class="login-form">
			<uni-card>
				<uni-forms ref="form" :modelValue="form" :rules="rules">
					<uni-forms-item label="用户名" name="username">
						<input type="text" v-model="form.username" placeholder="请输入用户名" />
					</uni-forms-item>
					<uni-forms-item label="密码" name="password">
						<input type="text" password v-model="form.password" placeholder="请输入密码" />
					</uni-forms-item>
					<uni-forms-item>
						<button type="primary" plain="true" @click="handleLogin">登录</button>
					</uni-forms-item>
				</uni-forms>
			</uni-card>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					username: '',
					password: ''
				},
				rules: {
					// 对name字段进行必填验证
					username: {
						rules: [{
							required: true,
							errorMessage: '请输入姓名',
						}, ]
					},
					// 对email字段进行必填验证
					password: {
						rules: [{
							required: true,
							errorMessage: '请输入密码',
						}, ]
					}
				}
			};
		},
		methods: {
			handleLogin() {
				this.$refs.form.validate().then(async res => {
					// 调用微信登录接口
					uni.login({
						provider: 'weixin',
						success: (res) => {
							if (res.code) {
								// 获取到 code，发送到后端换取 openid
								this.getOpenid(res.code);
								console.log(res);
							} else {
								uni.showToast({
									title: '登录失败，请重试',
									icon: 'none'
								});
							}
						},
						fail: (err) => {
							uni.showToast({
								title: '登录失败，请重试',
								icon: 'none'
							});
							console.error('登录失败:', err);
						}
					});
				}).catch(err => {
					console.log('表单错误信息：', err);
				})
			},

			// 发送 code 到换取 openid
			getOpenid(code) {
				const appid = 'wx9ba342227b5c787d';
				const secret = '6770ccdf39aba067b97cd994935c6040';
				uni.request({
					url: `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`,
					method: 'GET',
					success: (res) => {
						if (res.data.openid) {
							// 获取到 openid，可以存储到本地或全局状态管理
							uni.setStorageSync('openid', res.data.openid);
							// 登录接口，传递openid添加至数据库
							this.loginUp(res.data.openid)
						} else {
							uni.showToast({
								title: '获取 openid 失败',
								icon: 'none'
							});
						}
					},
					fail: (err) => {
						uni.showToast({
							title: '获取 openid 失败',
							icon: 'none'
						});
						console.error('获取 openid 失败:', err);
					}
				});
			},
			//登录接口
			loginUp(openid){
				uni.request({
					url: `http://localhost:3000/user/login`,
					method: 'POST',
					data:{
						openid,
						username:this.form.username,
						password:this.form.password,
					},
					success: (res) => {
						uni.setStorageSync('token', res.data.token);
						uni.setStorageSync('User', res.data.payload);
							uni.showToast({
								title: '登录成功',
								icon: 'success'
							});
							// 跳转到首页或其他页面
							uni.navigateTo({
								url: '/pages/index/index'
							});
					},
					fail: (err) => {
						uni.showToast({
							title: '登录失败',
							icon: 'none'
						});
						console.error('登录失败:', err);
					}
				});
			}
		}
	};
</script>

<style scoped>
	.login-container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		background-color: #f5f5f5;
	}

	.login-form {
		width: 400px;
	}

	.uni-card {
		padding: 20px;
	}

	.uni-button {
		width: 100%;
	}
</style>