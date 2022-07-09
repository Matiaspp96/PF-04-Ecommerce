import Login from '../components/Login/Login';
import { useAccount } from "wagmi";
import { useRouter } from 'next/router';

function LoginPage() {
	const { isConnected } = useAccount();
	const route = useRouter();
	if (isConnected) {
		route.push('/')
	}
	return <Login />;
}

export default LoginPage;
