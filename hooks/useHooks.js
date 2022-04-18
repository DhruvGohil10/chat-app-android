import { useEffect, useState } from "react";
import * as Contacts from "expo-contacts";

export default function useContacts() {
	const [contacts, setContacts] = useState([]);

	useEffect(() => {
		(async () => {
			const { status } = await Contacts.requestPermissionsAsync();

			if (status === "granted") {
				const { data } = await Contacts.getContactsAsync();

				if (data.length > 0) {
					let parsedContacts = data.map((person) => {
						console.log(person);
						return {
							name: person.name,
							// number: person.phoneNumbers[0].number,
						};
					});

					setContacts(parsedContacts);
				}
			}
		})();
	}, []);

	return contacts;
}
