import { StyleSheet } from 'react-native';
import { NativeBaseProvider } from 'native-base';

import { customTheme } from './Theme';

export default function App() {
  return (
    <NativeBaseProvider theme={customTheme}>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});