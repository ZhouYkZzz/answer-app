<template>
  <view class="container">
    <!-- Login Page Header -->
    <view class="header">
      <text class="title">登录</text>
    </view>

    <!-- Login Button -->
    <view class="login-content">
      <button class="login-btn" @click="wechatLogin">微信一键登录</button>
    </view>
  </view>
</template>

<script>
//import CONFIG from '@/config.js'; // 引入配置文件
export default {


  setup() {
    // Method to call WeChat one-click login API
    const wechatLogin = () => {
      uni.login({
        provider: 'weixin',
        success: (loginRes) => {
          console.log('微信登录成功', loginRes);
          uni.request({
            url: 'http://116.62.5.195:8081/user/user/login', // 替换为你的后端登录接口
            method: 'POST',
            data: {
              code: loginRes.code
            },
            success: (res) => {
              if (res.statusCode === 200) {
                const token = res.data.data;
                // Save the token using uni.setStorage to store it locally
                uni.setStorage({
                  key: 'userToken',
                  data: token,
                  success: () => {
                    uni.showToast({
                      title: '登录成功',
                      icon: 'success'
                    });
                    // Navigate to quizApp page after successful login
                    uni.navigateTo({
                      url: '/pages/quizApp/quizApp'
                    });
                  },
                  fail: (error) => {
                    console.error('Token 保存失败', error);
                  }
                });
              } else {
                uni.showToast({
                  title: '登录失败',
                  icon: 'none'
                });
              }
            },
            fail: (error) => {
              console.error('登录接口请求失败', error);
              uni.showToast({
                title: '请求失败，请稍后重试',
                icon: 'none'
              });
            }
          });
        },
        fail: (error) => {
          console.error('微信登录失败', error);
          uni.showToast({
            title: '微信登录失败，请稍后重试',
            icon: 'none'
          });
        }
      });
    };

    return {
      wechatLogin
    };
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.header {
  margin-bottom: 20px;
}

.title {
  font-size: 24px;
  font-weight: bold;
}

.login-content {
  margin-top: 50px;
}

.login-btn {
  background-color: #07c160;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 18px;
}
</style>
