import Login from "../components/Login/Login";
import { SlideFade } from "@chakra-ui/react";
import { useRouter } from "next/router";

function LoginPage() {
  const router = useRouter();
  return (
    <SlideFade key={router.route} in="true">
      <Login />
    </SlideFade>
  );
}

export default LoginPage;
