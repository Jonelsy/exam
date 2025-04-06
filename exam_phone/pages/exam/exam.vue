<template>
	<view class="container">
		<!-- 顶部导航栏 -->
		<view class="header">
			<view class="progress">{{currentIndex + 1}}/{{questions.length}}</view>
			<view class="menu-btn" @click="toggleMenu">
				<uni-icons type="list" size="24" color="#333"></uni-icons>
			</view>
		</view>

		<!-- 题目内容区域 -->
		<swiper class="swiper" :current="currentIndex" @change="swiperChange" :duration="300">
			<swiper-item v-for="(item, index) in questions" :key="index">
				<view class="question-container">
					<view class="question-title">{{item.content}}</view>

					<!-- 单选题 -->
					<block v-if="item.questionType === 0">
						<view class="option" v-for="(option, oIndex) in item.options" :key="oIndex"
							@click="selectSingleAnswer(index, oIndex)"
							:class="{'selected': answers[index] === option.optionId}">
							{{String.fromCharCode(65 + oIndex)}}. {{option.content}}
						</view>
					</block>

					<!-- 多选题 -->
					<block v-else-if="item.questionType === 1">
						<view class="option multiple-option" v-for="(option, oIndex) in item.options" :key="oIndex"
							@click="toggleMultipleAnswer(index, oIndex)"
							:class="{'selected': answers[index] && answers[index].includes(option.optionId)}">
							<view class="checkbox-icon">
								{{answers[index] && answers[index].includes(option.optionId) ? '✓' : ''}}
							</view>
							{{String.fromCharCode(65 + oIndex)}}. {{option.content}}
						</view>
					</block>

					<!-- 判断题 -->
					<block v-else-if="item.questionType === 2">
						<view class="judge-options">
							<view class="option judge-option" @click="selectJudgeAnswer(index, true)"
								:class="{'selected': answers[index] === 1}">
								正确
							</view>
							<view class="option judge-option" @click="selectJudgeAnswer(index, false)"
								:class="{'selected': answers[index] === 0}">
								错误
							</view>
						</view>
					</block>

					<!-- 简答题 -->
					<block v-else-if="item.questionType === 3">
						<textarea class="answer-textarea" placeholder="请输入您的答案..." v-model="answers[index]"
							auto-height></textarea>
					</block>
				</view>
			</swiper-item>
		</swiper>

		<!-- 底部切换按钮 -->
		<view class="footer">
			<view class="nav-btn prev" @click="prevQuestion" :class="{'disabled': currentIndex === 0}">
				上一题
			</view>
			<view v-if="currentIndex < questions.length - 1" class="nav-btn next" @click="nextQuestion">
				下一题
			</view>

			<view v-else class="nav-btn submit" @click="dialogToggle('error')">交卷</view>
		</view>
		<uni-popup ref="alertDialog" type="dialog">
			<uni-popup-dialog :type="msgType" cancelText="关闭" confirmText="确认交卷" title="通知" content="交卷后无法重新作答,请确认您的选择"
				@confirm="dialogConfirm"></uni-popup-dialog>
		</uni-popup>
		<!-- 题目目录侧边栏 -->
		<view class="menu-mask" v-if="showMenu" @click="toggleMenu"></view>
		<view class="menu-sidebar" :class="{'show': showMenu}">
			<view class="menu-title">题目列表</view>
			<scroll-view scroll-y class="menu-content">
				<view class="menu-item" v-for="(item, index) in questions" :key="index" @click="jumpToQuestion(index)"
					:class="{'answered': answers[index] !== undefined && answers[index] !== null}">
					{{index + 1}}
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(options) {
			this.examId = options.examId
			this.getExamList()
		},
		data() {
			return {
				examId: 0,
				currentIndex: 0,
				showMenu: false,
				answers: {}, // 存储 optionId 或 optionId 数组
				questions: [], // 题目列表
				type: 'center',
				msgType: 'error',
				messageText: '这是一条成功提示',
				value: ''
			}
		},
		methods: {
			//弹出框
			dialogToggle(type) {
				this.msgType = type
				this.$refs.alertDialog.open()
			},
			//点击了确认交卷
			dialogConfirm() {
				console.log('点击确认')
				this.submitExam();
			},
			// 切换题目
			swiperChange(e) {
				this.currentIndex = e.detail.current
			},

			// 上一题
			prevQuestion() {
				if (this.currentIndex > 0) {
					this.currentIndex--
				}
			},

			// 下一题
			nextQuestion() {
				if (this.currentIndex < this.questions.length - 1) {
					this.currentIndex++
				}
			},

			// 单选题选择
			selectSingleAnswer(qIndex, oIndex) {
				const optionId = this.questions[qIndex].options[oIndex].optionId;
				this.$set(this.answers, qIndex, optionId);
			},
			// 判断题选择（1表示正确，0表示错误）
			selectJudgeAnswer(qIndex, isRight) {
				// 存储用户选择（1=正确，0=错误）
				this.$set(this.answers, qIndex, isRight ? 1 : 0);
			},
			// 多选题选择/取消
			toggleMultipleAnswer(qIndex, oIndex) {
				const optionId = this.questions[qIndex].options[oIndex].optionId;

				if (!this.answers[qIndex]) {
					this.$set(this.answers, qIndex, []);
				}

				const index = this.answers[qIndex].indexOf(optionId);
				if (index === -1) {
					this.answers[qIndex].push(optionId);
				} else {
					this.answers[qIndex].splice(index, 1);
				}
				this.$forceUpdate();
			},

			// 切换目录显示
			toggleMenu() {
				this.showMenu = !this.showMenu
			},

			// 跳转到指定题目
			jumpToQuestion(index) {
				this.currentIndex = index
				this.showMenu = false
			},

			// 获取题目列表
			getExamList() {
				uni.request({
					url: `http://localhost:3000/exam/question/${this.examId}/1/1000`,
					method: 'GET',
					header: {
						'Authorization': 'Bearer ' + uni.getStorageSync('token')
					},
					success: (res) => {
						this.questions = res.data.questions
						// 初始化答案对象
						this.answers = this.questions.reduce((acc, _, index) => {
							acc[index] = null
							return acc
						}, {})
					},
					fail: (err) => {
						uni.showToast({
							title: '获取题目失败',
							icon: 'none'
						})
						console.error('获取题目失败:', err)
					}
				})
			},
			// 提交试卷
			submitExam() {
				// 1. 准备提交数据
				const submitData = {
					examId: this.examId,
					submitTime: new Date().toISOString(),
					answers: this.questions.map((question, index) => {
						const answerItem = {
							questionId: question.questionId,
							questionType: question.questionType
						};

						// 根据题型处理答案格式
						switch (question.questionType) {
							case 0: // 单选题
								answerItem.optionId = this.answers[index] || null; // 存储选中的 optionId
								break;

							case 1: // 多选题
								answerItem.optionIds = this.answers[index] || []; // 存储选中的 optionId 数组
								break;

							case 2: // 判断题
								answerItem.optionId = question.options[0].optionId; // 判断题的optionId
								answerItem.correctAnswer = question.options[0].isCorrect ? 1 : 0; // 正确答案
								answerItem.userAnswer = this.answers[index] !== undefined ? this.answers[
									index] : null; // 用户选择
								break;

							case 3: // 简答题
								answerItem.answer = this.answers[index] || '';
								break;
						}

						return answerItem;
					})
				};
				// 其余提交逻辑保持不变...
				uni.request({
					url: 'http://localhost:3000/studnet/subExamList',
					method: 'POST',
					header: {
						'Authorization': 'Bearer ' + uni.getStorageSync('token'),
						'Content-Type': 'application/json'
					},
					data: submitData,
					success: (res) => {
						// 处理成功响应
						uni.showToast({
							title: '交卷成功',
							icon: 'none',
							duration: 1500,   // 1.5秒后自动关闭
						})
						 // 2. 延迟跳转（避免 Toast 被立即打断）
						    setTimeout(() => {
						      uni.navigateTo({
						        url: '/pages/index/index' 
						      });
						    }, 1500)
					},
					fail: (err) => {
						// 处理失败
					}
				});
			}
		}
	}
</script>

<style scoped>
	.container {
		position: relative;
		height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.header {
		height: 60px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 20px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		z-index: 10;
	}

	.progress {
		font-size: 16px;
		color: #333;
	}

	.menu-btn {
		padding: 8px;
	}

	.swiper {
		flex: 1;
		height: calc(100vh - 120px);
	}

	.question-container {
		padding: 20px;
	}

	.question-title {
		font-size: 18px;
		font-weight: bold;
		margin-bottom: 20px;
		line-height: 1.5;
	}

	.option {
		padding: 12px 15px;
		margin-bottom: 15px;
		border: 1px solid #eee;
		border-radius: 8px;
		background-color: #f9f9f9;
	}

	.option.selected {
		background-color: #e6f7ff;
		border-color: #1890ff;
		color: #1890ff;
	}

	/* 多选题样式 */
	.multiple-option {
		display: flex;
		align-items: center;
	}

	.checkbox-icon {
		width: 20px;
		height: 20px;
		border: 1px solid #ddd;
		border-radius: 50%;
		margin-right: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 12px;
	}

	.multiple-option.selected .checkbox-icon {
		background-color: #1890ff;
		color: white;
		border-color: #1890ff;
	}

	/* 判断题样式 */
	.judge-options {
		display: flex;
		justify-content: space-between;
	}

	.judge-option {
		width: 48%;
		text-align: center;
		padding: 12px 0;
	}

	/* 简答题样式 */
	.answer-textarea {
		width: 100%;
		min-height: 100px;
		border: 1px solid #eee;
		border-radius: 8px;
		padding: 15px;
		box-sizing: border-box;
		background-color: #f9f9f9;
		margin-bottom: 15px;
	}

	.footer {
		height: 60px;
		display: flex;
		justify-content: space-between;
		padding: 0 20px;
		align-items: center;
		box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
	}

	.nav-btn {
		padding: 10px 20px;
		background-color: #1890ff;
		color: white;
		border-radius: 20px;
	}

	.nav-btn.disabled {
		background-color: #ccc;
		opacity: 0.6;
	}

	/* 目录侧边栏样式 */
	.menu-mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 998;
	}

	.menu-sidebar {
		position: fixed;
		top: 0;
		right: -300px;
		width: 300px;
		height: 100vh;
		background-color: white;
		z-index: 999;
		transition: transform 0.3s ease;
	}

	.menu-sidebar.show {
		transform: translateX(-300px);
	}

	.menu-title {
		padding: 20px;
		font-size: 18px;
		font-weight: bold;
		border-bottom: 1px solid #eee;
	}

	.menu-content {
		height: calc(100vh - 61px);
		padding: 15px;
	}

	.menu-item {
		width: 40px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		margin: 10px;
		display: inline-block;
		border: 1px solid #eee;
		border-radius: 50%;
	}

	.menu-item.answered {
		background-color: #e6f7ff;
		color: #1890ff;
		border-color: #1890ff;
	}

	.nav-btn.submit {
		padding: 10px 20px;
		background-color: #ff0000;
		/* 绿色表示确认操作 */
		color: white;
		border-radius: 20px;
	}
</style>