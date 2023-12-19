//@ts-nocheck
import { COLORS } from "framework/src/Globals";
import { scaledSize } from "framework/src/Utilities";
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from "react-native-maps";
export const mapRef: any = React.createRef();

interface Props {
  currentLatitude: any;
  currentLongitude: any;
  userLatitude?: any;
  userLongitude?: any;
  userName?: any;
}

interface S {}

export default class CustomMap extends Component<Props, S> {
  constructor(props: Props) {
    super(props);
    this.state = {
      currentLatitude: props.currentLatitude,
      currentLongitude: props.currentLongitude,
      userLatitude: props.userLatitude,
      userLongitude: props.userLongitude,
    };
  }

  renderMarker(
    key: string,
    isHilighted: boolean,
    latitude: number,
    longitude: number,
    title: string
  ) {
    return (
      <Marker
        key={key}
        coordinate={{ latitude: latitude, longitude: longitude }}
        title={title}
        anchor={{ x: 0.5, y: 0.5 }}
        calloutOffset={{ x: 0.5, y: 0.5 }}
        tracksViewChanges={false}
      >
        <View style={styles.markerOuterView}>
          <View
            style={
              isHilighted
                ? styles.markerInnerDarkView
                : styles.markerInnerLightView
            }
          />
        </View>
      </Marker>
    );
  }

  render() {
    return (
      <MapView
        testID="mapView"
        style={styles.mapStyle}
        ref={mapRef}
        followsUserLocation={true}
        showsMyLocationButton={false}
        provider={PROVIDER_GOOGLE}
        toolbarEnabled={false}
        initialRegion={{
          latitude: this.props.currentLatitude,
          longitude: this.props.currentLongitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {this.renderMarker(
          "user1",
          true,
          this.props.currentLatitude,
          this.props.currentLongitude,
          "You"
        )}
        {(this.props.userLatitude && this.props.userLongitude) ? this.renderMarker(
          "user2",
          false,
          this.props.userLatitude,
          this.props.userLongitude,
          this.props.userName
          // "abc"
        ) : null}
        {
          (this.props.userLatitude && this.props.userLongitude) ?
          <Polyline
          coordinates={[
            {
              latitude: this.props.currentLatitude,
              longitude: this.props.currentLongitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            },
            {
              latitude: this.props.userLatitude,
              longitude: this.props.userLongitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            },
          ]}
          strokeWidth={2}
          strokeColor={COLORS.backgroundGray}
        /> : null
        }
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  markerOuterView: {
    height: scaledSize(20),
    width: scaledSize(20),
    borderRadius: scaledSize(10),
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  markerInnerDarkView: {
    height: scaledSize(16),
    width: scaledSize(16),
    borderRadius: scaledSize(8),
    backgroundColor: "#f07135",
  },
  markerInnerLightView: {
    height: scaledSize(16),
    width: scaledSize(16),
    borderRadius: scaledSize(8),
    borderWidth: scaledSize(2),
    borderColor: "black",
  },
  mapStyle: {
    height: "100%",
    width: "100%",
  },
});