"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      activeTab: "market",
      questionBanks: [
        { name: "数学题库", description: "包含初中和高中数学题目" },
        { name: "英语题库", description: "包含各种英语语法和词汇题目" },
        { name: "历史题库", description: "包含中国和世界历史题目" }
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
      common_vendor.index.showToast({
        title: `已选择 ${bank.name}`,
        icon: "success"
      });
    },
    startQuiz() {
      common_vendor.index.navigateTo({
        url: `/pages/quizQuestionPage/quizQuestionPage}`
        //?bankName=${this.selectedBank.name
      });
    },
    addBank() {
      common_vendor.index.prompt({
        title: "添加题库",
        placeholder: "请输入题库名称和描述（用逗号分隔）",
        success: (res) => {
          if (res.confirm && res.content) {
            const [name, description] = res.content.split(",");
            if (name && description) {
              this.questionBanks.push({ name: name.trim(), description: description.trim() });
              common_vendor.index.showToast({
                title: "题库添加成功",
                icon: "success"
              });
            } else {
              common_vendor.index.showToast({
                title: "输入格式有误",
                icon: "none"
              });
            }
          }
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.n($data.activeTab === "market" ? "active" : ""),
    b: common_vendor.o(($event) => $options.changeTab("market")),
    c: common_vendor.n($data.activeTab === "quiz" ? "active" : ""),
    d: common_vendor.o(($event) => $options.changeTab("quiz")),
    e: $data.activeTab === "market"
  }, $data.activeTab === "market" ? {
    f: common_vendor.f($data.questionBanks, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.t(item.description),
        c: common_vendor.o(($event) => $options.selectBank(item), index),
        d: index
      };
    }),
    g: common_vendor.o((...args) => $options.addBank && $options.addBank(...args))
  } : {}, {
    h: $data.activeTab === "quiz"
  }, $data.activeTab === "quiz" ? common_vendor.e({
    i: $data.selectedBank
  }, $data.selectedBank ? {
    j: common_vendor.t($data.selectedBank.name),
    k: common_vendor.o((...args) => $options.startQuiz && $options.startQuiz(...args))
  } : {}) : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-5c8092d9"]]);
wx.createPage(MiniProgramPage);
