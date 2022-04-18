import { collection, onSnapshot, query, where } from "@firebase/firestore";
import React, { useContext, useEffect } from "react";
import {View, StyleSheet, TouchableOpacity, Text } from "react-native";
import GlobalContext from "../context/Context";
import { auth, db } from "../firebase";
import ListItem from "../components/ListItem";
import useContacts from "../hooks/useHooks";
import { useNavigation } from "@react-navigation/native";

function Chats() {
  const {
    theme: { colors },
  } = useContext(GlobalContext);
  const navigation = useNavigation();
  const { currentUser } = auth;
  const { rooms, setRooms, setUnfilteredRooms } = useContext(GlobalContext);
  const contacts = useContacts();

  const chatsQuery = query(
    collection(db, "rooms"),
    where("participantsArray", "array-contains", currentUser.email)   // change eamil to id here
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(chatsQuery, (querySnapshot) => {
      const parsedChats = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        userB: doc
          .data()
          .participants.find((p) => p.email !== currentUser.email),
      }));

      setUnfilteredRooms(parsedChats);
      setRooms(parsedChats.filter((doc) => doc.lastMessage));   //only rooms which has lastMessage
    });

    return () => unsubscribe();
  }, []);

  function getUserB(user, contacts) {
    const userContact = contacts.find((c) => c.number === user.phoneNumber);

    if (userContact && userContact.name) {
      return { ...user, contactName: userContact.contactName };
    }

    return user;
  }

  return (
    <View style={{ flex: 1}}>
      {rooms.map((room) => (
        <ListItem
          type="chat"
          description={room.lastMessage.text}
          key={room.id}
          room={room}
          time={room.lastMessage.createdAt}
          user={getUserB(room.userB, contacts)}
        />
      ))}

      <TouchableOpacity
          onPress={() => navigation.navigate('contacts')}
          style={{...styles.buttonContainer, backgroundColor: colors.secondary}}>
          <Text style={styles.buttonText}>Start a Chat</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    paddingVertical: 17,
    position: 'absolute',
    bottom: 0
  },

  buttonText: {
    color: '#000',
    fontSize: 22,
    alignSelf: 'center'
  }
});

export default Chats;

