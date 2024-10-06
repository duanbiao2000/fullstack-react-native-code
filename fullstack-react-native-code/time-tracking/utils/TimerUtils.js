import uuidv4 from 'uuid/v4';

export const millisecondsToHuman = ms => {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / 1000 / 60) % 60);
  const hours = Math.floor(ms / 1000 / 60 / 60);

  const humanized = [
    pad(hours.toString(), 2),
    pad(minutes.toString(), 2),
    pad(seconds.toString(), 2),
  ].join(':');

  return humanized;
};

const pad = (numberString, size) => {
  let padded = numberString;
  while (padded.length < size) {
    padded = `0${padded}`;
  }
  return padded;
};

/**
 * 创建一个新的计时器对象
 * 
 * @param {Object} attrs - 计时器的属性对象，可选，默认为空对象
 * @returns {Object} 返回一个计时器对象，包含标题、项目名、唯一ID、已流逝时间和运行状态
 * 
 * 此函数用于初始化一个计时器对象它接受一个可选的属性对象参数，
 * 并使用默认值来创建一个计时器对象该对象包括标题、项目名、唯一ID、
 * 已流逝时间和运行状态属性
 */
export const newTimer = (attrs = {}) => {
  // 创建一个计时器对象，使用提供的属性或默认值
  const timer = {
    title: attrs.title || 'Timer', // 计时器标题，如果没有提供则默认为'Timer'
    project: attrs.project || 'Project', // 项目名，如果没有提供则默认为'Project'
    id: uuidv4(), // 唯一ID，调用uuidv4函数生成
    elapsed: 0, // 已流逝时间，初始化为0
    isRunning: false, // 计时器运行状态，初始化为false表示未运行
  };

  // 返回创建的计时器对象
  return timer;
};
