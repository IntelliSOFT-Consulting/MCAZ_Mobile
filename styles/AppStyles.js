import { StyleSheet } from 'react-native';

export default AppStyles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    backgroundColor: '#F5FCFF',
  },
  boldText: {
    fontWeight: 'bold'
  },
  rowButtons: {
    flex: 1,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: "space-between"
  },
  columnButtons: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: "space-between"
  },

  button: {
    height: 40
  },
  tableHead: { height: 40, backgroundColor: '#f1f8ff' },
  tableHeadText: { marginLeft: 5, marginRight : 5 },
  listItem: { height: 44, padding: 10, fontSize: 18 }
})
