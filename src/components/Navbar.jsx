import {assets} from '../assets/assets'

const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
        <img 
            className='w-[max(10%,80px)] h-[max(10%,80px)] rounded-full object-cover' 
            src={assets.logo} 
            alt="Logo" 
        />
        <button 
            onClick={() => setToken('')} 
            className='bg-pink-500 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'
        >
            Logout
        </button>
    </div>
  )
}

export default Navbar