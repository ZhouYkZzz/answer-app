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
        <text>错题集</text>
      </view>
    </view>

    <!-- Main Content -->
    <view class="content">
      <view v-if="activeTab === 'market'">
        <!-- Question Bank Market -->
        <view class="market-list">
          <view class="market-item" v-for="(item, index) in questionBanks" :key="index">
            <text class="market-title">{{ item.name }}</text>
            <button class="btn" @click="startQuiz(item)">选择题库</button>
          </view>
        </view>
      </view>

      <view v-if="activeTab === 'quiz'">
        <!-- Quiz Collection Page -->
        <view class="market-list">
          <view class="market-item" v-for="(item, index) in questionBanks" :key="index">
            <text class="market-title">{{ item.name }}</text>
            <button class="btn" @click="startQuiz(item)">选择题库</button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { onMounted, ref } from 'vue';

export default {
  setup() {
    const activeTab = ref('market');
    const questionBanks = ref([]);
    const selectedBank = ref(null);

    // Method to change active tab
    const changeTab = (tab) => {
      activeTab.value = tab;
    };

    // Fetch question banks from the backend
    const fetchQuestionBanks = async () => {
      try {
        // 读取本地存储中的 userToken
        uni.getStorage({
          key: 'userToken',
          success: async (res) => {
            const token = res.data; // 获取 token

            // 使用 token 发起请求
            const response = await uni.request({
              url: 'http://116.62.5.195:8081/user/bank',
              method: 'GET',
              header: {
                'Authorization': `${token}`, // 这里添加 Authorization 头，可能需要和后端确认使用的格式
                'Content-Type': 'application/json'  // 通常也可以加上 'Content-Type'
              }
            });

            questionBanks.value = response.data.data; // 更新 questionBanks 的值
          },
          fail: (err) => {
            console.error('Failed to get token from storage:', err);
          }
        });
      } catch (error) {
        console.error('Error fetching question banks:', error);
      }
    };

    // Lifecycle hook to fetch question banks when component is mounted
    onMounted(() => {
      fetchQuestionBanks();
    });

    // Method for starting quiz
    const startQuiz = (bank) => {
      const source = activeTab.value === 'market' ? 'market' : 'quiz';
      const url = `/pages/quizQuestionPage/quizQuestionPage?bankId=${bank.id}&source=${source}`;
      console.log('Navigating to URL:', url); // 输出 URL 到控制台
      uni.navigateTo({
        url: url
      });
    };

    return {
      activeTab,
      questionBanks,
      selectedBank,
      changeTab,
      startQuiz
    };
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
