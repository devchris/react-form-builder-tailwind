import React from 'react';
import { DragSource } from 'react-dnd';
import ItemTypes from '../ItemTypes';

const style = {
  // display: 'inline-block',
  // border: '1px dashed gray',
  // padding: '0.5rem 1rem',
  // backgroundColor: 'white',
  cursor: 'move',
};

const gripSource = {
  beginDrag(props) {
    const {
      data, index, onDestroy, setAsChild, getDataById,
    } = props;
    return {
      itemType: ItemTypes.BOX,
      index: data.parentId ? -1 : index,
      parentIndex: data.parentIndex,
      id: data.id,
      col: data.col,
      onDestroy,
      setAsChild,
      getDataById,
      data,
    };
  },
};

const Grip = ({ connectDragSource }) => connectDragSource(
  <div className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline is-isolated" style={style} ><i className="is-isolated fas fa-grip-vertical"></i></div>,
);

export default DragSource(
  ItemTypes.BOX,
  gripSource,
  (connect) => ({
    connectDragSource: connect.dragSource(),
  }),
)(Grip);
