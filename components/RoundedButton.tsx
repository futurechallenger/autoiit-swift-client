import { Button } from 'react-native';

export function RoundedButton(props: any) {
  return (
    <Button className="rounded-full bg-blue-500 text-white px-4 py-2" {...props} title={props.children} />
  );
}
