<template>
  <view class="container">
    <!-- Quiz Question Header -->
    <view class="header">
      <text class="title">答题页面</text>
    </view>

    <!-- Quiz Question Content -->
    <view class="question-content">
      <text class="question">{{ currentQuestion.content }}</text>
      <view class="options">
        <view class="option" v-for="(option, index) in currentQuestion.options" :key="index" @click="selectOption(index)" :class="['option-box', selectedOption === index ? 'selected-option' : '', showExplanation && selectedOption === index ? (isCorrect(index) ? 'correct' : 'incorrect') : '']" :disabled="showExplanation">
          <view class="option-frame">
            <text class="option-text">
              {{ option.name }}. {{ option.content }}
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
      questions: []
    };
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentIndex] || {};
    }
  },
  mounted() {
    this.printCurrentPageUrl(); // 在页面加载时输出 URL
    const source = this.getSourceFromUrl();
    console.log('Source:', source); // 输出 source 到控制台
    this.printCurrentPageUrl(); // 在页面加载时输出 URL
        console.log('Source:', source); // 输出 source 到控制台
    this.printCurrentPageUrl(); // 在页面加载时输出 URL
    const bankId = this.getBankIdFromUrl();
        if (bankId) {
      this.fetchQuestions(bankId, source);
    } else {
      console.error('Bank ID is missing from the URL.');
    }
  },
  methods: {
    getBankIdFromUrl() {
      // 从URL中获取bankId
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1];
      if (currentPage && currentPage.options) {
        return currentPage.options.bankId;
      } else {
        console.error('Unable to retrieve bankId from the URL.');
        return null;
      }
    },
    getSourceFromUrl() {
      // 从URL中获取source
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1];
      if (currentPage && currentPage.options) {
        return currentPage.options.source;
      } else {
        console.error('Unable to retrieve source from the URL.');
        return null;
      }
    },
    async fetchQuestions(bankId, source) {
      try {
        uni.getStorage({
          key: 'userToken',
          success: (res) => {
            const token = res.data;
            const url = source === 'quiz' ? 'http://116.62.5.195:8081/user/question/wrong' : 'http://116.62.5.195:8081/user/question';
            uni.request({
              url: url,
              method: 'GET',
              header: {
                Authorization: `${token}`
              },
              data: {
                bankId: source === 'quiz' ? bankId || '' : bankId
              },
              success: (response) => {
                if (response.data.code === 0) {
                  this.questions = response.data.data;
                } else {
                  console.error('Failed to fetch questions:', response.data.msg);
                }
              },
              fail: (err) => {
                console.error('Error fetching questions:', err);
              }
            });
          },
          fail: (err) => {
            console.error('Failed to get token from storage:', err);
          }
        });
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    },
    selectOption(index) {
      if (!this.showExplanation) {
        this.selectedOption = index;
      }
    },
    async submitAnswer() {
      this.showExplanation = true;
      try {
        uni.getStorage({
          key: 'userToken',
          success: (res) => {
            const token = res.data;
            uni.request({
              url: `http://116.62.5.195:8081/user/record/question/${this.currentQuestion.id}`,
              method: 'POST',
              header: {
                Authorization: `${token}`
              },
              data: {
                answer: [this.currentQuestion.options[this.selectedOption].name]
              },
              success: (response) => {
                if (response.data.code === 0) {
                  const { isCorrect, answer } = response.data.data;
                  this.currentQuestion.correctAnswer = answer.join(', ');
                  if (!this.currentQuestion.explanation) {
                    this.currentQuestion.explanation = isCorrect ? '回答正确！' : '回答错误，请查看正确答案。';
                  }
                } else {
                  console.error('Failed to submit answer:', response.data.msg);
                }
              },
              fail: (err) => {
                console.error('Error submitting answer:', err);
              }
            });
          },
          fail: (err) => {
            console.error('Failed to get token from storage:', err);
          }
        });
      } catch (error) {
        console.error('Error submitting answer:', error);
      }
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
      return this.currentQuestion.options[index].name === this.currentQuestion.correctAnswer;
    },
    printCurrentPageUrl() {
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1];
      const url = currentPage.route;
      const options = currentPage.options;
      console.log('Current page URL:', url);
      console.log('Current page options:', options);
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
