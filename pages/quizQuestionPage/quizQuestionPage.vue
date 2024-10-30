<template>
  <view class="container">
    <!-- Quiz Question Header -->
    <view class="header">
      <text class="title">答题页面</text>
    </view>

    <!-- Quiz Question Content -->
    <view class="question-content">
      <text class="question">{{ currentQuestion.text }}</text>
      <view class="options">
        <view class="option" v-for="(option, index) in currentQuestion.options" :key="index" @click="selectOption(index)" :class="['option-box', selectedOption === index ? 'selected-option' : '', showExplanation && selectedOption === index ? (isCorrect(index) ? 'correct' : 'incorrect') : '']">
          <view class="option-frame">
            <text class="option-text">
              {{ option.label }}. {{ option.text }}
            </text>
          </view>
        </view>
      </view>
      <button v-if="selectedOption !== null" class="btn submit-btn" @click="submitAnswer">提交答案</button>
    </view>

    <!-- Explanation Section -->
    <view v-if="showExplanation" class="explanation">
      <text class="explanation-title">答案解析</text>
      <text class="correct-answer">正确答案: {{ currentQuestion.correctAnswer }}</text>
      <text class="explanation-text">{{ currentQuestion.explanation }}</text>
    </view>

    <!-- Navigation and Favorite Buttons -->
    <view class="navigation-buttons">
      <button class="btn nav-btn" @click="previousQuestion" :disabled="currentIndex === 0">上一题</button>
      <button class="btn nav-btn" @click="nextQuestion" :disabled="currentIndex === questions.length - 1">下一题</button>
      <button class="btn favorite-btn" :class="{ favorited: isFavorited }" @click="toggleFavorite">收藏</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0,
      selectedOption: null,
      showExplanation: false,
      isFavorited: false,
      questions: [
        {
          text: '[1] The headmaster hurried to the concert hall only _________ the speaker.',
          options: [
            { label: 'A', text: 'to find' },
            { label: 'B', text: 'finding' },
            { label: 'C', text: 'found' },
            { label: 'D', text: 'find' }
          ],
          correctAnswer: 'A',
          explanation: '正确答案是A，因为这是一个不定式结构。'
        },
        {
          text: '[2] —I failed again. I wish I _________ harder. —But you _________.',
          options: [
            { label: 'A', text: 'had worked; hadn’t' },
            { label: 'B', text: 'worked; don’t' },
            { label: 'C', text: 'had worked; didn’t' },
            { label: 'D', text: 'worked; didn’t' }
          ],
          correctAnswer: 'C',
          explanation: '第一空表达与过去事实相反的愿望,所以用过去完成时态表虚拟语气。第二空说明过去的事实,用一般过去时态。'
        }
      ]
    };
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentIndex];
    }
  },
  methods: {
    selectOption(index) {
      this.selectedOption = index;
    },
    submitAnswer() {
      this.showExplanation = true;
    },
    previousQuestion() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
        this.resetQuestionState();
      }
    },
    nextQuestion() {
      if (this.currentIndex < this.questions.length - 1) {
        this.currentIndex++;
        this.resetQuestionState();
      }
    },
    toggleFavorite() {
      this.isFavorited = !this.isFavorited;
    },
    resetQuestionState() {
      this.selectedOption = null;
      this.showExplanation = false;
      this.isFavorited = false;
    },
    isCorrect(index) {
      return this.currentQuestion.options[index].label === this.currentQuestion.correctAnswer;
    }
  }
};
</script>

<style>
.container {
  padding: 20px;
}
.header {
  margin-bottom: 20px;
}
.question-content {
  margin-bottom: 20px;
}
.option {
  margin: 10px 0;
}
.option-box {
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
}
.option-frame {
  display: flex;
  align-items: center;
}
.option-text {
  margin-left: 10px;
}
.selected {
  font-weight: bold;
}
.selected-option {
  background-color: #e0f7e9; /* Light green to indicate the selected option */
}
.correct {
  color: green;
}
.incorrect {
  color: red;
}
.navigation-buttons {
  margin-top: 20px;
}
.nav-btn {
  margin-right: 10px;
}
.favorite-btn {
  background-color: lightgray;
}
.favorited {
  background-color: yellow;
}
</style>
