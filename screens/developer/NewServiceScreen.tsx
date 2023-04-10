import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Box, Button, View, Text, Divider, VStack, HStack, Spinner } from 'native-base';
import { TextInputDesc } from '../../components/TextInputDesc';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { addService } from '../../redux/gql/addServiceSlice';
import { RootState } from '../../redux/store';
import Navigation from '../../navigation';
import { useNavigation } from '@react-navigation/native';

const { useState, useEffect } = React;

export const NewServiceScreen = () => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [serviceCode, setServiceCode] = useState('');

  const navigation = useNavigation();

  const dispatch = useAppDispatch();
  const { serviceId, error, status } = useAppSelector((state: RootState) => state.addService);

  useEffect(() => {
    if (status === 'succeeded') {
      navigation.navigate('Developers', { serviceId });
    }
  }, [status]);

  const handleCancel = () => {};

  const handleClick = () => {
    dispatch(addService({ name, description: desc, serviceCode }));
  };

  return (
    <View style={styles.container}>
      <VStack style={styles.content}>
        <Text fontWeight="bold" fontSize="5xl">
          Create a new service
        </Text>

        <Divider style={styles.divider} />
        <TextInputDesc
          marginTop={20}
          text="Service name"
          value={name}
          numberOfLines={1}
          value={name}
          description="Your product name or service name"
          onTextChanged={(serviceName: string | undefined) => {
            setName(serviceName ?? '');
          }}
        />
        <TextInputDesc
          marginTop={20}
          text="Autoiit service code"
          value={serviceCode}
          numberOfLines={1}
          description="A short, unique code for your service URLs"
          onTextChanged={(serviceCode: string | undefined) => {
            setServiceCode(serviceCode ?? '');
          }}
        />
        <TextInputDesc
          marginTop={20}
          text="Description"
          value={desc}
          numberOfLines={4}
          description="A 3-4 sentence description of your service"
          onTextChanged={(description: string | undefined) => {
            setDesc(description ?? '');
          }}
        />

        <Divider style={styles.divider} />
        <Box alignSelf="flex-end" marginTop={15}>
          <HStack>
            <Button style={styles.button} onPress={handleCancel}>
              Cancel
            </Button>
            <Button style={styles.button} onPress={handleClick}>
              Save
            </Button>
          </HStack>
        </Box>
        {status === 'loading' && (
          <Box style={styles.spinner}>
            <Spinner size="lg" />
          </Box>
        )}
      </VStack>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    padding: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  content: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 90,
    marginRight: 20,
  },
  spinner: {
    alignSelf: 'center',
  },
  divider: {
    marginVertical: 30,
  },
});
