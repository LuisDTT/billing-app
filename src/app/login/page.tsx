import { Login } from '@/components/Login'
import { auth } from '@/firebase/firebaseAdmin'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const metadata = {
    title: 'Mi Negocio - Log In',
}

async function userLoggedIn() {
    const sessionToken = cookies().get('token')?.value
    if (!sessionToken) {
        return false
    } else {
        try {
            await auth.verifyIdToken(sessionToken)
            return true
        } catch {
            return false
        }
    }
}

const page = async () => {
    const isLoggedIn = await userLoggedIn()
    if (isLoggedIn) {
        redirect('/')
    } else {
        return <Login />
    }
}

export default page
