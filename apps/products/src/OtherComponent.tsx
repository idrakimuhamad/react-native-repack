import {Text, View} from 'react-native';

export default function OtherComponent({title}: {title: string}) {
  return (
    <View>
      <Text>Other component from Products app. {title}</Text>
    </View>
  );
}
