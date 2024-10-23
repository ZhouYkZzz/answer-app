"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      options: [
        { label: "A", text: "to find; left" },
        { label: "B", text: "to find; gone" },
        { label: "C", text: "finding; left" },
        { label: "D", text: "finding; gone" }
      ],
      correctAnswer: {
        label: "B",
        explanation: "[答案] B。不定式表结果时,常指出人意料的结果。第二个考察点是find+宾语+形容词(补语)，表状态。"
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
        common_vendor.index.showToast({
          title: "回答正确",
          icon: "success"
        });
      } else {
        common_vendor.index.showToast({
          title: "回答错误",
          icon: "none"
        });
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($data.options, (option, index, i0) => {
      return {
        a: common_vendor.t(option.label),
        b: common_vendor.t(option.text),
        c: common_vendor.n($data.selectedOption === index ? "selected" : ""),
        d: index,
        e: common_vendor.o(($event) => $options.selectOption(index), index)
      };
    }),
    b: $data.selectedOption !== null
  }, $data.selectedOption !== null ? {
    c: common_vendor.o((...args) => $options.submitAnswer && $options.submitAnswer(...args))
  } : {}, {
    d: $data.showExplanation
  }, $data.showExplanation ? {
    e: common_vendor.t($data.correctAnswer.label),
    f: common_vendor.t($data.correctAnswer.explanation)
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-7d4f078e"]]);
wx.createPage(MiniProgramPage);
