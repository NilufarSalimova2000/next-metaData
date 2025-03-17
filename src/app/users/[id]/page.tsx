import { Metadata } from "next";
import Image from "next/image";

interface UserType {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const res = await fetch(`https://dummyjson.com/users/${params.id}`);
  const user: UserType = await res.json();

  return {
    title: `${user.firstName} ${user.lastName}`,
    description: `Email: ${user.email}`,
    openGraph: {
      images: [user.image],
    },
  };
}

const SingleUser = async ({ params }: { params: { id: string } }) => {
  const res = await fetch(`https://dummyjson.com/users/${params.id}`);
  const user: UserType = await res.json();

  return (
    <div className="p-4 border rounded-md shadow-md">
      <h1 className="text-2xl font-bold">{user.firstName} {user.lastName}</h1>
      <p className="text-gray-600">{user.email}</p>
      <Image width={"100"} height={"100"} src={user.image} alt={user.firstName} className="w-32 h-32 rounded-full mt-4" />
    </div>
  );
};

export default SingleUser;
