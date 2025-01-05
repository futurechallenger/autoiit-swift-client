// import {request, gql} from 'graphql-request';

// const userInfoGql = gql`
//   query findUser($email:String!) {
//     userinfo(email: $email) {
//       name
//     }
//   }
// `;

// const checkUserByEmail = async (email: string): Promise<boolean> => {
//   try{

//   const res = await request('http://127.0.0.1:5050', userInfoGql, {email});
//     return !!res?.data
//   }catch(e) {
// return false
//   }
// }

// export {
//   userInfoGql,
//   checkUserByEmail,
// }
