import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { View, Text } from 'react-native';

export const Dropdown = () => {
  const [selectedValue, setSelectedValue] = useState(null);

  const placeholder = {
    label: 'Select an option...',
    value: null,
  };

  const options = [
    { label: 'Edit', value: 'edited' },
    { label: 'Delete', value: 'deleted' },
    // { label: 'Option 3', value: 'option3' },
  ];

  return (
    <View>
      <Text>Select:</Text>
      <RNPickerSelect
        placeholder={placeholder}
        items={options}
        onValueChange={(value) => setSelectedValue(value)}
        value={selectedValue}
      />
      {selectedValue && <Text>Selected: {selectedValue}</Text>}
    </View>
  );
};