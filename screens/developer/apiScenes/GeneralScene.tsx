import * as React from "react";
import { StyleSheet } from "react-native";
import {
  Spinner,
  VStack,
  Box,
  Button,
  Input,
  Pressable,
  View,
  Text,
  Divider,
} from "native-base";
import { TextInputDesc } from "../../../components/TextInputDesc";
import { ThemedTitle } from "../../../components/ThemedTitle";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import type { RootState } from "../../../redux/store";
import { updateService } from "../../../redux/gql/updateServiceSlice";
import { InputMaybe, Maybe, Scalars } from "../../../redux/types.generated";
import { getServiceApis } from "../../../redux/gql/getServiceApisSlice";
import { updateServiceApi } from "../../../redux/gql/updateServiceApiSlice";

const { useState, useEffect } = React;

export const GeneralScene = ({ params }: { params: any }) => {
  const { serviceApi } = params ?? {};

  const {
    serviceApis: serviceApiInfoList,
    status,
    error,
  } = useAppSelector((state: RootState) => state.serviceApis);
  const {
    serviceApi: updateRet,
    status: updateStatus,
    error: updateError,
  } = useAppSelector((state: RootState) => state.updateServiceApi);
  const [apiUrl, setApiUrl] = useState<Maybe<string> | undefined>(
    serviceApiInfoList?.[0]?.url
  );
  const [desc, setDesc] = useState<Maybe<string> | undefined>(
    serviceApiInfoList?.[0]?.description
  );

  const dispatch = useAppDispatch();
  // const {
  //   service: newService,
  //   status,
  //   error,
  // } = useAppSelector((state: RootState) => state.updateService);

  useEffect(() => {
    if (!serviceApi?.serviceId) {
      return;
    }

    dispatch(getServiceApis({ serviceId: serviceApi?.serviceId }));
  }, [serviceApi?.serviceId]);

  useEffect(() => {
    if (!serviceApiInfoList?.[0]?.id) {
      return;
    }

    setDesc(serviceApiInfoList?.[0]?.description);
    setApiUrl(serviceApiInfoList?.[0]?.url);
  }, [serviceApiInfoList]);

  const handleClick = () => {
    dispatch(
      updateServiceApi({
        serviceApi: {
          id: serviceApiInfoList?.[0]?.id as Scalars["Int"],
          serviceId: serviceApiInfoList?.[0]?.serviceId as Scalars["Int"],
          url: apiUrl,
          description: desc,
        },
      })
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
          value={apiUrl ?? ""}
          numberOfLines={1}
          description="If you do not have a single server, you don't need fill in this."
          onTextChanged={(url: string | undefined) => {
            setApiUrl(url ?? "");
          }}
        />
        <TextInputDesc
          marginTop={10}
          text="Description"
          value={desc ?? ""}
          numberOfLines={4}
          description="A 3-4 sentence description of your service"
          onTextChanged={(description: string | undefined) => {
            setDesc(description ?? "");
          }}
        />
        <Divider marginTop={15} />
        <Box alignSelf="flex-end" marginTop={15}>
          <Button style={styles.button} onPress={handleClick}>
            Save
          </Button>
        </Box>
      </VStack>
      {(status === "loading" || updateStatus === "loading") && (
        <Spinner size="lg" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  button: {
    width: 90,
  },
});
