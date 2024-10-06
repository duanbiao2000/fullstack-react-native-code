// 导入必要的组件和工具库
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

// 导入与拼图相关的工具函数和组件
import { move, movableSquares, isSolved } from '../utils/puzzle';
import Board from '../components/Board';
import Button from '../components/Button';
import PuzzlePropType from '../validators/PuzzlePropType';
import Preview from '../components/Preview';
import Stats from '../components/Stats';
import configureTransition from '../utils/configureTransition';

// 定义状态常量，用于管理游戏的过渡状态
const State = {
  LoadingImage: 'LoadingImage',
  WillTransitionIn: 'WillTransitionIn',
  RequestTransitionOut: 'RequestTransitionOut',
  WillTransitionOut: 'WillTransitionOut',
};

// 导出默认类 Game，代表一个游戏会话
export default class Game extends React.Component {
  // 定义 Game 的属性类型
  static propTypes = {
    puzzle: PuzzlePropType.isRequired,
    image: Image.propTypes.source,
    onChange: PropTypes.func.isRequired,
    onQuit: PropTypes.func.isRequired,
  };

  // 设置 Game 的默认属性
  static defaultProps = {
    image: null,
  };

  // 构造函数，初始化游戏状态
  constructor(props) {
    super(props);

    const { image } = props;

    this.state = {
      transitionState: image ? State.WillTransitionIn : State.LoadingImage,
      moves: 0,
      elapsed: 0,
      previousMove: null,
      image: null,
    };

    configureTransition();
  }

  // 当组件接收到新属性时触发
  componentWillReceiveProps(nextProps) {
    const { image } = nextProps;
    const { transitionState } = this.state;

    if (image && transitionState === State.LoadingImage) {
      configureTransition(() => {
        this.setState({ transitionState: State.WillTransitionIn });
      });
    }
  }

  // 处理拼图板过渡进入时的逻辑
  handleBoardTransitionIn = () => {
    this.intervalId = setInterval(() => {
      const { elapsed } = this.state;

      this.setState({ elapsed: elapsed + 1 });
    }, 1000);
  };

  // 处理拼图板过渡退出时的逻辑
  handleBoardTransitionOut = async () => {
    const { onQuit } = this.props;

    await configureTransition(() => {
      this.setState({ transitionState: State.WillTransitionOut });
    });

    onQuit();
  };

  // 请求退出游戏的逻辑
  requestTransitionOut = () => {
    clearInterval(this.intervalId);

    this.setState({ transitionState: State.RequestTransitionOut });
  };

  // 处理用户点击退出按钮时的逻辑
  handlePressQuit = () => {
    Alert.alert(
      'Quit',
      'Do you want to quit and lose progress on this puzzle?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Quit',
          style: 'destructive',
          onPress: this.requestTransitionOut,
        },
      ],
    );
  };

  // 处理用户点击拼图块时的逻辑
  handlePressSquare = square => {
    const { puzzle, onChange } = this.props;
    const { moves } = this.state;

    if (!movableSquares(puzzle).includes(square)) return;

    const updated = move(puzzle, square);

    this.setState({ moves: moves + 1, previousMove: square });

    onChange(updated);

    if (isSolved(updated)) {
      this.requestTransitionOut();
    }
  };

  // 渲染游戏界面
  render() {
    // 解构出所需的props和state
    const { puzzle, puzzle: { size }, image } = this.props;
    const { transitionState, moves, elapsed, previousMove } = this.state;

    // 根据transitionState决定是否渲染组件
    return (
      transitionState !== State.WillTransitionOut && (
        <View style={styles.container}>
          {transitionState === State.LoadingImage && (
            <ActivityIndicator size={'large'} color={'rgba(255,255,255,0.5)'} />
          )}
          {transitionState !== State.LoadingImage && (
            <View style={styles.centered}>
              <View style={styles.header}>
                <Preview image={image} boardSize={size} />
                <Stats moves={moves} time={elapsed} />
              </View>
              <Board
                // 传递谜题数据给棋盘
                puzzle={puzzle}
                // 传递图像数据给棋盘
                image={image}
                // 传递上一步移动的信息给棋盘
                previousMove={previousMove}
                // 根据过渡状态决定是否拆解棋盘
                teardown={transitionState === State.RequestTransitionOut}
                // 当棋盘上的方块被点击时触发移动方块的处理函数
                onMoveSquare={this.handlePressSquare}
                // 当棋盘过渡出去时触发处理函数
                onTransitionOut={this.handleBoardTransitionOut}
                // 当棋盘过渡进来时触发处理函数
                onTransitionIn={this.handleBoardTransitionIn}
              />
              <Button title={'Quit'} onPress={this.handlePressQuit} />
            </View>
          )}
        </View>
      )
    );
  }
}

// 定义样式
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 16,
    alignSelf: 'stretch',
  },
});
