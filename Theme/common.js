import {StyleSheet, StatusBar} from 'react-native'

const styles = StyleSheet.create({
    flex1: {
        flex: 1
    },
    flex2: {
        flex: 2
    },
    pd10: {
        padding: 10
    },
    padVertical10:{
        paddingVertical: 10
    },
    pdHorizontal10: {
        paddingHorizontal: 10
    },
    mgVertical10:{
        marginVertical: 10
    },
    mgHorizontal10: {
        marginHorizontal: 10
    },
    pageContainer: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    headingText:{
        fontSize: 20,
        fontWeight:'bold',
        paddingVertical: 10
    },
    boxWebView:{
        height: 300
    },
    bgStyle: {
        width: '100%',
        height: '100%',
        flex: 1
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
    textInputContainer: {
        flexDirection: 'row',
        alignItems: 'space-between',
        borderColor: 'rgb(222,222,222)',
        borderBottomWidth: 1,
        paddingRight: 10,
        paddingBottom: 5
    },
    textInput: {
        height: 34,
        flex: 1,
        minHeight: '7%',
        marginTop: '5%',
        fontSize: 20,
        fontWeight: '500',
        color: 'white',
        paddingLeft: 10,
        border: 'none',
        outline: 'none'
    },
    buttonAdd: {
        marginBottom: 5
    },
    listScroll : {
        flex: 4,
        paddingHorizontal: 10
    },
    buttonStyle: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        width: 300,
        marginTop: 16,
    },
    taskWrapper: {
        flexDirection: 'row',
        borderColor: '#FFFFFF',
        borderBottomWidth: 1.5,
        width: '100%',
        alignItems: 'center',
        minHeight: 40,
        paddingVertical: 10
    },
    task: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
        wordBreak: 'break-word',
        wordWrap: 'break-word',
        width: '85%',
        paddingHorizontal: 10

    },
    verticalLine: {
        textDecoration: 'line-through',
        color: "green"
    },
    textHeader:{
        color: '#fff',
        marginTop: 80,
        textAlign: 'center'
    },
    googleMap:{
        width: '100%',
        height: 400
    },
    icLockRed: {
        width: 13 / 2,
        height: 9,
        position: 'absolute',
        top: 2,
        left: 1
    }
})

export default styles
