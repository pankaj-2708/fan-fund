import PaymentPage from "@/components/PaymentPage";
import { notFound } from "next/navigation";
import User from "@/models/User";
import { getData2 } from "@/actions/dashboardAction";
import Head from "next/head";



export async function generateMetadata({ params }) {

  const dupdetails = await getData2(params.username);
  if (!dupdetails[0]) {
    return {
      title: "User Not Found",
      description: "The user you are looking for does not exist.",
    };
  }


  return {
    title: dupdetails[0].username || "User Profile",
    description: dupdetails[0].bio || "User profile page",
    
  };

  
}



const Profile =  async ({ params }) => {

  const dupdetails=await getData2(params.username)
  if (dupdetails[0]==null){
    return notFound() 
  }
  return (
    <>
    
    <Head>
          <title>"iosdfjios"</title>
          <meta name="description" content="pankaj " />
</Head>
      <PaymentPage username={params.username} />
    </>
  );
};



export default Profile;
