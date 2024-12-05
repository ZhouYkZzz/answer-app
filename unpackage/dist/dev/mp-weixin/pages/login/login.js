"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  setup() {
    const wechatLogin = () => {
      common_vendor.index.login({
        provider: "weixin",
        success: (loginRes) => {
          console.log("微信登录成功", loginRes);
          common_vendor.index.request({
            url: "http://116.62.5.195:8081/user/user/login",
            // 替换为你的后端登录接口
            method: "POST",
            data: {
              code: loginRes.code
            },
            success: (res) => {
              if (res.statusCode === 200) {
                const token = res.data.data;
                common_vendor.index.setStorage({
                  key: "userToken",
                  data: token,
                  success: () => {
                    common_vendor.index.showToast({
                      title: "登录成功",
                      icon: "success"
                    });
                    common_vendor.index.navigateTo({
                      url: "/pages/quizApp/quizApp"
                    });
                  },
                  fail: (error) => {
                    console.error("Token 保存失败", error);
                  }
                });
              } else {
                common_vendor.index.showToast({
                  title: "登录失败",
                  icon: "none"
                });
              }
            },
            fail: (error) => {
              console.error("登录接口请求失败", error);
              common_vendor.index.showToast({
                title: "请求失败，请稍后重试",
                icon: "none"
              });
            }
          });
        },
        fail: (error) => {
          console.error("微信登录失败", error);
          common_vendor.index.showToast({
            title: "微信登录失败，请稍后重试",
            icon: "none"
          });
        }
      });
    };
    return {
      wechatLogin
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $setup.wechatLogin && $setup.wechatLogin(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e4e4508d"]]);
wx.createPage(MiniProgramPage);
