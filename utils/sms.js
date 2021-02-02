import SendSMS from 'react-native-sms-x'

export default sms = {
  send: (message, contacts) => {
		return new Promise((resolve, reject) => {
			const messageSent = contacts.map(contact => {
			  SendSMS.send(parseFloat(contact.id), contact.number, helpTex, successId => {
			  	resolve(`Message sent successfully to ${contacts.map(contact => contact.name).toString()} from your emergency contacts.`)
			  })
			})
		})
  }
}
