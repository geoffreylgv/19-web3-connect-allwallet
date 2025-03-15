'use client'
import { useState } from 'react'
import { useConnect, useAccount, useDisconnect, useChainId, useSwitchChain } from 'wagmi'
import { AnimatePresence, motion } from 'framer-motion'

export function WalletButton() {
  const [showModal, setShowModal] = useState(false)
  const { connect, connectors, error, isPending } = useConnect()
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const chainId = useChainId()

  const installedConnectors = connectors.filter(connector => 
    connector.id !== 'injected' || window.ethereum?.isMetaMask
  )

  return (
    <div className="relative">
      <button
        onClick={() => setShowModal(!showModal)}
        className="inline-block w-72 rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-offset-2"
      >
        {isConnected ? `🟢 ${address?.slice(0, 10)}...${address?.slice(-10)}` : 'Connect Wallet'}
      </button>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-2 w-72 bg-white rounded-xl shadow-xl p-4 space-y-4"
          >
            {isConnected ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-lg">Connected Wallet</h3>
                  <button 
                    onClick={() => disconnect()}
                    className="text-red-500 hover:text-red-600"
                  >
                    Disconnect
                  </button>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm font-mono break-words">{address}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Network ID: {chainId || 'Unknown'}
                  </p>
                </div>

                <ChainSwitcher />
              </div>
            ) : (
              <div className="space-y-3">
                <h3 className="font-bold text-lg text-gray-800">Select Wallet</h3>
                <div className="space-y-2">
                  {installedConnectors.map((connector) => (
                    <button
                      key={connector.uid}
                      onClick={() => connect({ connector })}
                      disabled={isPending}
                      className="w-full p-3 flex items-center gap-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      <img 
                        src={connector.icon || '/default-wallet-icon.png'} 
                        alt={connector.name}
                        className="w-6 h-6"
                      />
                      {connector.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {error && (
              <div className="text-red-500 text-sm p-2 bg-red-50 rounded-lg">
                Error: {error.message}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ChainSwitcher() {
  const { chains, switchChain } = useSwitchChain()
  const currentChainId = useChainId()

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-semibold text-gray-600">Switch Network</h4>
      <div className="grid grid-cols-2 gap-2">
        {chains.map((chain) => (
          <button
            key={chain.id}
            onClick={() => switchChain({ chainId: chain.id })}
            disabled={chain.id === currentChainId}
            className={`p-2 text-sm rounded-lg ${
              chain.id === currentChainId
                ? 'bg-web3-purple text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {chain.name}
          </button>
        ))}
      </div>
    </div>
  )
}
