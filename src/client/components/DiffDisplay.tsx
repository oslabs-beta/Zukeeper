import React from 'react';
import useExtensionStore from '../store/useExtensionStore';
import { useStore } from 'zustand';
const diff = require('deep-diff').diff;
import { DiffItem } from './DiffItem';
import { diffProps } from '../../types';

export const DiffDisplay = () => {
  const { previousStates } = useStore(useExtensionStore);
  if (
    previousStates[previousStates.length - 2]
  ) {
    const differences = diff(
      previousStates[previousStates.length - 2],
      previousStates[previousStates.length - 1]
    );

    const diffItems = differences.map((obj: diffProps) => {
      return <DiffItem obj={obj}></DiffItem>;
    });

    return <div>{diffItems}</div>;
  } else return null;
};
