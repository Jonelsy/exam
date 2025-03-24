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
    <swiper 
      class="swiper"
      :current="currentIndex"
      @change="swiperChange"
      :duration="300"
    >
      <swiper-item v-for="(item, index) in questions" :key="index">
        <view class="question-container">
          <view class="question-title">{{item.title}}</view>
          <view 
            class="option" 
            v-for="(option, oIndex) in item.options" 
            :key="oIndex"
            @click="selectAnswer(index, oIndex)"
            :class="{'selected': answers[index] === oIndex}"
          >
            {{String.fromCharCode(65 + oIndex)}}. {{option}}
          </view>
        </view>
      </swiper-item>
    </swiper>
    
    <!-- 底部切换按钮 -->
    <view class="footer">
      <view 
        class="nav-btn prev" 
        @click="prevQuestion"
        :class="{'disabled': currentIndex === 0}"
      >
        上一题
      </view>
      <view 
        class="nav-btn next" 
        @click="nextQuestion"
        :class="{'disabled': currentIndex === questions.length - 1}"
      >
        下一题
      </view>
    </view>
    
    <!-- 题目目录侧边栏 -->
    <view 
      class="menu-mask" 
      v-if="showMenu" 
      @click="toggleMenu"
    ></view>
    <view 
      class="menu-sidebar" 
      :class="{'show': showMenu}"
    >
      <view class="menu-title">题目列表</view>
      <scroll-view scroll-y class="menu-content">
        <view 
          class="menu-item" 
          v-for="(item, index) in questions" 
          :key="index"
          @click="jumpToQuestion(index)"
          :class="{'answered': answers[index] !== undefined}"
        >
          {{index + 1}}
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0,
      showMenu: false,
      answers: {}, // 保存用户答案 {题目索引: 选项索引}
      questions: [
        {
          title: "1. 下列哪个不是JavaScript的数据类型？",
          options: ["Number", "String", "Boolean", "Array"]
        },
        {
          title: "2. CSS中哪个属性用于改变文本颜色？",
          options: ["font-color", "text-color", "color", "font-style"]
        },
        {
          title: "3. Vue.js的核心特性不包括以下哪项？",
          options: ["数据绑定", "组件系统", "虚拟DOM", "双向数据流"]
        },
        // 可以继续添加更多题目...
      ]
    }
  },
  methods: {
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
    
    // 选择答案
    selectAnswer(qIndex, aIndex) {
      this.$set(this.answers, qIndex, aIndex)
    },
    
    // 切换目录显示
    toggleMenu() {
      this.showMenu = !this.showMenu
    },
    
    // 跳转到指定题目
    jumpToQuestion(index) {
      this.currentIndex = index
      this.showMenu = false
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
</style>
