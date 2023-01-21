import * as React from "react";
import { View, Text } from "native-base";

export const AuthScene = ({ params }: { params: any }) => {
  const { serviceApi } = params;

  const [serviceUrl, setServiceUrl] = React.useState(serviceApi?.url);

  React.useEffect(() => {
    if (serviceApi?.url) {
      setServiceUrl(serviceApi?.url);
    }
  }, [serviceApi]);
  console.log("SERVICE API: ", serviceApi);

  return (
    <View>
      <Text>{serviceUrl}</Text>
    </View>
  );
};
