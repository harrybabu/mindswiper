
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';

var SearchPage = require('./SearchPage');


import Popup from 'react-native-popup';

var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

class Home extends Component{

    constructor(props) {
        super(props);
        this.onPressHandle = this.onPressHandle.bind(this);
        this.onPlay = this.onPlay.bind(this);
    }

    onPlay() {
      this.props.navigator.push({
        title: 'Play',
        component: SearchPage
      });
    }

    onPressHandle() {
        // alert
        this.popup.alert("Happy shopping time !!\n\n1. You're shown images for brands, products and attributes. Swipe right if interested, else swipe left. \n\n2. Once you've made enough right swipes, you can go to the shopping section and view curated products. \n\n3. From shopping section, you can continue playing for better accuracy. \n\n4. You can always start the game again for fresh profile. ");
    }

    render() {
        return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.mark} source={{uri: 'http://res.cloudinary.com/harrybabu/image/upload/v1460859921/myn_tmlu5r.png'}} />
            </View>
            <TouchableHighlight onPress={this.onPlay}>
                <View style={styles.search}>
                    <Text style={styles.whiteFont}>Play the Game</Text>
                </View>
            </TouchableHighlight>
            <Text style={styles.help} onPress={this.onPressHandle}>How it Works!!!</Text>
            <Popup ref={(popup) => { this.popup = popup }}/>
        </View>
        );
    }
};

var styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      flex: 1,
      backgroundColor: 'transparent'
    },
    bg: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: windowSize.width,
        height: windowSize.height
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: .5,
        backgroundColor: 'transparent'
    },
    mark: {
        width: 150,
        height: 150
    },
    search: {
        backgroundColor: '#F26722',
        padding: 20,
        alignItems: 'center',
        marginLeft:20,
        marginRight:20
    },
    inputs: {
        marginTop: 10,
        marginBottom: 10,
        flex: .25
    },
    inputContainer: {
        padding: 10,
        borderWidth: 1,
        marginLeft:20,
        marginRight:20,
        borderBottomColor: '#CCC',
        borderColor: 'transparent'
    },
    input: {
        position: 'absolute',
        left: 20,
        top: 12,
        right: 0,
        height: 20,
        fontSize: 16
    },
    dummy: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: .15
    },
    greyFont: {
      color: '#D8D8D8'
    },
    whiteFont: {
      color: '#FFF'
    },
    dummyEle: {
      marginLeft: 15,
      width: 20,
      height: 20
    },
    help: {
      backgroundColor: '#F26722',
      width:150,
      height:30,
      color: '#FFF',
      paddingTop:10,
      paddingLeft:30,
      marginTop:10,
      marginLeft: 80,
      marginBottom: 30,
      justifyContent: 'center',
      alignItems: 'center'
    }
});

module.exports = Home;