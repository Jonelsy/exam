<template>
  <view class="home-container">
    <!-- 顶部个人信息卡片 -->
    <view class="profile-card">
      <view class="profile-header">
        <image class="avatar" src="/static/student.png" mode="aspectFill"></image>
        <view class="user-info">
          <text class="username">{{UserData.name}}</text>
          <text class="user-id">ID: {{UserData.username}}</text>
        </view>
      </view>
      <view class="profile-stats">
        <view class="stat-item">
          <text class="stat-value">12</text>
          <text class="stat-label">累计考试</text>
        </view>
        <view class="stat-item">
          <text class="stat-value">85%</text>
          <text class="stat-label">正确率</text>
        </view>
        <view class="stat-item">
          <text class="stat-value">3</text>
          <text class="stat-label">收藏题目</text>
        </view>
      </view>
    </view>

    <!-- 近期考试安排 -->
    <view class="section-title">
      <text>近期考试安排</text>
      <text class="view-all">查看全部 ></text>
    </view>

    <view class="exam-list">
      <view class="exam-card" v-for="(exam, index) in exams" :key="index" @click="goExam(exam)">
        <view class="exam-header">
          <text class="exam-title">{{exam.examName}}</text>
		  <uni-tag text="未开始" :circle="true" v-if="examStatus(exam) === 'not-started'"></uni-tag>
		  <uni-tag text="进行中" type="success"  :circle="true" v-else-if="examStatus(exam) === 'in-progress'"></uni-tag>
		  <uni-tag text="已完结" type="error" :circle="true" v-else-if="examStatus(exam) === 'finished'"></uni-tag>
        </view>
        <view class="exam-info">
          <view class="info-item">
            <uni-icons type="calendar" size="16" color="#666"></uni-icons>
            <text>发布日期：{{exam.newcreateTime}}</text>
          </view>
          <view class="info-item">
            <uni-icons type="time" size="16" color="#666"></uni-icons>
            <text>{{exam.description}}</text>
          </view>
        </view>
        <view class="exam-footer">
          <view class="exam-progress">
			  <view class="info-item">
			    <uni-icons type="time" size="16" color="#666"></uni-icons>
			    <text>考试时间：{{exam.newstartTime}}—{{exam.newendTime}}</text>
			  </view>
		  </view>
          <button class="action-btn" :class="{'primary': exam.isLimit === 0}">
            本次考试不允许重复作答
          </button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
	UserData:{},
    exams: [],
    }
  },
  methods: {
	  getExamList (){
		  // 将本地个人数据渲染
		  this.UserData = uni.getStorageSync('User');
		  uni.request({
		  	url: `http://localhost:3000/studnet/stuExamList`,
		  	method: 'POST',
			header: {
			        'Authorization': 'Bearer ' + uni.getStorageSync('token')
			},
		  	data:{
		  		userId:this.UserData.userId,
		  		page:1,
		  		pageSize:10,
		  	},
		  	success: (res) => {
				this.exams = res.data.data
				this.exams.forEach((item,index)=>{
					item.newcreateTime = this.formatDateToYMD(item.createTime)
					item.newstartTime = this.formatDateToYMDHMS(item.startTime)
					item.newendTime = this.formatDateToYMDHMS(item.endTime)
				})
		  			
		  	},
		  	fail: (err) => {
		  		uni.showToast({
		  			title: '登录失败',
		  			icon: 'none'
		  		});
		  		console.error('登录失败:', err);
		  	}
		  });
	  },
	  //时间处理年月日
	  formatDateToYMD(isoString) {
	    const date = new Date(isoString);
	    const year = date.getFullYear();
	    const month = String(date.getMonth() + 1).padStart(2, '0');
	    const day = String(date.getDate()).padStart(2, '0');
	    
	    return `${year}-${month}-${day}`;
	  },
	  //时间处理年月日时分秒
	  formatDateToYMDHMS(isoString) {
	    const date = new Date(isoString);
	    const year = date.getFullYear();
	    const month = String(date.getMonth() + 1).padStart(2, '0');
	    const day = String(date.getDate()).padStart(2, '0');
	    const hours = String(date.getHours()).padStart(2, '0');
	    const minutes = String(date.getMinutes()).padStart(2, '0');
	    const seconds = String(date.getSeconds()).padStart(2, '0');
	    
	    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
	  },
	  //处理时间范围
	  examStatus(item) {
	    const now = new Date();
	    const startTime = new Date(item.startTime);
	    const endTime = new Date(item.endTime);
	    if (now < startTime) return 'not-started';
	    if (now <= endTime&&now >= startTime) return 'in-progress';
	    return 'finished';
	  },
	  //跳转到考试
	  goExam(item){
		const now = new Date();
		//考试正在进行中
		if (now <= new Date(item.endTime)&&now >= new Date(item.startTime)){
			uni.navigateTo({
				url: `/pages/exam/exam?examId=${item.examId}`
			});
		}else{
			//已经结束
			uni.navigateTo({
				url: `/pages/score/score?examId=${item.examId}`
			});
		}
	  },
    startPractice() {
      uni.navigateTo({
        url: '/pages/practice/index'
      })
    },
    viewHistory() {
      uni.navigateTo({
        url: '/pages/history/index'
      })
    }
  },
  created() {
  	this.getExamList()
  },
  computed: {
    
  }
}
</script>

<style scoped>
.home-container {
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
}

/* 个人信息卡片 */
.profile-card {
  background: linear-gradient(135deg, #1890ff, #096dd9);
  border-radius: 12px;
  padding: 20px;
  color: white;
  box-shadow: 0 4px 12px rgba(24, 144, 255, 0.2);
  margin-bottom: 20px;
}

.profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 3px solid rgba(255, 255, 255, 0.3);
}

.user-info {
  margin-left: 15px;
  display: flex;
  flex-direction: column;
}

.username {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
}

.user-id {
  font-size: 14px;
  opacity: 0.8;
}

.profile-stats {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}

.stat-value {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 12px;
  opacity: 0.9;
}

/* 考试安排部分 */
.section-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0 15px;
  font-size: 16px;
  font-weight: bold;
}

.view-all {
  font-size: 12px;
  color: #1890ff;
}

.exam-list {
  margin-bottom: 20px;
}

.exam-card {
  background-color: white;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.exam-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.exam-title {
  font-size: 16px;
  font-weight: bold;
}

.exam-status {
  font-size: 12px;
  padding: 3px 8px;
  border-radius: 10px;
  background-color: #f5f5f5;
  color: #666;
}

.exam-status.active {
  background-color: #f6ffed;
  color: #52c41a;
}

.exam-info {
  margin-bottom: 12px;
}

.info-item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  font-size: 13px;
  color: #666;
}

.info-item text {
  margin-left: 6px;
}

.exam-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  border-top: 1px dashed #eee;
}

.exam-progress {
  font-size: 12px;
  color: #666;
}

.action-btn {
  font-size: 12px;
  padding: 4px 12px;
  border-radius: 15px;
  background-color: #f5f5f5;
  color: #666;
  border: none;
}

.action-btn.primary {
  background-color: #1890ff;
  color: white;
}

/* 快捷操作 */
.quick-actions {
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 20px;
  left: 20px;
  right: 20px;
}

.quick-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 48%;
  height: 80px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: none;
}

.quick-btn text {
  margin-top: 8px;
  font-size: 14px;
  color: #1890ff;
}
</style>
