"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
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
    this.printCurrentPageUrl();
    const source = this.getSourceFromUrl();
    console.log("Source:", source);
    this.printCurrentPageUrl();
    console.log("Source:", source);
    this.printCurrentPageUrl();
    const bankId = this.getBankIdFromUrl();
    if (bankId) {
      this.fetchQuestions(bankId, source);
    } else {
      console.error("Bank ID is missing from the URL.");
    }
  },
  methods: {
    getBankIdFromUrl() {
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1];
      if (currentPage && currentPage.options) {
        return currentPage.options.bankId;
      } else {
        console.error("Unable to retrieve bankId from the URL.");
        return null;
      }
    },
    getSourceFromUrl() {
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1];
      if (currentPage && currentPage.options) {
        return currentPage.options.source;
      } else {
        console.error("Unable to retrieve source from the URL.");
        return null;
      }
    },
    async fetchQuestions(bankId, source) {
      try {
        common_vendor.index.getStorage({
          key: "userToken",
          success: (res) => {
            const token = res.data;
            const url = source === "quiz" ? "http://116.62.5.195:8081/user/question/wrong" : "http://116.62.5.195:8081/user/question";
            common_vendor.index.request({
              url,
              method: "GET",
              header: {
                Authorization: `${token}`
              },
              data: {
                bankId: source === "quiz" ? bankId || "" : bankId
              },
              success: (response) => {
                if (response.data.code === 0) {
                  this.questions = response.data.data;
                } else {
                  console.error("Failed to fetch questions:", response.data.msg);
                }
              },
              fail: (err) => {
                console.error("Error fetching questions:", err);
              }
            });
          },
          fail: (err) => {
            console.error("Failed to get token from storage:", err);
          }
        });
      } catch (error) {
        console.error("Error fetching questions:", error);
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
        common_vendor.index.getStorage({
          key: "userToken",
          success: (res) => {
            const token = res.data;
            common_vendor.index.request({
              url: `http://116.62.5.195:8081/user/record/question/${this.currentQuestion.id}`,
              method: "POST",
              header: {
                Authorization: `${token}`
              },
              data: {
                answer: [this.currentQuestion.options[this.selectedOption].name]
              },
              success: (response) => {
                if (response.data.code === 0) {
                  const { isCorrect, answer } = response.data.data;
                  this.currentQuestion.correctAnswer = answer.join(", ");
                  if (!this.currentQuestion.explanation) {
                    this.currentQuestion.explanation = isCorrect ? "回答正确！" : "回答错误，请查看正确答案。";
                  }
                } else {
                  console.error("Failed to submit answer:", response.data.msg);
                }
              },
              fail: (err) => {
                console.error("Error submitting answer:", err);
              }
            });
          },
          fail: (err) => {
            console.error("Failed to get token from storage:", err);
          }
        });
      } catch (error) {
        console.error("Error submitting answer:", error);
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
      console.log("Current page URL:", url);
      console.log("Current page options:", options);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($options.currentQuestion.content),
    b: common_vendor.f($options.currentQuestion.options, (option, index, i0) => {
      return {
        a: common_vendor.t(option.name),
        b: common_vendor.t(option.content),
        c: index,
        d: common_vendor.o(($event) => $options.selectOption(index), index),
        e: common_vendor.n($data.selectedOption === index ? "selected-option" : ""),
        f: common_vendor.n($data.showExplanation && $data.selectedOption === index ? $options.isCorrect(index) ? "correct" : "incorrect" : "")
      };
    }),
    c: $data.showExplanation,
    d: $data.selectedOption !== null
  }, $data.selectedOption !== null ? {
    e: common_vendor.o((...args) => $options.submitAnswer && $options.submitAnswer(...args))
  } : {}, {
    f: $data.showExplanation
  }, $data.showExplanation ? {
    g: common_vendor.t($options.currentQuestion.correctAnswer),
    h: common_vendor.t($options.currentQuestion.explanation)
  } : {}, {
    i: common_vendor.o((...args) => $options.previousQuestion && $options.previousQuestion(...args)),
    j: $data.currentIndex === 0,
    k: common_vendor.o((...args) => $options.nextQuestion && $options.nextQuestion(...args)),
    l: $data.currentIndex === $data.questions.length - 1,
    m: $data.isFavorited ? 1 : "",
    n: common_vendor.o((...args) => $options.toggleFavorite && $options.toggleFavorite(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
