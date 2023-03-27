import * as React from 'react';
import { Button, VStack, Divider, View, Text, Radio, HStack, Box, Spinner } from 'native-base';
import { useIsFocused } from '@react-navigation/native';
import { ThemedTitle } from '../../../components/ThemedTitle';
import { StyleSheet } from 'react-native';
import { TextInputDesc } from '../../../components/TextInputDesc';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { getServiceAuth } from '../../../redux/gql/getServiceAuthBySlice';
import { addServiceAuth } from '../../../redux/gql/addServiceAuthSlice';
import { updateServiceAuth } from '../../../redux/gql/updateServiceAuthSlice';
import * as Types from '../../../redux/types.generated';

const { useState, useEffect } = React;

export const AuthScene = ({ params }: { params: any }) => {
  const { service } = params;
  const dispatch = useAppDispatch();
  const [currentServiceAuth, setCurrentServiceAuth] = useState<Types.ServiceAuth | undefined | null>();
  const { serviceAuth, status, error } = useAppSelector((state: RootState) => state.getServiceAuth);
  const {
    serviceAuth: updatedServiceAuth,
    status: updatedStatus,
    error: updatedError,
  } = useAppSelector((state: RootState) => state.updateServiceAuth);
  const {
    serviceAuth: addedServiceAuth,
    status: addedStatus,
    error: addedError,
  } = useAppSelector((state: RootState) => state.addServiceAuth);

  const [authUrl, setAuthUrl] = React.useState<Types.Maybe<string> | undefined>();

  const isFocused = useIsFocused();
  const [category, setCategory] = useState<Types.Maybe<string> | undefined>();
  // const [radioValue, setRadioValue] = useState('no-auth');
  const [clientId, setClientId] = useState<Types.Maybe<string> | undefined>();
  const [clientSecret, setClientSecret] = useState<Types.Maybe<string> | undefined>();
  const [tokenUrl, setTokenUrl] = useState<Types.Maybe<string> | undefined>();
  const [redirectUrl, setRedirectUrl] = useState<Types.Maybe<string> | undefined>();

  useEffect(() => {
    if (!service?.id) {
      return;
    }

    dispatch(getServiceAuth({ serviceId: service?.id }));
  }, [service?.id, addedServiceAuth, updatedServiceAuth]);

  // TODO: After creating / updating, getting `serviceAuth` again is not efficiency
  // TODO: Fix this later
  useEffect(() => {
    setCurrentServiceAuth(serviceAuth);

    setCategory((serviceAuth?.category ?? '') + '');
    setClientId(serviceAuth?.clientId ?? '');
    setClientSecret(serviceAuth?.clientSecret ?? '');
    setTokenUrl(serviceAuth?.tokenUrl ?? '');
    setRedirectUrl(serviceAuth?.redirectUrl ?? '');
    setAuthUrl(serviceAuth?.authorizationUrl ?? '');
  }, [serviceAuth, addedServiceAuth, updatedServiceAuth]);

  const handleClick = () => {
    if (!currentServiceAuth) {
      dispatch(
        addServiceAuth({
          auth: {
            authorizationUrl: authUrl,
            clientId,
            clientSecret,
            tokenUrl,
            redirectUrl,
            serviceId: service.id,
            category: parseInt(category ?? '0', 10),
          },
        }),
      );
    } else {
      // update service-auth
      dispatch(
        updateServiceAuth({
          auth: {
            id: serviceAuth?.id + '',
            authorizationUrl: authUrl,
            clientId,
            clientSecret,
            tokenUrl,
            redirectUrl,
            serviceId: service.id,
            category: parseInt(category ?? '0', 10),
          },
        }),
      );
    }
  };

  const renderAuthContent = () => {
    if (!category || category === '1') {
      return <Box style={{ height: '100%', width: '100%' }} />;
    } else {
      // auth-expires or auth-no-expires
      return (
        <View w="90%" marginRight="10">
          <TextInputDesc
            text="Client ID"
            value={clientId ?? ''}
            description=""
            marginTop={10}
            onTextChanged={(value) => {
              setClientId(value);
            }}
          />
          <TextInputDesc
            text="Client Secret"
            value={clientSecret ?? ''}
            description=""
            marginTop={10}
            onTextChanged={(value) => {
              setClientSecret(value);
            }}
          />
          <TextInputDesc
            text="Authorization URL"
            value={authUrl ?? ''}
            description="e.g. https://api.example.com/oauth2/authorize"
            marginTop={10}
            onTextChanged={(value) => {
              setAuthUrl(value);
            }}
          />
          <TextInputDesc
            text="Token URL"
            value={tokenUrl ?? ''}
            description="e.g. https://api.example.com/oauth2/token"
            marginTop={10}
            onTextChanged={(value) => {
              setTokenUrl(value);
            }}
          />
          <TextInputDesc
            text="Redirect url after authentication completes"
            value={redirectUrl ?? ''}
            description=""
            marginTop={10}
            onTextChanged={(value) => {
              setRedirectUrl(value);
            }}
          />
          <Divider />
          <Box alignSelf="flex-end" marginTop={15}>
            <Button w="90" onPress={handleClick}>
              Save
            </Button>
          </Box>
        </View>
      );
    }
  };

  return (
    <View style={styles.container} bg="amber.100">
      <ThemedTitle> Authentication</ThemedTitle>
      <Divider />
      <Radio.Group
        name="myRadioGroup"
        accessibilityLabel="favorite number"
        value={category}
        onChange={(nextValue) => {
          setCategory(nextValue);
        }}
      >
        <Radio value="1" my={1}>
          My API does not require user authentication
        </Radio>
        <Radio value="2" my={1}>
          My API has users with non-expiring OAuth2 access tokens
        </Radio>
        <Radio value="3" my={1}>
          My API has users with expiring OAuth2 access tokens and refresh tokens
        </Radio>
      </Radio.Group>
      {renderAuthContent()}
      {(status === 'loading' || updatedStatus === 'loading') && (
        <View zIndex={1000}>
          <Spinner size="lg" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});
