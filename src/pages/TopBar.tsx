import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wallet, Key} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function TopBar() {
  const [activeItem, setActiveItem] = useState<string | null>(null)
  const navigate = useNavigate()

  const navItems = [
    { name: 'Ethereum Wallet', icon: Wallet, path:'/ethereum' },
    { name: 'Generate Mnemonic', icon: Key, path:'/' },
    { name: 'Solana Wallet', icon: Wallet, path:'/solana' },
  ]

  return (
    <nav className="bg-black p-6 border-b-2 shadow-lg">
      <ul className="flex justify-center gap-8 items-center">
        {navItems.map((item) => (
          <motion.li
            key={item.name}
            onClick={()=> navigate(`${item.path}`)}
            className="relative cursor-pointer p-4 rounded-md transition-all duration-300 ease-in-out"
            onHoverStart={() => setActiveItem(item.name)}
            onHoverEnd={() => setActiveItem(null)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="flex flex-col items-center space-y-2"
              initial={{ color: '#9CA3AF' }}
              animate={{
                color: activeItem === item.name ? '#60A5FA' : 'white',
              }}
              transition={{ duration: 1 }}
            >
              <item.icon className="w-8 h-8" />
              <span className="text-sm font-medium">{item.name}</span>
            </motion.div>
            <AnimatePresence>
              {activeItem === item.name && (
                <motion.div
                  className="absolute -inset-1 bg-blue-500 rounded-lg z-0"
                  layoutId="glow"
                  initial={{ opacity: 0, scale: 1}}
                  animate={{ opacity: 0.15, scale: 1 }}
                  exit={{ opacity: 0, scale:1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </AnimatePresence>
          </motion.li>
        ))}
      </ul>
      
    </nav>
  )
}
