import hierarchyConv from '../src/client/algorithms/hierarchyConv'

describe('Convert state to hierarchy object', () => {
  let state;

  it('Convert primitive data type', ()=>{
    state = {
      counter: 0
    };
    expect(hierarchyConv(state)).toEqual(
      {
        name: 'state',
        children: [
          {
            name: 'counter',
            attributes: {
              value: 0
            }
          }
        ]
      }
    );
  });

  it('Convert empty array', ()=>{
    state = {
      counterArray: []
    };
    expect(hierarchyConv(state)).toEqual(
      {
        name: 'state',
        children: [
          {
            name: 'counterArray',
            attributes: {
              value: 'empty'
            }
          },
        ]
      }
    )
  });

  it('Convert array', ()=>{
    state = {
      counterArray: [1, 2, 3]
    };
    expect(hierarchyConv(state)).toEqual(
      {
        name: 'state',
        children: [
          {
            name: 'counterArray',
            children: [
              {
                name: '[0]',
                attributes: {
                  value: 1
                }
              },
              {
                name: '[1]',
                attributes: {
                  value: 2
                }
              },
              {
                name: '[2]',
                attributes: {
                  value: 3
                }
              }
            ]
          }
        ]
      }
    );
  });

  it('Convert nested array', ()=>{
    state = {
      counterArray: [[1,2,3], 2, [3,[4]]]
    };
    expect(hierarchyConv(state)).toEqual(
      {
        name: 'state',
        children: [
          {
            name: 'counterArray',
            children: [
              {
                name: '[0]',
                children: [
                  {
                    name: '[0]',
                    attributes: {
                      value: 1
                    }
                  },
                  {
                    name: '[1]',
                    attributes: {
                      value: 2
                    }
                  },
                  {
                    name: '[2]',
                    attributes: {
                      value: 3
                    }
                  }
                ],
              },
              {
                name: '[1]',
                attributes: {
                  value: 2
                }
              },
              {
                name: '[2]',
                children: [
                  {
                    name: '[0]',
                    attributes: {
                      value: 3
                    }
                  },
                  {
                    name: '[1]',
                    children: [
                      {
                        name: '[0]',
                        attributes: {
                          value: 4
                        }
                      } 
                    ],
                  },
                ],
              },              
            ]
          }
        ]
      }
    );
  });

  it('Convert empty object', () => {
    state = {
      counterObject : {}
    };
    expect(hierarchyConv(state)).toEqual(
      {
        name: 'state',
        children: [
          {
            name: 'counterObject',
            attributes: {
              value: 'empty'
            }
          }
        ]
      }
    )
  });

  it('Convert nested object', () => {
    state = {
      counterObject : {
        key1 : {
          childKey1: 'value1',
          childKey2: {
            grandChildKey1: 'value2'
          }
        },
        key2: 'value3'
      }
    };
    expect(hierarchyConv(state)).toEqual(
      {
        name: 'state',
        children: [
          {
            name: 'counterObject',
            children: [
              {
                name: 'key1',
                children: [
                  {
                    name: 'childKey1',
                    attributes: {
                      value: 'value1',
                    }
                  },
                  {
                    name: 'childKey2',
                    children: [
                      {
                        name: 'grandChildKey1',
                        attributes: {
                          value: 'value2',
                        }
                      }
                    ]
                  }
                ]
              },
              {
                name: 'key2',
                attributes: {
                  value: 'value3',
                }
              }
            ],
          }
        ]
      }
    )
  });




  it('Convert nested composite data types', () => {
    state = {
      counterObject : {
        key1 : [
          {
            childKey1: 'value1',
            childKey2: [1, {grandChildKey1: 'value2'}]
          }
        ],
        key2: {
          childKey1: 'value3',
          childKey2: [1,2,3]
        }
      }
    };
    expect(hierarchyConv(state)).toEqual(
      {
        name: 'state',
        children: [
          {
            name: 'counterObject',
            children: [
              {
                name: 'key1',
                children: [
                  {
                    name: '[0]',
                    children: [
                      {
                        name: 'childKey1',
                        attributes: {
                          value: 'value1'
                        }
                      },
                      {
                        name: 'childKey2',
                        children: [
                          {
                            name: '[0]',
                            attributes: {
                              value: 1
                            }
                          },
                          {
                            name: '[1]',
                            children: [
                              {
                                name: 'grandChildKey1',
                                attributes: {
                                  value: 'value2'
                                }
                              }
                            ]
                          }
                        ]
                      }
                     
                    ]
                  },
                ]
              },
              {
                name: 'key2',
                children: [
                  {
                    name: 'childKey1',
                    attributes: {
                      value: 'value3',
                    }
                  },
                  {
                    name: 'childKey2',
                    children: [
                      {
                        name: '[0]',
                        attributes: {
                          value: 1,
                        }
                      },
                      {
                        name: '[1]',
                        attributes: {
                          value: 2,
                        }
                      },
                      {
                        name: '[2]',
                        attributes: {
                          value: 3,
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    )
  });

});
