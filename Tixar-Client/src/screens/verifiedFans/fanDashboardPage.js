import { React, useState, useEffect, useContext, useRef } from "react";
import {
  View,
  Text,
  Animated,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import ArtistBlock from "../../components/verifiedFans/artistBlock";
import NextButton from "../../components/new/nextButton";
import Button from "../../components/newApp/button";
import { AuthContext, ColorContext } from "../../../context";
import SearchField from "../../components/browseConcert/searchField";
import { FlatList } from "react-native-gesture-handler";

export default FanDashboardPage = ({ route, navigation }) => {
  const [profiles, setProfiles] = useState([]);
  const [sortedProfiles, setSortedProfiles] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const { token } = useContext(AuthContext);
  const { colors } = useContext(ColorContext);

  const getProfiles = () => {
    fetch("http://vf.tixar.sg/api/profiles", {
      method: "GET",
      credentials: "include",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setProfiles(data);
        setSortedProfiles(
          data.sort((e1, e2) => {
            if (e1.points !== e2.points) {
              return e2.points - e1.points;
            }
            return e1.club.name.localeCompare(e2.club.name);
          })
        );
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    const navFunc = navigation.addListener("focus", () => {
      getProfiles();
    });
    return navFunc;
  }, [navigation]);

  useEffect(() => {
    if (isLoading) {
      return;
    } else if (searchText === "") {
      setSortedProfiles(profiles);
      return;
    }
    let query = searchText.toLowerCase();
    setSortedProfiles(
      profiles.filter((profile) =>
        profile.club.name.toLowerCase().includes(query)
      )
    );
  }, [searchText]);

  const duration = 300;
  const animate1 = useRef(new Animated.Value(0)).current;
  const animate2 = useRef(new Animated.Value(0)).current;
  const animate3 = useRef(new Animated.Value(0)).current;

  const loadingAnimation = () => {
    Animated.sequence([
      Animated.timing(animate1, {
        toValue: 1,
        duration: duration,
        useNativeDriver: true,
      }),
      Animated.timing(animate2, {
        toValue: 1,
        duration: duration,
        useNativeDriver: true,
      }),
      Animated.timing(animate3, {
        toValue: 1,
        duration: duration,
        useNativeDriver: true,
      }),
    ]).start(() => {
      animate1.setValue(0);
      animate2.setValue(0);
      animate3.setValue(0);
      loadingAnimation();
    });
  };

  useEffect(() => {
    if (!isLoading) {
      animate1.stopAnimation();
      animate2.stopAnimation();
      animate3.stopAnimation();
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <SearchField searchText={searchText} setSearchText={setSearchText} />
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: colors.textSecondary }}>Loading</Text>

          <Text style={{ color: colors.textSecondary }}> .</Text>
          <Text style={{ color: colors.textSecondary }}> .</Text>
          <Text style={{ color: colors.textSecondary }}> .</Text>
        </View>
      </View>
    );
  }

  return (
    <View
      style={{ flex: 1, paddingBottom: 20, backgroundColor: colors.background }}
    >
      <SearchField
        searchText={searchText}
        setSearchText={setSearchText}
        onBlurFunction={() => {
          let query = searchText.toLowerCase;
          // setSortedProfiles(profiles.filter(profile => profile.clubName.contains(query)));
        }}
      />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <FlatList
          data={sortedProfiles}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            return (
              <ArtistBlock
                key={item._id}
                points={item.points}
                clubName={item.club.name}
                artistDescription={item.club.description}
                artistIcon={item.club.imageUrl}
                onPressFunction={() => {
                  navigation.navigate("viewClubPage", {
                    clubName: item.club.name,
                    artistDescription: item.club.description,
                    clubId: item.club._id,
                    profileId: item._id,
                    imageUrl: item.club.imageUrl,
                    points: item.points,
                  });
                }}
              />
            );
          }}
          style={{ width: "100%" }}
        />
        <NextButton
          buttonText={"Redeem Fan Code Here!"}
          onPressFunction={() => {
            navigation.navigate("redemptionPage");
          }}
          style={{ marginTop: -20 }} // Adjust the marginTop value as needed
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    height: "85%",
  },
});
