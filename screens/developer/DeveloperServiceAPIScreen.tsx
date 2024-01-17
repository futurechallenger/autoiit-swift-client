import * as React from 'react';
import { View, Text, Spinner } from 'native-base';
import { DrawerContainer, DrawerScene } from '../../components/DrawerContainer';
import { RootState } from '../../redux/store';
import { GeneralScene } from './apiScenes/GeneralScene';
import { AuthScene } from './apiScenes/AuthScene';
import { TriggersScene } from './apiScenes/TriggersScene';
import { ActionsScene } from './actions/ActionsScene';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getServiceApis } from '../../redux/gql/getServiceApisSlice';
import type { ServiceApi } from '../../redux/types.generated';

const { useEffect, useState } = React;

export const DeveloperServiceAPIScreen = () => {
  const {
    service,
    status: serviceStatus,
    error: serviceError,
  } = useAppSelector((state: RootState) => state.serviceById);

  const { serviceApis, status, error } = useAppSelector((state: RootState) => state.serviceApis);
  const [serviceApi, setServiceApi] = useState<ServiceApi>();

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (service?.id) {
      dispatch(getServiceApis({ serviceId: service.id }));
    }
  }, [service?.id]);

  useEffect(() => {
    if (status === 'failed') {
      setServiceApi({});
    } else if (status === 'succeeded') {
      setServiceApi(serviceApis?.[0] ?? {});
    }
  }, [serviceApis, status]);

  return (
    <View h="full" w="100%" overflowY="auto" overflowX="hidden">
      <DrawerContainer>
        <DrawerScene name="General" component={GeneralScene} params={{ serviceApi }} />
        <DrawerScene name="Authentication" component={AuthScene} params={{ service }} />
        <DrawerScene name="Triggers" component={TriggersScene} params={{ serviceApi }} />
        <DrawerScene name="Actions" component={ActionsScene} params={{ serviceApi }} />
      </DrawerContainer>
      {(status === 'loading' || serviceStatus === 'loading') && (
        <View>
          <Spinner size="lg" />
        </View>
      )}
    </View>
  );
};
