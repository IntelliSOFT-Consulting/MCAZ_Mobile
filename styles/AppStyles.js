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

  contactUsButtons: {
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

  saeButton: {
    color : "#841584"
  },

  button: {
    height: 40
  },
  tableHead: {
    height: 46, backgroundColor: '#f1f8ff',
  },
  tableHeaderView: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#2196F3',
    padding: 3
  },
  tableHeadText: { marginLeft: 5, marginRight : 5, color: '#000' },
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
    color: '#ffffff'
  },
  tabStyle: {
    width: 'auto',
    backgroundColor: '#2196F3'
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
  },
  adrBackground: {
    backgroundColor: '#71C7A0'
  },
  sadrBackground: {
    backgroundColor: '#7f7fff'
  },
  aefiBackground: {
    backgroundColor: '#FF92C9'
  },
  tableView: {
    marginTop: 5,
    marginBottom: 10
  },
  modal: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#f7021a',
      padding: 100
  },
  modalContainer : {
    justifyContent: 'center',
    padding: 20,
    margin: 10,
    backgroundColor: "#ffffff",
  },
  progressiveInput: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  listViewContainer: {
    flex: 0,
  },
  listView: {
    backgroundColor: 'white',
    margin: 10,
  },
  listItem: {
    padding: 10,
  },
  listItemSeparator: {
    borderWidth: 0.5,
    borderColor: 'lightgrey',
  },
  separator : {
    height: 1,
    width: "100%",
    backgroundColor: "#CED0CE"
  },
  rowItemStyle: {
    zIndex: 999,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
    opacity: 0.8,
    borderTopColor: 'lightgrey',
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1
  },
  text: {
    fontSize: 15,
    color: '#333333',
    fontWeight: 'normal',
    fontStyle: 'normal',
    paddingBottom: 5,
    textAlign: 'left',
  },
  formGroup: {
    marginBottom: 10,
  },
  rowFlex: {
    flexDirection: 'row',
  },
  textBold: {
    fontWeight: '700',
  }
})
