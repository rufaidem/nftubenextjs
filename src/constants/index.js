import dashboard from '../assets/dashboard.svg'
import wallet from '../assets/wallet.svg'
import profile from '../assets/profile.svg'
import logout from '../assets/logout.svg'

export const navlinks = [
    {
        name: 'Home',
        imgUrl: dashboard,
        link: '/home',
    },
    {
        name: 'wallet',
        imgUrl: wallet,
        link: '/',
        disabled: true,
    },
    {
        name: 'profile',
        imgUrl: profile,
        link: '/profile',
    },
    {
        name: 'logout',
        imgUrl: logout,
        link: '/',
        disabled: true,
    }
]