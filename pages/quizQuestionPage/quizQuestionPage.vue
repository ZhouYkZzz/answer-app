<template>
  <view class="container">
    <!-- Quiz Question Header -->
    <view class="header">
      <text class="title">答题页面</text>
    </view>

    <!-- Quiz Question Content -->
    <view class="question-content">
      <text class="question">[1] The headmaster hurried to the concert hall only _________ the speaker</text>
      <view class="options">
        <view class="option" v-for="(option, index) in options" :key="index" @click="selectOption(index)">
          <text :class="['option-text', selectedOption === index ? 'selected' : '']">
            {{ option.label }}. {{ option.text }}
          </text>
        </view>
      </view>
      <button v-if="selectedOption !== null" class="btn submit-btn" @click="submitAnswer">提交答案</button>
    </view>

    <!-- Explanation Section -->
    <view v-if="showExplanation" class="explanation">
      <text class="explanation-title">答案解析</text>
      <text class="correct-answer">正确答案: {{ correctAnswer.label }}</text>
      <text class="explanation-text">{{ correctAnswer.explanation }}</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      options: [
        { label: 'A', text: 'to find; left' },
        { label: 'B', text: 'to find; gone' },
        { label: 'C', text: 'finding; left' },
        { label: 'D', text: 'finding; gone' }
      ],
      correctAnswer: {
        label: 'B',
        explanation: '[答案] B。不定式表结果时,常指出人意料的结果。第二个考察点是find+宾语+形容词(补语)，表状态。'
      },
      selectedOption: null,
      showExplanation: false
    };
  },
  methods: {
    selectOption(index) {
      this.selectedOption = index;
    },
    submitAnswer() {
      this.showExplanation = true;
      if (this.options[this.selectedOption].label === this.correctAnswer.label) {
        uni.showToast({
          title: '回答正确',
          icon: 'success'
        });
      } else {
        uni.showToast({
          title: '回答错误',
          icon: 'none'
        });
      }
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
.question-content {
  margin-top: 40rpx;
}
.question {
  font-size: 32rpx;
  margin-bottom: 20rpx;
}
.options {
  display: flex;
  flex-direction: column;
}
.option {
  padding: 20rpx;
  margin-bottom: 20rpx;
  border: 1rpx solid #ccc;
  border-radius: 10rpx;
  cursor: pointer;
}
.option-text {
  font-size: 30rpx;
}
.option-text.selected {
  color: #42b983;
  font-weight: bold;
}
.btn {
  margin-top: 30rpx;
  background-color: #42b983;
  color: #fff;
  padding: 15rpx;
  border: none;
  border-radius: 5rpx;
}
.submit-btn {
  width: 100%;
  text-align: center;
}
.explanation {
  margin-top: 40rpx;
  padding: 20rpx;
  border-top: 1rpx solid #ccc;
}
.explanation-title {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
}
.correct-answer {
  font-size: 30rpx;
  color: #42b983;
  margin-bottom: 10rpx;
}
.explanation-text {
  font-size: 28rpx;
  color: #666;
}
</style>
