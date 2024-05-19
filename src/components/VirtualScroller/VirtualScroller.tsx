import { PropsWithChildren, JSX, UIEvent, useState, useEffect } from 'react';
import './VirtualScroller.css';
import { throttle } from 'lodash';

interface Settings {
  minIndex: number;
  maxIndex: number;
  startIndex: number;
  itemHeight: number;
  amount: number;
  tolerance: number;
}
interface Props<T> {
  getMoreData: (offset: number, limit: number) => T[];
  settings: Settings;
  row: (props: T) => JSX.Element;
}

interface State<T> extends Settings {
  viewportHeight: number;
  totalHeight: number;
  toleranceHeight: number;
  bufferHeight: number;
  bufferedItems: number;
  topPaddingHeight: number;
  bottomPaddingHeight: number;
  initialPosition: number;
  data: T[];
}

const setInitialState = <T extends unknown>(settings: Settings): State<T> => {
  const { minIndex, maxIndex, startIndex, itemHeight, amount, tolerance } =
    settings;
  // 1) height of the visible part of the viewport (px)
  const viewportHeight = amount * itemHeight;
  // 2) total height of rendered and virtualized items (px)
  const totalHeight = (maxIndex - minIndex + 1) * itemHeight;
  // 3) single viewport outlet height, filled with rendered but invisible rows (px)
  const toleranceHeight = tolerance * itemHeight;
  // 4) all rendered rows height, visible part + invisible outlets (px)
  const bufferHeight = viewportHeight + 2 * toleranceHeight;
  // 5) number of items to be rendered, buffered dataset length (pcs)
  const bufferedItems = amount + 2 * tolerance;
  // 6) how many items will be virtualized above (pcs)
  const itemsAbove = startIndex - tolerance - minIndex;
  // 7) initial height of the top padding element (px)
  const topPaddingHeight = itemsAbove * itemHeight;
  // 8) initial height of the bottom padding element (px)
  const bottomPaddingHeight = totalHeight - topPaddingHeight;
  // 9) initial scroll position (px)
  const initialPosition = topPaddingHeight + toleranceHeight;
  // initial state object
  return {
    ...settings,
    viewportHeight,
    totalHeight,
    toleranceHeight,
    bufferHeight,
    bufferedItems,
    topPaddingHeight,
    bottomPaddingHeight,
    initialPosition,
    data: [],
  };
};

const VirtualScroller = <T extends { id: number; text: string }>({
  getMoreData,
  settings,
  row,
}: PropsWithChildren<Props<T>>) => {
  const [state, setState] = useState<State<T>>(() => setInitialState(settings));
  // const viewportElement = useRef<HTMLDivElement>(null);
  const {
    viewportHeight,
    topPaddingHeight,
    bottomPaddingHeight,
    data,
    initialPosition,
    itemHeight,
    totalHeight,
  } = state;

  const runScroller = (e: UIEvent<HTMLDivElement, globalThis.UIEvent>) => {
    const { toleranceHeight, bufferedItems, minIndex } = state;
    const scrollTop =
      (e.target as Element).scrollTop < 100
        ? totalHeight
        : (e.target as Element).scrollTop;
    console.log('scrollTop', scrollTop);
    const index =
      minIndex + Math.floor((scrollTop - toleranceHeight) / itemHeight);
    const data = getMoreData(index, bufferedItems);
    const topPaddingHeight = Math.max((index - minIndex) * itemHeight, 0);
    const bottomPaddingHeight = Math.max(
      totalHeight - topPaddingHeight - data.length * itemHeight,
      0,
    );

    setState((prevState) => ({
      ...prevState,
      topPaddingHeight,
      bottomPaddingHeight,
      data,
    }));
  };

  useEffect(() => {
    // if (viewportElement.current) {
    //   viewportElement.current.scrollTop = initialPosition;
    // }
    runScroller({
      target: {
        scrollTop: totalHeight + itemHeight,
      },
    } as unknown as UIEvent<HTMLDivElement, globalThis.UIEvent>);
  }, []);

  // const scroll = (eventData: SwipeEventData) => {
  //   console.log(JSON.stringify(eventData, null, 2));
  //   // runScroller(eventData.deltaY);
  //   // const { dir, velocity } = eventData;
  //   // if (dir === 'Up') {
  //   //   setHours((prev) => prev + Math.round(velocity * 100));
  //   // } else {
  //   //   setHours((prev) => prev - Math.round(velocity * 100));
  //   // }
  // };
  //
  // const swipeHandlers = useSwipeable({
  //   onSwiping: scroll,
  //   // onSwipedDown: scroll,
  //   preventScrollOnSwipe: true,
  // });

  return (
    <div
      className="viewport"
      style={{
        height: viewportHeight,
      }}
      // ref={viewportElement}
      // onTouchMove={runScroller}
      onScroll={throttle(runScroller, 500)}
    >
      <div style={{ width: '40px', height: topPaddingHeight }}></div>
      {data.map((props) => row(props))}
      <div style={{ width: '40px', height: bottomPaddingHeight }}></div>
    </div>
  );
};

export default VirtualScroller;
