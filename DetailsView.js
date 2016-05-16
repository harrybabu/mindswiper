'use strict';

var React = require('react-native');
var Swiper = require('react-native-swiper-fork');
var {
  StyleSheet,
  Image, 
  View,
  Text,
  Component
} = React;

var styles = StyleSheet.create({
  container: {
    marginTop: 65
  },
  heading: {
    backgroundColor: '#F8F8F8',
  },
  separator: {
    height: 1,
    backgroundColor: '#DDDDDD'
  },
  image: {
    flex: 1
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 5,
    color: '#48BBEC'
  },
  title: {
    fontSize: 20,
    margin: 5,
    color: '#656565'
  },
  description: {
    fontSize: 18,
    margin: 5,
    color: '#656565'
  },
  wrapper: {
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});

class DetailsView extends Component {

  render() {
    var hotel = this.props.hotel;
    var gallery = hotel.styleImages;
    // var images = (<div> Hello</div>);
    var images = [];
    if ( gallery.default ) {
      images.push(
        <View style={styles.slide} key={gallery.default.imageType} title={<Text numberOfLines={1}>{gallery.default.imageType}</Text>}>
          <Image style={styles.image} source={{uri:gallery.default.imageURL}} />
        </View>
      )
    }
    if ( gallery.front ) {
      images.push(
        <View style={styles.slide} key={gallery.front.imageType} title={<Text numberOfLines={1}>{gallery.front.imageType}</Text>}>
          <Image style={styles.image} source={{uri:gallery.front.imageURL}} />
        </View>
      )
    }
    if ( gallery.back ) {
      images.push(
        <View style={styles.slide} key={gallery.back.imageType} title={<Text numberOfLines={1}>{gallery.back.imageType}</Text>}>
          <Image style={styles.image} source={{uri:gallery.back.imageURL}} />
        </View>
      )
    }
    if ( gallery.left ) {
      images.push(
        <View style={styles.slide} key={gallery.left.imageType} title={<Text numberOfLines={1}>{gallery.left.imageType}</Text>}>
          <Image style={styles.image} source={{uri:gallery.left.imageURL}} />
        </View>
      )
    }
    if ( gallery.right ) {
      images.push(
        <View style={styles.slide} key={gallery.right.imageType} title={<Text numberOfLines={1}>{gallery.right.imageType}</Text>}>
          <Image style={styles.image} source={{uri:gallery.right.imageURL}} />
        </View>
      )
    }
    // var images = gallery.map((image) => {
    //   if (image === null) {
    //     return null;
    //   }
    //   return  (
    //       <View style={styles.slide} title={<Text numberOfLines={1}>{image[3]}</Text>}>
    //             <Image style={styles.image} source={{uri:image[1]}} />
    //       </View>
    //   );
    // });
    return (
      <View style={styles.container} key={'detail' + hotel.id}>
        <Swiper style={styles.wrapper} height={300} autoplay={true} showsButtons={true}
          dot={<View style={{backgroundColor:'rgba(0,0,0,.2)', width: 5, height: 5,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}
          activeDot={<View style={{backgroundColor: '#000', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}
          paginationStyle={{
            bottom: -23, left: null, right: 10,
          }} loop={true}>
              {images}
        </Swiper>
        <View style={styles.heading}>
          <Text style={styles.price}>Rs.{hotel.discountedPrice}</Text>
          <Text style={styles.title}>{hotel.productDisplayName}</Text>
          <View style={styles.separator}/>
        </View>
        <Text style={styles.description}>{hotel.productDescriptors.description.value}</Text>
      </View>
    );
  }
};

module.exports = DetailsView;