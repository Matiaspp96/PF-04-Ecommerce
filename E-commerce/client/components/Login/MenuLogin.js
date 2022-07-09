import { useAccount } from "wagmi";
import NextLink from 'next/link';
import { Link } from "@chakra-ui/react";
import { ConnectWallet } from "./ConnectWallet";
import { FaUser } from 'react-icons/fa'

export const MenuLogin = () => {
    const { isConnected } = useAccount()

    return (
        <div>
            {isConnected ?
                <ConnectWallet />
                : <NextLink href='/login'>
                    <Link pos='relative'>
                        <FaUser size='1.2em' />
                    </Link>
                </NextLink>
            }
        </div>
    )
}
