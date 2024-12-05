"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  setup() {
    const activeTab = common_vendor.ref("market");
    const questionBanks = common_vendor.ref([]);
    const selectedBank = common_vendor.ref(null);
    const changeTab = (tab) => {
      activeTab.value = tab;
    };
    const fetchQuestionBanks = async () => {
      try {
        common_vendor.index.getStorage({
          key: "userToken",
          success: async (res) => {
            const token = res.data;
            const response = await common_vendor.index.request({
              url: "http://116.62.5.195:8081/user/bank",
              method: "GET",
              header: {
                "Authorization": `${token}`,
                // 这里添加 Authorization 头，可能需要和后端确认使用的格式
                "Content-Type": "application/json"
                // 通常也可以加上 'Content-Type'
              }
            });
            questionBanks.value = response.data.data;
          },
          fail: (err) => {
            console.error("Failed to get token from storage:", err);
          }
        });
      } catch (error) {
        console.error("Error fetching question banks:", error);
      }
    };
    common_vendor.onMounted(() => {
      fetchQuestionBanks();
    });
    const startQuiz = (bank) => {
      const source = activeTab.value === "market" ? "market" : "quiz";
      const url = `/pages/quizQuestionPage/quizQuestionPage?bankId=${bank.id}&source=${source}`;
      console.log("Navigating to URL:", url);
      common_vendor.index.navigateTo({
        url
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
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.n($setup.activeTab === "market" ? "active" : ""),
    b: common_vendor.o(($event) => $setup.changeTab("market")),
    c: common_vendor.n($setup.activeTab === "quiz" ? "active" : ""),
    d: common_vendor.o(($event) => $setup.changeTab("quiz")),
    e: $setup.activeTab === "market"
  }, $setup.activeTab === "market" ? {
    f: common_vendor.f($setup.questionBanks, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.o(($event) => $setup.startQuiz(item), index),
        c: index
      };
    })
  } : {}, {
    g: $setup.activeTab === "quiz"
  }, $setup.activeTab === "quiz" ? {
    h: common_vendor.f($setup.questionBanks, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.o(($event) => $setup.startQuiz(item), index),
        c: index
      };
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-5c8092d9"]]);
wx.createPage(MiniProgramPage);
