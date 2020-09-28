export default {
  pages: [
    'pages/home/index',
    'pages/my/index',
    'pages/detail/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#333',
    selectedColor: '#007d37',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/home/index',
        text: 'home',
        iconPath: 'assets/home.png',
        selectedIconPath: 'assets/home_on.png'
      },
      {
        pagePath: 'pages/my/index',
        text: 'my',
        iconPath: 'assets/my.png',
        selectedIconPath: 'assets/my_on.png'
      }
    ]
  },
  usingComponents: {
    'van-loading': 'native/vant/loading/index'
  }
}
