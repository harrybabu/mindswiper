/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';

import SwipeCards from 'react-native-swipe-cards';
import { setTheme, MKColor } from 'react-native-material-kit';
import SearchResults from './SearchResults';
// import Popup from 'react-native-popup';

const Cards = require('./test.json');

// customize the material design theme
setTheme({
  primaryColor: MKColor.Purple,
  primaryColorRGB: MKColor.RGBPurple,
  accentColor: MKColor.Amber,
});

class Card extends Component {
  render() {
    return (
      <View style={styles.card}>
        <Image resizeMode={Image.resizeMode.contain} style={styles.thumbnail} source={{uri: this.props.image}} />
        <Text style={styles.text}>{this.props.name}</Text>
      </View>
    )
  }
}

class NoMoreCards extends Component {
  render() {
    return (
      <View style={styles.noMoreCards}>
        <Text>No more cards</Text>
      </View>
    )
  }
}
class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.handleYup = this.handleYup.bind(this);
    this.handleNope = this.handleNope.bind(this);
    this.cardRemoved = this.cardRemoved.bind(this);
    this.renderCards = this.renderCards.bind(this);
    this._handleResponse = this._handleResponse.bind(this);
    this.onShop = this.onShop.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.state = {
      cards: Cards,
      shuffledCards: [],
      outOfCards: false,
      counter: 0,
      shortListed: [],
    };
  }

  componentWillMount() {
    const shuffle = this.shuffle(Cards);
    this.setState({shuffledCards: shuffle});
  }

  shuffle(a) {
    let j, x, i;
    for (i = a.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
    return a;
  }

  handleYup(card) {
    console.log("yup");
    const currentCount = this.state.counter;
    this.state.shortListed.push(card);
    this.setState({counter: currentCount + 1 });
  }

  _handleResponse(response) {
    // console.log(response.text());
    if (response) {
      // var results = JSON.parse(response.data.results.products);
      this.props.navigator.push({
        title: 'Results',
        component: SearchResults,
        passProps: {listings: response}
      });
    } else {
      // this.setState({ message: 'Location not recognized please try again.'});
      console.log('error');
    }
  }

  handleNope(card) {
    console.log("nope");
  }

  cardRemoved(index) {
    console.log(`The index is ${index}`);

    let CARD_REFRESH_LIMIT = 3

    if (this.state.cards.length - index <= CARD_REFRESH_LIMIT + 1) {
      console.log(`There are only ${this.state.cards.length - index - 1} cards left.`);

      // if (!this.state.outOfCards) {
      //   console.log(`Adding ${Cards2.length} more cards`)

      //   this.setState({
      //     cards: this.state.cards.concat(Cards2),
      //     outOfCards: true
      //   })
      // }

    }

  }

  renderCards(cardData){
    console.log("test");
    return <Card {...cardData} />;
  }

  onShop() {
    const items = this.state.shortListed;
    let queryString = '';
    for( let itr = 0; itr < items.length; itr++) {
      const keyVal = items[itr].key;
      if ( keyVal !== '') {
        queryString += keyVal + '-';
      }
    }
    const url = 'http://developer.myntra.com/search/data/' + queryString + '/';
    var request = new XMLHttpRequest();
    var self = this;
    request.onreadystatechange = (e) => {
      if (request.readyState !== 4) {
        return;
      }

      if (request.status === 200) {
        const respData = JSON.parse(request.responseText);
        self._handleResponse(respData.data.results.products);
        // console.log('success', );
      } else {
        console.warn('error');
      }
    };

    request.open('GET', url);
    request.send();
    // fetch(url)
    //   .then((responseText) => {
    //     console.log(responseText);
    //   })
    //   .then(response => this._handleResponse(response))
    //   .catch(error => {
    //     console.log(error);
    //   });
  }

  render() {
    let showButton = false;
    if ( this.state.counter > 4 ) {
      showButton = true;
    }
    return (
      <View>
        <View>
          {( this.state.shuffledCards ) && (
              <SwipeCards
              cards={this.state.shuffledCards}
              loop={false}

              renderCard={this.renderCards}
              renderNoMoreCards={() => <NoMoreCards />}
              showYup={true}
              showNope={true}

              handleYup={this.handleYup}
              handleNope={this.handleNope}
              cardRemoved={this.cardRemoved}
            />
          )}
        </View>

        <View style={styles.dummy}>
          {(showButton) && (
            <TouchableHighlight onPress={this.onShop}>
              <View style={styles.search}>
                <Text style={styles.blackFont}>Continue Shopping</Text>
              </View>
            </TouchableHighlight>
          )}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    borderRadius: 5,
    overflow: 'hidden',
    borderColor: 'grey',
    backgroundColor: 'white',
    borderWidth: 1,
    elevation: 1,
    marginTop: 70 ,
  },
  thumbnail: {
    flex: 1,
    width: 250,
    height: 250,
  },
  text: {
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10
  },
  noMoreCards: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dummy: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: .15
  },
  blackFont: {
    color: '#000'
  },
  search: {
    backgroundColor: '#F26722',
    padding: 20,
    alignItems: 'center',
    marginTop: 30,
    marginLeft:20,
    marginRight:20
  }
});

module.exports = SearchPage;
