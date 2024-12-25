"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { User } from "@/types/here";

const Page = () => {
  const { email } = useParams();

  const { data, error, isLoading } = useQuery<User>({
    queryKey: ["profile", email],
    queryFn: async () => {
      const response = await fetch(`/api/profile/${email}`);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error fetching data");
      }

      return response.json();
    },
    enabled: !!email,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  console.log(data);
  return (
    <main>
      {data ? (
        <div>
          <h1>{data.firstName}</h1>
          <p>{data.lastName}</p>
        </div>
      ) : (
        <div>No data found</div>
      )}
    </main>
  );
};

export default Page;
