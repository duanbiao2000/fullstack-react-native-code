// 导入PropTypes用于定义组件的类型检查
import PropTypes from 'prop-types';

// 定义消息形状（structure），包括其可能的类型和必需的字段
// 此shape用于规范化消息的结构和数据类型，提高代码的健壮性和可维护性
export const MessageShape = PropTypes.shape({
  id: PropTypes.number.isRequired, // 消息的唯一标识符，必须是数字
  type: PropTypes.oneOf(['text', 'image', 'location']), // 消息的类型，可以是'text', 'image'或'location'
  text: PropTypes.string, // 对于文本类型的消息，这是消息的内容
  uri: PropTypes.string, // 对于图片类型的消息，这是图片的URI
  coordinate: PropTypes.shape({
    latitude: PropTypes.number.isRequired, // 对于位置类型的消息，这是纬度
    longitude: PropTypes.number.isRequired, // 对于位置类型的消息，这是经度
  }),
});

// 定义一个全局变量用于生成消息的唯一ID
let messageId = 0;

// 定义一个函数用于获取下一个消息ID
// 这是为了确保每个消息都有一个唯一的标识符
function getNextId() {
  messageId += 1;
  return messageId;
}

/**
 * 创建一个文本消息
 * @param {string} text - 文本消息的内容
 * @returns {Object} - 返回一个包含消息类型、ID和文本内容的对象
 */
export function createTextMessage(text) {
  return {
    type: 'text',
    id: getNextId(),
    text,
  };
}

/**
 * 创建一个图片消息
 * @param {string} uri - 图片的URI
 * @returns {Object} - 返回一个包含消息类型、ID和图片URI的对象
 */
export function createImageMessage(uri) {
  return {
    type: 'image',
    id: getNextId(),
    uri,
  };
}

/**
 * 创建一个位置消息
 * @param {Object} coordinate - 位置的经纬度
 * @param {number} coordinate.latitude - 位置的纬度
 * @param {number} coordinate.longitude - 位置的经度
 * @returns {Object} - 返回一个包含消息类型、ID和位置信息的对象
 */
export function createLocationMessage(coordinate) {
  return {
    type: 'location',
    id: getNextId(),
    coordinate,
  };
}