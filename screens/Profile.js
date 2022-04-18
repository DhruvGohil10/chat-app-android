import { StatusBar } from "expo-status-bar";
import React, { useContext, useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import Constants from "expo-constants";
import GlobalContext from "../context/Context";
import { auth, db } from "../firebase";
import { updateProfile } from "@firebase/auth";
import { doc, setDoc } from "@firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import "react-native-get-random-values";
import { nanoid } from "nanoid";

function Profile() {
	const [displayName, setDisplayName] = useState("");
	const [phoneNumber, setPhoneNumber] = useState(null);
	const navigation = useNavigation();
	const userId = nanoid();

	const {
		theme: { colors },
	} = useContext(GlobalContext);

	async function handlePress() {
		const user = auth.currentUser;

		const userData = {
			displayName,
			phoneNumber,
			email: user.email,
			userId: userId,
		};

		await Promise.all([
			updateProfile(user, userData),
			setDoc(doc(db, "users", user.uid), { ...userData, uid: user.uid }),
		]);

		navigation.navigate("chats");
	}

	return (
		<React.Fragment>
			<StatusBar style='auto' />
			<View
				style={{
					alignItems: "center",
					justifyContent: "center",
					flex: 1,
					paddingTop: Constants.statusBarHeight + 20,
					padding: 20,
				}}
			>
				<Text style={{ fontSize: 43, color: colors.foreground }}>
					Profile Info
				</Text>

				<Text style={{ fontSize: 20, color: colors.text, marginTop: 20 }}>
					Please provide your name and number
				</Text>

				<TextInput
					placeholder='Type your name'
					value={displayName}
					onChangeText={setDisplayName}
					style={{
						borderBottomColor: colors.primary,
						marginTop: 40,
						borderBottomWidth: 3,
						width: "70%",
						paddingVertical: 8,
						fontSize: 20,
					}}
				/>

				<TextInput
					value={phoneNumber}
					onChangeText={setPhoneNumber}
					placeholder='Your Phone Number'
					style={{
						borderBottomColor: colors.primary,
						marginTop: 30,
						borderBottomWidth: 3,
						width: "70%",
						paddingVertical: 8,
						fontSize: 20,
					}}
				/>

				<View style={{ marginTop: 30, width: 110 }}>
					<Button
						title='Next'
						color={colors.secondary}
						onPress={handlePress}
						disabled={!displayName}
					/>
				</View>
			</View>
		</React.Fragment>
	);
}

export default Profile;
