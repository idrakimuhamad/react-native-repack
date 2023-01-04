import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

export type User = {
  avatar: string;
  fullName: string;
  email: string;
};

const Profile = ({user}: {user: User}) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image source={{uri: user.avatar}} style={styles.avatar} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.fullName}>{user.fullName}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  avatarContainer: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginRight: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  infoContainer: {
    flex: 1,
  },
  fullName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
});

export default Profile;
