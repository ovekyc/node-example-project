import React from 'react';
import { shallow, mount, render } from 'enzyme';
import renderer from 'react-test-renderer';
import Home from '../../../front/components/home';

it('snapshot test', ()=> {
  const tree = renderer.create(<Home />).toJSON();
  expect(tree).toMatchSnapshot();
});

describe('<Home />', () => {
  it('should render without throwing an error', () => {
    expect(shallow(<Home />)
      .contains(
        <div className="home">
          <h1>Hello world!</h1>
        </div>))
      .toBe(true);
  });

  it('should be selectable by class "home"', () => {
    expect(shallow(<Home />)
      .is('.home'))
      .toBe(true);
  });

  it('should mount in a full DOM', function() {
    expect(mount(<Home />).find('.home').length)
      .toBe(1);
  });

  it('should render to static HTML', function() {
    expect(render(<Home />).text())
      .toEqual('Hello world!');
  });
});
