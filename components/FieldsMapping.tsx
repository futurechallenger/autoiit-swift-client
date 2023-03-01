import * as React from 'react';
import { Input, Button, View, Text } from 'native-base';
import * as Types from '../redux/types.generated';

interface Props {
  exposeFields: Types.ExposeField[];
}

const { useState, useEffect } = React;

export const FieldsMapping: React.FunctionComponent<Props> = ({
  exposeFields,
}) => {
  const [fields, setFields] = useState<Types.ExposeField[]>();

  useEffect(() => {
    setFields(exposeFields);
  });

  const handleAdd = () => {
    console.log('Add element is clicked');
  };

  const handleOK = () => {
    console.log('OK is clicked');
  };

  return (
    <View>
      <View>
        <Text>Preview:</Text>
        <View></View>
      </View>
      <Button onPress={handleAdd}>Add</Button>
      <View>
        <Button onPress={handleOK}>OK</Button>{' '}
      </View>
    </View>
  );
};
