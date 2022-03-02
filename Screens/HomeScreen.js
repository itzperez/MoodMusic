import { StyleSheet, Text, View, FlatList, SafeAreaView, Image, Pressable } from 'react-native';
import Images from '../assets/Images';
import { useNavigation } from '@react-navigation/native';


const LOCATIONS = [
  {
    id: 1,
    image: Images.lakeLouise,
    title: 'Lake Louise',
    description: 'Lake Louise is rich heritage as one of the world\'s most awe-inspiring mountain destinations.',
    screenName: 'LakeLouiseScreen'
  },
  {
    id: 2,
    image: Images.sanFrancisco,
    title: 'San Francisco',
    description: 'Grab your coat and a handful of glitter and enter the land of fog and fabulousness.',
    screenName: 'SanFranciscoScreen'
  },
  {
    id: 3,
    image: Images.alesund,
    title: 'Ålesund',
    description: 'The far northern port of Ålesund might be far wway from the bright lights of metropoliton Norway.',
    screenName: 'AlesundScreen'
  }
]

export default function HomeScreen() {
  const navigation = useNavigation();

  const renderItem = ({ item }) => {
    return (
      <Pressable onPress={() => {navigation.navigate(item.screenName, {
        location: item
      })}}>
        <View key={item.id} style={styles.destinations}>
          <Image source={item.image} style={styles.destinationImages}></Image>
          <View style={styles.destinationText}>
            <View style={styles.titleDescription}>
              <Text style={styles.destinationTitle}>{item.title}</Text>
              <Text style={styles.destinationDescription}>{item.description}</Text>
            </View>
            <View style={styles.destinationExplore}>
              <Text style={styles.exploreText}>Explore</Text>
            </View>
          </View>
        </View>
      </Pressable>
    );
  }


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchbar}></View>
      <View style={styles.destinationsDropDown}></View>
      <View style={styles.horizontalScroll}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={LOCATIONS}
          renderItem={renderItem}
        />

      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  searchbar: {
    width: '85%',
    flex: 1,
    margin: 15,
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  destinationsDropDown: {
    width: '85%',
    flex: 1,
    marginTop: 15,
  },
  horizontalScroll: {
    width: '85%',
    flex: 8,
    margin: 20,
  },
  destinations: {
    height: '90%',
    width: 291,
    margin: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'gray',
  },
  destinationImages: {
    height: 290,
    width: 290,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  destinationText: {
    display: 'flex',
    justifyContent: 'space-between',
    height: '30%',
  },
  titleDescription: {
    margin: 15,
    marginTop: 20,
  },
  destinationTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  destinationDescription: {
    color: 'gray',
    fontSize: 12,
  },
  destinationExplore: {
    margin: 15,
  },
  exploreText: {
    textTransform: 'uppercase',
    fontSize: 10,
    fontWeight: 'bold'
  }
});
