import { Providers } from '../Providers'
import { WalletButton } from './WalletButton'
import { useAccount, useChainId } from 'wagmi'

const randoms = [[1, 2], [3, 4, 5], [6, 7]]

export default function App() {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="h-screen sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div className="sm:max-w-lg my-4">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Wallet Connector
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              Welcome to the latest and deepest project of web3brige 2025, enjoy!
            </p>
          </div>
          <div className="my-10">

            <Providers>
              
                <WalletButton />
              
            </Providers >

            <div
              aria-hidden="true"
              className="pointer-events-none mt-10 md:mt-0 lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
            >
              <div className="absolute sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                <div className="flex items-center space-x-6 lg:space-x-8">
                  {randoms.map((random, number) => (
                    <div
                      key={`random-${random[number]}`}
                      className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8"
                    >
                      {random.map((number) => (
                        <div
                          key={`random-${number}`}
                          className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100"
                        >
                          <img
                            src={`https://picsum.photos/600?random=${number}`}
                            alt=""
                            className="size-full bg-indigo-100 object-cover object-center"
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  )
}

function ConnectionStatus() {
  const { address, isConnected } = useAccount()
  const chainId = useChainId()

  return (
    <div className="space-y-4">
      <p className="text-lg">
        Status: {isConnected ? (
          <span className="bg-grren-600 text-white px-6 py-3 rounded-lg hover:bg-red-700">🟢 Connected</span>
        ) : (
          <span className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700">🔴 Disconnected</span>
        )}
      </p>

      {isConnected && (
        <>
          <div className="p-4 rounded-xl bg-gray-800/40 border border-gray-700">
            <p className="text-sm font-mono text-gray-300">
              Address: <span className="text-web3-purple">{address}</span>
            </p>
            <p className="text-sm text-gray-400">
              Chain ID: <span className="text-blue-400">{chainId || 'Unknown'}</span>
            </p>
          </div>
        </>
      )}
    </div>
  )
}
