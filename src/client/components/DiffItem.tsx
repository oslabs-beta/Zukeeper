import React from 'react';
import { diffProps } from '../../types'
import useExtensionStore from '../store/useExtensionStore';
import { useStore } from 'zustand';

export const DiffItem = (props: diffProps) => {
  const { previousStates } = useStore(useExtensionStore);

    let path = '';
  for (let element of props.obj.path){
    if (typeof element === 'string'){
      path += `${element}.`
    }
  }
  path = path.slice(0, -1);

  let item;
  if (props.obj.kind === 'E'){
    item =  <div>{path}: {props.obj.lhs} {'=>'} {props.obj.rhs}</div>
  } else if (props.obj.kind === 'N'){
    item =  <div>newly added {props.obj.rhs}</div>
  } else if (props.obj.kind === 'D') {
    item =  <div>deleted {props.obj.lhs}</div>
  } else if (props.obj.kind === 'A'){
      if(props.obj.item.kind === 'D'){
        item = <div>
          <div>{path}: </div>
          <div>+ Deleted array element {props.obj.item.lhs} at index {props.obj.index}</div>
        </div>
      } else if (props.obj.item.kind === 'N'){
        item = <div>
          <div>{path}: </div>
          <div>+ Added array element {props.obj.item.rhs} at index {props.obj.index}</div>
          <div>+ {JSON.stringify(previousStates[previousStates.length - 2][props.obj.path]).replaceAll(/,/g, ', ').replaceAll(/:/g, ': ')} {'=>'} {JSON.stringify(previousStates[previousStates.length - 1][props.obj.path]).replaceAll(/,/g, ', ').replaceAll(/:/g, ': ')}</div>
        </div>
      } 
  }

  return (
    <>{item}</>
  );
};