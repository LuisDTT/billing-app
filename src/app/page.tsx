import axios from 'axios'

async function fetchUser() {
    const res = await axios.get('/api/user')
}

export default function Home() {
    // fetchUser()
    return (
        <div className='opacity-5 bg-[url("../../public/assets/main-bg.svg")]  bg-no-repeat bg-center bg-contain w-full h-full'></div>
    )
}
