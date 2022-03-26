import { initUrqlClient } from "next-urql";
import { Client } from "urql";

export const urqlClient = (): Promise<Client> => {
  const GRAPHQL_ENDPOINT =
    process.env.GRAPHQL_ENDPOINT || "http://localhost:3000/graphql";
  console.log(GRAPHQL_ENDPOINT);
  return new Promise((resolve, reject) => {
    const client = initUrqlClient(
      {
        url: GRAPHQL_ENDPOINT,
      },
      false
    );
    if (!client) {
      reject(Error("Failed to init initUrqlClient."));
    } else {
      resolve(client);
    }
  });
};
