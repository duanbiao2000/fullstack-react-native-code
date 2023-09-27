/* eslint-disable global-require */

const images = {
  Clear: require('../assets/clear.png'),
  Hail: require('../assets/hail.png'),
  'Heavy Cloud': require('../assets/heavy-cloud.png'),
  'Light Cloud': require('../assets/light-cloud.png'),
  'Heavy Rain': require('../assets/heavy-rain.png'),
  'Light Rain': require('../assets/light-rain.png'),
  Showers: require('../assets/showers.png'),
  Sleet: require('../assets/sleet.png'),
  Snow: require('../assets/snow.png'),
  Thunder: require('../assets/thunder.png'),
};

export default weather => images[weather];

/*  不使用引号定义对象属性名是因为属性名如果是关键字或包含特殊字符,就需要用引号括起来。
例如:
- 'Heavy Cloud'中的Heavy Cloud包含空格,所以需要用引号
- 'Light Cloud'中的Light Cloud包含空格,所以需要用引号
而其他属性名如Clear、Hail等都是普通的字母单词,不包含关键字或特殊字符,所以不需要引号。
一般来说,需要用引号括起来的情况包括:
- 属性名包含空格
- 属性名是关键字,如class
- 属性名包含特殊字符如-
- 属性名不是有效的标识符
不使用引号的情况:
- 属性名是有效的标识符,如字母数字下划线组成
- 属性名不包含上述需要引号的情况
所以这个例子中,包含空格的'Heavy Cloud'和'Light Cloud'需要引号,其他如Clear、Hail都是有效标识符,所以不需要引号。
使用引号是为了保证对象属性名解析正确,避免因属性名格式问题导致错误。 */