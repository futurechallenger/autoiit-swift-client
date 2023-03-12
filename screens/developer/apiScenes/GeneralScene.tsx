import { Box, Button, Divider, Spinner, View, VStack } from 'native-base';
import * as React from 'react';
import { StyleSheet } from 'react-native';

import { TextInputDesc } from '../../../components/TextInputDesc';
import { ThemedTitle } from '../../../components/ThemedTitle';
import { getServiceApis } from '../../../redux/gql/getServiceApisSlice';
import { updateServiceApi } from '../../../redux/gql/updateServiceApiSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { Maybe, Scalars } from '../../../redux/types.generated';

import type { RootState } from '../../../redux/store';
const { useState, useEffect } = React;

export const GeneralScene = ({ params }: { params: any }) => {
  const { serviceApi } = params ?? {};
  const [currentServiceApi, setCurrentServiceApi] = useState();

  const dispatch = useAppDispatch();

  const {
    serviceApi: updatedRet,
    status: updatedStatus,
    error: updatedError,
  } = useAppSelector((state: RootState) => state.updateServiceApi);
  const [apiUrl, setApiUrl] = useState<Maybe<string> | undefined>(serviceApi?.url);
  const [desc, setDesc] = useState<Maybe<string> | undefined>(serviceApi?.description);

  useEffect(() => {
    setCurrentServiceApi(serviceApi);

    setDesc(serviceApi?.description ?? '');
    setApiUrl(serviceApi?.url ?? '');
  }, [serviceApi]);

  useEffect(() => {
    if (!updatedRet) {
      return;
    }

    setCurrentServiceApi(updatedRet);

    setDesc(updatedRet?.description ?? '');
    setApiUrl(updatedRet?.url ?? '');
  }, [updatedRet]);

  const handleClick = () => {
    dispatch(
      updateServiceApi({
        serviceApi: {
          id: serviceApi?.id as Scalars['Int'],
          serviceId: serviceApi?.serviceId as Scalars['Int'],
          url: apiUrl,
          description: desc,
        },
      }),
    );
  };

  return (
    <View width="100%">
      <ThemedTitle>General</ThemedTitle>
      <Divider marginTop={15} />
      <VStack>
        <TextInputDesc
          marginTop={10}
          text="API URL"
          value={apiUrl ?? ''}
          numberOfLines={1}
          description="If you do not have a single server, you don't need fill in this."
          onTextChanged={(url: string | undefined) => {
            setApiUrl(url ?? '');
          }}
        />
        <TextInputDesc
          marginTop={10}
          text="Description"
          value={desc ?? ''}
          numberOfLines={4}
          description="A 3-4 sentence description of your service"
          onTextChanged={(description: string | undefined) => {
            setDesc(description ?? '');
          }}
        />
        <Divider marginTop={15} />
        <Box alignSelf="flex-end" marginTop={15}>
          <Button style={styles.button} onPress={handleClick}>
            Save
          </Button>
        </Box>
      </VStack>
      {(status === 'loading' || updatedStatus === 'loading') && <Spinner size="lg" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  button: {
    width: 90,
  },
});
