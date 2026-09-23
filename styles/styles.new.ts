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
    controls: ViewStyle;
    button: ViewStyle;
    buttonText: TextStyle;
    verticalScroll: ViewStyle;
    horizontalScroll: ViewStyle;
    scrollContent: ViewStyle;
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
        alignItems: 'flex-start',
        padding: 10,
    },
    box1:{
        flex: isMobile ? 3 : 1,
        backgroundColor: '#f5f2f2',
        justifyContent: 'center',
        boxShadow:[
            {
            offsetX: 0,
            offsetY: 8,            
            blurRadius: 10,
            spreadDistance: -6,    
            color: 'rgba(0, 0, 0, 0.1)',
            inset: true,           
            },
            {
            offsetX: 0,
            offsetY: -8,           
            blurRadius: 10,
            spreadDistance: -6,
            color: 'rgba(0, 0, 0, 0.1)',
            inset: true,           
            }
        ]
    },
    box2:{
        flex: 1,
        backgroundColor: '#f6f7f7',
        paddingVertical:10
    },
    controls: {
        position: "relative",
        alignSelf: "flex-end",
        flexDirection: "row",
        marginTop: 5,
        marginBottom: 10,
        zIndex: 100,
        gap: 8,
    },
    button: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderColor: "#cccccc",
        borderRadius: 4,
        elevation: 2,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    buttonText: {
        fontWeight: "bold",
        color: "#000000",
    },
    verticalScroll: {
        flex: 1,
        width: '100%',
        // @ts-ignore - Web compatibility safety block
        overflow: 'auto',
    },
    horizontalScroll: {
        // REMOVED flex: 1 to ensure grid content can push past bounds
        width: '100%',
        height: '100%',
        // @ts-ignore - Web compatibility safety block
        overflow: 'auto',
    },
    scrollContent: {
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
    },
})
