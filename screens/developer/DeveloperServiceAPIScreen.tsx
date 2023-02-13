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

const { useEffect } = React;

export const DeveloperServiceAPIScreen = () => {
  const {
    service,
    status: serviceStatus,
    error: serviceError,
  } = useAppSelector((state: RootState) => state.serviceById);

  const { serviceApis, status, error } = useAppSelector(
    (state: RootState) => state.serviceApis,
  );

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (service?.id) {
      dispatch(getServiceApis({ serviceId: service.id }));
    }
  }, [service?.id]);

  return (
    <View h="full" w="100%" overflowY="auto" overflowX="hidden">
      <DrawerContainer>
        <DrawerScene
          name="General"
          component={GeneralScene}
          params={{ serviceApi: serviceApis[0] }}
        />
        <DrawerScene
          name="Authentication"
          component={AuthScene}
          params={{ service }}
        />
        <DrawerScene
          name="Triggers"
          component={TriggersScene}
          params={{ serviceApi: serviceApis[0] }}
        />
        <DrawerScene
          name="Actions"
          component={ActionsScene}
          params={{ serviceApi: serviceApis[0] }}
        />
      </DrawerContainer>
      {(status === 'loading' || serviceStatus === 'loading') && (
        <View>
          <Spinner size="lg" />
        </View>
      )}
    </View>
  );
};
