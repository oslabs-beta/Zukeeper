import React from 'react';
import Tree from 'react-d3-tree';
import useExtensionStore from '../store/useExtensionStore';
import { useStore } from 'zustand';

export const TreeDisplay = () => {

  const { previousStates } = useStore(useExtensionStore);

  const currentState = (previousStates[previousStates.length - 1] ? previousStates[previousStates.length - 1] : {name: 'State'});


  const stateHeirarchy = {
    name: 'CEO',
    children: [
      {
        name: 'Manager',
        attributes: {
          department: 'Production',
        },
        children: [
          {
            name: 'Foreman',
            attributes: {
              department: 'Fabrication',
            },
            children: [
              {
                name: 'Worker',
              },
            ],
          },
          {
            name: 'Foreman',
            attributes: {
              department: 'Assembly',
            },
            children: [
              {
                name: 'Worker',
              },
            ],
          },
        ],
      },
    ],
  };
  
  return (
    <div id="treeWrapper" style={{ width: '100vw', height: '100vh' }}>
      <Tree data={stateHeirarchy} />
    </div>
  );
};
