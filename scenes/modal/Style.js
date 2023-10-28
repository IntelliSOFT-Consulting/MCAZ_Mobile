import { StyleSheet } from 'react-native';

export const Style = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    // alignItems: "center",
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, .01)',
  },
  footerButtonView: {
    // flexDirection: 'row-reverse',
  },
  footer: {
    justifyContent: 'space-between',
  },
  modalWindows: {
    width: window.width,
    height: window.height,
  }
});