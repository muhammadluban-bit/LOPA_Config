import { StyleSheet, ViewStyle, TextStyle} from 'react-native';

interface NamedStyles {
    container: ViewStyle;
    header: ViewStyle;
    navLinksContainer: ViewStyle;
    navLink: ViewStyle;
    navLinkText: TextStyle;
    box: ViewStyle;
    box1: ViewStyle;
    box2: ViewStyle;
    box3: ViewStyle;
}

export const smia = StyleSheet.create<NamedStyles>({
    container:{
        flex: 1,
    },
    header:{
        height: 80,
        borderBottomWidth: 8,
        borderColor: '#D4AF37',
        backgroundColor: '#083972',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 15,
        
    },
    navLinksContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 150,
        height: '100%',
    },
    navLink:{
        height:'100%',
        justifyContent: 'center',
        paddingHorizontal:12,
    },
    navLinkText:{
        color: '#ffffff',
        fontFamily: 'Segoe UI',
        fontSize: 16,
        letterSpacing: 0.3,
        fontWeight: 'bold',
    },
    box:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    box1:{
        flex: 1,
        backgroundColor: '#eeeeee'
    },
    box2:{
        flex: 2,
        backgroundColor: '#eaebeb'
    },
    box3:{
        flex: 1,
        backgroundColor: '#dadada'
    },

})