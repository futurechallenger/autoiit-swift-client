import * as React from 'react';
import { Button, View, Text, Divider, VStack, Radio, Input, InputGroup, InputLeftAddon, HStack } from 'native-base';
import { InputTitle, ThemedTitle } from '../../../components/ThemedTitle';
import { TextInputDesc } from '../../../components/TextInputDesc';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { ThemedSpinner } from '../../../components/ThemedSpinner';
import { ThemedAlert } from '../../../components/ThemedAlert';
import { getServiceTriggers } from '../../../redux/gql/getTriggersSlice';
import { addServiceAction, resetStatus } from '../../../redux/gql/addActionSlice';
import { getServiceActions } from '../../../redux/gql/getActionsSlice';

const { useState, useEffect } = React;

interface Props {
  params: any;
}

export const CreateActionScene: React.FunctionComponent<Props> = ({ params }) => {
  const { serviceApi, setScene } = params ?? {};
  const [refreshed, setRefreshed] = useState(false);
  const [actionName, setActionName] = useState<string | undefined>();
  const [description, setDescription] = useState<string | undefined>();
  const [endpoint, setEndpoint] = useState('api');
  const [endpointPath, setEndpointPath] = useState<string | undefined>();

  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const route = useRoute();

  const dispatch = useAppDispatch();
  const { action, status, error } = useAppSelector((state: RootState) => state.addServiceAction);

  useEffect(() => {
    if (isFocused && !refreshed) {
      setRefreshed(true);
    }
  }, [isFocused]);

  useEffect(() => {
    if (status === 'succeeded' && serviceApi?.serviceId) {
      dispatch(resetStatus());
      navigation.goBack();
      dispatch(getServiceActions({ serviceId: serviceApi?.serviceId }));
    }
  }, [status, serviceApi?.serviceId]);

  const handleClick = () => {
    dispatch(
      addServiceAction({
        action: {
          name: actionName,
          description,
          endpointPath,
          serviceApiId: serviceApi?.id,
        },
      }),
    );
  };

  const handleInput = (input: string) => {
    setEndpointPath(input);
  };

  return (
    <View bg="green.50" h="full" marginRight={20}>
      <ThemedTitle>Create a new action</ThemedTitle>

      <Divider />
      <TextInputDesc
        marginTop={10}
        subTitle="Name"
        text=""
        value={actionName}
        placeholder=""
        description="Use sentence case capitalization — no period"
        onTextChanged={(value) => setActionName(value)}
      />
      <TextInputDesc
        marginTop={10}
        subTitle="Description"
        text=""
        value={description}
        placeholder=""
        description="Must be a complete sentence starting with “This trigger fires” and ending with a period"
        onTextChanged={(value) => setDescription(value)}
      />
      <InputTitle>Endpoint</InputTitle>

      <InputGroup>
        <InputLeftAddon children={'.../autoiit/v1/actions/'} />
        <Input value={endpointPath} onChangeText={handleInput} />
      </InputGroup>
      <Text>Must written in snake_case</Text>

      <Divider />
      <HStack justifyContent="flex-end">
        <Button onPress={handleClick}>Save</Button>
      </HStack>
      {status === 'loading' && <ThemedSpinner />}
      {error && <ThemedAlert status="error" text={error ?? 'Something wrong, please try again later'} />}
    </View>
  );
};
