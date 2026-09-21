import { CurrentRenderContext } from 'expo-router/build/react-navigation';
import { StyleSheet} from 'react-native';

export const smia = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#a5ecf8',
        minHeight: 50
    },
    header:{
        height: 60,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        
        backgroundColor: '#083972',
    },
    headerText:{
        color: '#ffffff',
        fontSize: 18,
        padding: 30,
        fontWeight: 'bold'
    },


    box:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    box1:{
        flex: 1,
        backgroundColor: '#f05050'
    },
    box2:{
        flex: 2,
        backgroundColor: '#50ddf0'
    },
    box3:{
        flex: 1,
        backgroundColor: '#f050db'
    },

})