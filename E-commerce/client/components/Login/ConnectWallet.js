import { ConnectButton } from '@rainbow-me/rainbowkit';
import { motion } from 'framer-motion';
import { useColorMode } from '@chakra-ui/react';

export const ConnectWallet = () => {
    const { colorMode } = useColorMode();

    return (
        <ConnectButton.Custom>
            {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                mounted,
            }) => {
                return (
                    <div
                        {...(!mounted && {
                            'aria-hidden': true,
                            'style': {
                                opacity: 0,
                                pointerEvents: 'none',
                                userSelect: 'none',
                            },
                        })}
                    >
                        {(() => {
                            if (!mounted || !account || !chain) {
                                return (
                                    <motion.div onClick={openConnectModal} style={{
                                        backgroundColor: '#3182ce',
                                        display: 'flex',
                                        width: '100%',
                                        height: '2.5rem',
                                        borderRadius: '5px',
                                        color: '#ffffff',
                                        alingItems: 'center',
                                        justifyContent: 'center',
                                        borderColor: 'white',
                                        borderStyle: 'solid',
                                        padding: '10px 15px 0px 15px',
                                        cursor: 'pointer',
                                        boxShadow: colorMode === 'light' ? '5px 10px 8px #888888' : 'none',
                                        fontWeight: '600',
                                    }} type="button"
                                        whileHover={{
                                            scale: 1.02,
                                            backgroundColor: '#2b6cb0'
                                        }}
                                    >
                                        Connect Wallet
                                    </motion.div>
                                );
                            }

                            if (chain.unsupported) {
                                return (
                                    <button onClick={openChainModal} type="button">
                                        Wrong network
                                    </button>
                                );
                            }

                            return (
                                <div style={{ display: 'flex', gap: 10, width: 'max-content' }}>
                                    <button
                                        onClick={openChainModal}
                                        style={{ display: 'flex', alignItems: 'center', }}
                                        type="button"
                                    >
                                        {chain.hasIcon && (
                                            <div
                                                style={{
                                                    background: chain.iconBackground,
                                                    width: 25,
                                                    height: 25,
                                                    borderRadius: 999,
                                                    overflow: 'hidden',
                                                }}
                                            >
                                                {chain.iconUrl && (
                                                    <img
                                                        alt={chain.name ?? 'Chain icon'}
                                                        src={chain.iconUrl}
                                                        style={{ width: 25, height: 25 }}
                                                    />
                                                )}
                                            </div>
                                        )}

                                    </button>

                                    <button onClick={openAccountModal} type="button"
                                        style={{
                                            display: 'flex',
                                            alingItems: 'center',
                                            color: 'white',
                                            borderRadius: '25px',
                                            borderColor: 'white',
                                            borderStyle: 'solid',
                                            padding: '8px 15px',
                                            backgroundImage: 'linear-gradient(to right, #75a1ec, #3bd1d3)'
                                        }}
                                    >
                                        {account.displayName}
                                        {account.displayBalance
                                            ? ` (${account.displayBalance})`
                                            : ''}
                                    </button>
                                </div>
                            );
                        })()}
                    </div>
                );
            }}
        </ConnectButton.Custom >
    )
}

