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
import { PublishedFlowScene } from './flows/PublishedFlowScene';
import { ArchivedFlowScene } from './flows/ArchivedFlowScene';
import { getAutoFlowsByService } from '../../redux/gql/getAutoFlowsSlice';
import * as Types from '../../redux/types.generated';

const { useEffect, useState } = React;

export const DeveloperFlowScreen = () => {
  const { service, status, error } = useAppSelector(
    (state: RootState) => state.serviceById,
  );

  const [published, setPublished] = useState<(Types.AutoFlow | undefined)[]>(
    [],
  );
  const [archived, setArchived] = useState<(Types.AutoFlow | undefined)[]>([]);

  const dispatch = useAppDispatch();
  const {
    autoFlows,
    status: flowStatus,
    error: flowError,
  } = useAppSelector((state: RootState) => state.autoFlowsByService);

  useEffect(() => {
    if (!service?.id) {
      return;
    }

    dispatch(getAutoFlowsByService({ serviceId: service?.id }));
  }, [service]);

  useEffect(() => {
    if (!autoFlows || autoFlows.length <= 0) return;

    setPublished(autoFlows.map((fl) => (fl?.published === 1 ? fl : undefined)));
    setArchived(autoFlows.map((fl) => (fl?.published === 0 ? fl : undefined)));
  }, [autoFlows]);

  return (
    <View h="full" w="100%" overflowY="auto" overflowX="hidden">
      <DrawerContainer>
        <DrawerScene
          name="Published"
          component={PublishedFlowScene}
          params={{ service, published }}
        />
        {/* <DrawerScene
          name="Suggested"
          component={AuthScene}
          params={{ service }}
        />
        <DrawerScene
          name="Private"
          component={TriggersScene}
          params={{ serviceApi: serviceApis[0] }}
        /> */}
        <DrawerScene
          name="Archived"
          component={ArchivedFlowScene}
          params={{ service, archived }}
        />
      </DrawerContainer>
      {status === 'loading' ||
        (flowStatus === 'loading' && (
          <View>
            <Spinner size="lg" />
          </View>
        ))}
    </View>
  );
};
