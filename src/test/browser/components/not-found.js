import React from 'react';
import renderer from 'react-test-renderer';
import NotFound from '../../../front/components/not-found';

it('renders correctly', ()=> {
  const tree = renderer.create(<NotFound />).toJSON();
  expect(tree).toMatchSnapshot();
});
