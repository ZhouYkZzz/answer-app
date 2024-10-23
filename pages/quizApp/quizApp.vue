<template>
  <view class="container">
    <!-- Header -->
    <view class="header">
      <text class="title">答题小程序</text>
    </view>

    <!-- Tab Navigation -->
    <view class="tab-navigation">
      <view :class="['tab-item', activeTab === 'market' ? 'active' : '']" @click="changeTab('market')">
        <text>题库市场</text>
      </view>
      <view :class="['tab-item', activeTab === 'quiz' ? 'active' : '']" @click="changeTab('quiz')">
        <text>开始答题</text>
      </view>
    </view>

    <!-- Main Content -->
    <view class="content">
      <view v-if="activeTab === 'market'">
        <!-- Question Bank Market -->
        <view class="market-list">
          <view class="market-item" v-for="(item, index) in questionBanks" :key="index">
            <text class="market-title">{{ item.name }}</text>
            <text class="market-desc">{{ item.description }}</text>
            <button class="btn" @click="selectBank(item)">选择题库</button>
          </view>
          <button class="btn add-bank-btn" @click="addBank">添加题库</button>
        </view>
      </view>

      <view v-if="activeTab === 'quiz'">
        <!-- Quiz Start Page -->
        <view v-if="selectedBank">
          <text class="quiz-title">正在使用题库: {{ selectedBank.name }}</text>
          <button class="btn start-btn" @click="startQuiz">开始答题</button>
        </view>
        <view v-else>
          <text class="quiz-title">请先选择题库</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 'market',
      questionBanks: [
        { name: '数学题库', description: '包含初中和高中数学题目' },
        { name: '英语题库', description: '包含各种英语语法和词汇题目' },
        { name: '历史题库', description: '包含中国和世界历史题目' }
      ],
      selectedBank: null
    };
  },
  methods: {
    changeTab(tab) {
      this.activeTab = tab;
    },
    selectBank(bank) {
      this.selectedBank = bank;
      uni.showToast({
        title: `已选择 ${bank.name}`,
        icon: 'success'
      });
    },
    startQuiz() {
      uni.navigateTo({
        url: `/pages/quizQuestionPage/quizQuestionPage?bankName=${this.selectedBank.name}`//
      });
    },
    addBank() {
      uni.prompt({
        title: '添加题库',
        placeholder: '请输入题库名称和描述（用逗号分隔）',
        success: (res) => {
          if (res.confirm && res.content) {
            const [name, description] = res.content.split(',');
            if (name && description) {
              this.questionBanks.push({ name: name.trim(), description: description.trim() });
              uni.showToast({
                title: '题库添加成功',
                icon: 'success'
              });
            } else {
              uni.showToast({
                title: '输入格式有误',
                icon: 'none'
              });
            }
          }
        }
      });
    }
  }
};
</script>

<style scoped>
.container {
  padding: 20rpx;
}
.header {
  text-align: center;
  padding: 20rpx 0;
}
.title {
  font-size: 36rpx;
  font-weight: bold;
}
.tab-navigation {
  display: flex;
  justify-content: space-around;
  margin-top: 20rpx;
}
.tab-item {
  padding: 10rpx;
  font-size: 30rpx;
  cursor: pointer;
}
.tab-item.active {
  border-bottom: 3rpx solid #42b983;
  color: #42b983;
}
.content {
  margin-top: 40rpx;
}
.market-list {
  display: flex;
  flex-direction: column;
}
.market-item {
  padding: 20rpx;
  margin-bottom: 20rpx;
  border: 1rpx solid #ccc;
  border-radius: 10rpx;
}
.market-title {
  font-size: 32rpx;
  font-weight: bold;
}
.market-desc {
  margin-top: 10rpx;
  color: #666;
}
.btn {
  margin-top: 20rpx;
  background-color: #42b983;
  color: #fff;
  padding: 10rpx 20rpx;
  border: none;
  border-radius: 5rpx;
}
.add-bank-btn {
  margin-top: 30rpx;
  background-color: #007aff;
  color: #fff;
  padding: 15rpx;
  text-align: center;
  border-radius: 10rpx;
}
.start-btn {
  width: 100%;
  text-align: center;
}
.quiz-title {
  font-size: 32rpx;
  text-align: center;
  margin-bottom: 20rpx;
}
</style>
