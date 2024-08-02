import axios from 'axios'

async function fetchUser() {
	const res = await axios.get('/api/user')
}

export default function Home() {
	// fetchUser()
	return <></>
}
