import Data from '../components/User/UserData';

function userDataGoogle() {
	// console.log(getUser)

	return <Data />;
}

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) =>
//     async (ctx) => {
//       console.log(ctx)
//       const urlUserData = `${BASEURL}/auth/data`;
//       const config = {
//             withCredentials: true,
//             headers: {
//               "Content-Type": "application/json",
//             },
//           };
//           console.log(config)
//           try{
//             const res = await fetch(urlUserData, {
//               method: 'GET',
//               withCredentials: true,
//               headers: {
//                 'Content-Type': 'application/json'
//               }
//             })
//             console.log(res)
//           // let getUser = await axios.get(urlUserData, config);
//           }catch(err){
//             console.log(err)
//           }
//           console.log(getUser.data)
//       return {
//         props: {
//           getUser: getUser.data
//         }
//       }
//     }
// );

export default userDataGoogle;
