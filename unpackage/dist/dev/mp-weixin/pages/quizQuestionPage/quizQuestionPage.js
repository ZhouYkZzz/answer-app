"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      currentIndex: 0,
      selectedOption: null,
      showExplanation: false,
      isFavorited: false,
      questions: [
        {
          text: "[1] The headmaster hurried to the concert hall only _________ the speaker.",
          options: [
            { label: "A", text: "to find" },
            { label: "B", text: "finding" },
            { label: "C", text: "found" },
            { label: "D", text: "find" }
          ],
          correctAnswer: "A",
          explanation: "正确答案是A，因为这是一个不定式结构。"
        },
        {
          text: "[2] —I failed again. I wish I _________ harder. —But you _________.",
          options: [
            { label: "A", text: "had worked; hadn’t" },
            { label: "B", text: "worked; don’t" },
            { label: "C", text: "had worked; didn’t" },
            { label: "D", text: "worked; didn’t" }
          ],
          correctAnswer: "C",
          explanation: "第一空表达与过去事实相反的愿望,所以用过去完成时态表虚拟语气。第二空说明过去的事实,用一般过去时态。"
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
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($options.currentQuestion.text),
    b: common_vendor.f($options.currentQuestion.options, (option, index, i0) => {
      return {
        a: common_vendor.t(option.label),
        b: common_vendor.t(option.text),
        c: index,
        d: common_vendor.o(($event) => $options.selectOption(index), index),
        e: common_vendor.n($data.selectedOption === index ? "selected-option" : ""),
        f: common_vendor.n($data.showExplanation && $data.selectedOption === index ? $options.isCorrect(index) ? "correct" : "incorrect" : "")
      };
    }),
    c: $data.selectedOption !== null
  }, $data.selectedOption !== null ? {
    d: common_vendor.o((...args) => $options.submitAnswer && $options.submitAnswer(...args))
  } : {}, {
    e: $data.showExplanation
  }, $data.showExplanation ? {
    f: common_vendor.t($options.currentQuestion.correctAnswer),
    g: common_vendor.t($options.currentQuestion.explanation)
  } : {}, {
    h: common_vendor.o((...args) => $options.previousQuestion && $options.previousQuestion(...args)),
    i: $data.currentIndex === 0,
    j: common_vendor.o((...args) => $options.nextQuestion && $options.nextQuestion(...args)),
    k: $data.currentIndex === $data.questions.length - 1,
    l: $data.isFavorited ? 1 : "",
    m: common_vendor.o((...args) => $options.toggleFavorite && $options.toggleFavorite(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
