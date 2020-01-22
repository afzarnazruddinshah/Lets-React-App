import React from 'react';
import renderer from 'react-test-renderer';
import DropDown from '../components/DropDown/dropdown';
import { genderDDOptions } from '../components/ConstDataRepo/constants';

test('Link changes the class when hovered', () => {
  const component = renderer.create(
      <DropDown
        label="Gender"
        name="gender"
        value="male"
        options={genderDDOptions}
        onChange={ (key, value)=> {console.log(key, value); }} 
        />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});