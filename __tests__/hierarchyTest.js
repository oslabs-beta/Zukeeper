import hierarchyConv from '../src/client/algorithms/hierarchyConv'

describe('Convert state to hierarchy object', () => {

  beforeEach(() => {
		state = {
      counter: 0,
    }
	});

  it('Convert primitive data type', ()=>{
    expect(hierarchyConv(state)).toEqual(
      {
        name: 'state',
        children: [
          {
            name: counter,
            attribute: {
              value: 0
            }
          }
        ]
      }
    );
  });
});
