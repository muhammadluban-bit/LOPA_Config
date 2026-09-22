import { StyleSheet, ViewStyle, TextStyle} from 'react-native';

interface NamedStyles {
    container: ViewStyle;
    header: ViewStyle;
    navLinksContainer: ViewStyle;
    logoPlaceholder: ViewStyle;
    navLink: ViewStyle;
    navLinkText: TextStyle;
    box: ViewStyle;
    box1: ViewStyle;
    box2: ViewStyle;
    grid: ViewStyle;
}

export const smia = (isMobile: boolean) => StyleSheet.create<NamedStyles>({
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
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '100%',
    },

    logoPlaceholder:{
        height: '100%',
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: '10%',
    },
    navLink:{
        height:'100%',
        justifyContent: 'center',
        paddingHorizontal:10,
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
        flex: isMobile ? 3 : 1,
        backgroundColor: '#f5f2f2',

        boxShadow:[
            {
            offsetX: 0,
            offsetY: 8,            // Pushes shadow downward from the top edge
            blurRadius: 10,
            spreadDistance: -6,    // Optional: tightens the horizontal spill
            color: 'rgba(0, 0, 0, 0.1)',
            inset: true,           // Makes it an inner shadow
            },
            {
            offsetX: 0,
            offsetY: -8,           // Pushes shadow upward from the bottom edge
            blurRadius: 10,
            spreadDistance: -6,
            color: 'rgba(0, 0, 0, 0.1)',
            inset: true,           // Makes it an inner shadow
            }
        ]
    },
    box2:{
        flex: 1,
        backgroundColor: '#f6f7f7',
        paddingVertical:10
    },

    grid:{
        flex:1,
        borderColor: '#7f84b4',
        borderWidth: 2,

    }

})