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
    justifyContent: "space-between",
    marginTop: 8
  },

  button: {
    height: 40
  },
  tableHead: { height: 40, backgroundColor: '#f1f8ff' },
  tableHeadText: { marginLeft: 5, marginRight : 5 },
  listItem: { height: 44, padding: 10, fontSize: 18 },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247, 247, 147, 1.0)'
  },
  sectionListContainer: {
    flex: 1,
    paddingLeft: 0,
    paddingRight: 0,
    marginTop: 10,
    marginBottom: 10,
  },
  tabbar: {
    backgroundColor: '#ffffff',
  },
  tablabelStyle: {
    color: '#000000'
  },
  headerText : {
    fontSize: 30,
    textAlign: 'center',
  },
  subHeaderText : {
    fontSize: 15,
    textAlign: 'center',
  },
  required: {
    color: 'red'
  },
  dateTimeInput: {
    flex: 1,
    marginTop: 5,
    marginBottom: 10
  }
})
