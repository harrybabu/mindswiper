'use strict';

var React = require('react-native');
var DetailsView = require('./DetailsView');
var {
  ScrollView,
  StyleSheet,
  Image, 
  View,
  TouchableHighlight,
  ListView,
  Text,
  Component
} = React;

var styles = StyleSheet.create({
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  textContainer: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#48BBEC'
  },
  title: {
    fontSize: 20,
    color: '#656565'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  }
});

class SearchResults extends Component {

  constructor(props) {
    super(props);
  }
    
  _handleResponse(response) {
    if (response) {
      // var hotel = JSON.parse(response._bodyText);
      this.props.navigator.push({
        title: "Details",
        component: DetailsView,
        passProps: {hotel: response}
      });
    } else {
      this.setState({ message: 'Hotel not recognized please try again.'});
    }
  }

  rowPressed(vhid) {
    const url = 'http://developer.myntra.com/style/' + vhid + '/';
    var request = new XMLHttpRequest();
    var self = this;
    request.onreadystatechange = (e) => {
      if (request.readyState !== 4) {
        return;
      }

      if (request.status === 200) {
        const respData = JSON.parse(request.responseText);
        self._handleResponse(respData.data);
        // console.log('success', );
      } else {
        console.warn('error');
      }
    };
    request.open('GET', url);
    request.send();
  }
    
  render() {
    var elements = this.props.listings.map((hotel) => {
      return  (
            <TouchableHighlight key={hotel.styleid} onPress={() => this.rowPressed(hotel.styleid)}
            underlayColor='#dddddd'>
                <View key={'view' + hotel.styleid}>
                    <View style={styles.rowContainer}>
                        <Image style={styles.thumb} source={{ uri: hotel.search_image }} />
                        <View  style={styles.textContainer}>
                            <Text style={styles.price}>Rs.{hotel.discounted_price}</Text>
                            <Text style={styles.title} 
                            numberOfLines={1}>{hotel.product}</Text>
                        </View>
                    </View>
                    <View style={styles.separator}/>
                </View>
            </TouchableHighlight>
        );
    });
    return (
        <ScrollView
        automaticallyAdjustContentInsets={false}
        vertical={true}
        style={[styles.scrollView, styles.verticalScrollView]}>
            {elements}
        </ScrollView>
    );
  }
}


module.exports = SearchResults;