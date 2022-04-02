import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { gql } from "urql";
import { PostIndexPageDocument, PostModel, PostFragment } from "../graphql/generated.graphql";
import { urqlClient } from "../libs/gql-requests";
import styles from "../styles/Home.module.css";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import { Chip, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { isoStringToJstDate } from "../libs/date";
import { PostListView } from "./../components/post/PostListView"

// type Props = {
//   articles: PostModel[];
//   diaries: PostModel[];
// };

type Props = {
  articles: PostFragment[];
  diaries: PostFragment[];
};

const Home: NextPage<Props> = (props) => {
  return (
    <Stack
      sx={{
        minHeight: "100vh",
      }}
    >
      <Typography variant="h4">Articles</Typography>
      <PostListView posts={props.articles} />
      <Typography variant="h4">Diaries</Typography>
      <PostListView posts={props.diaries} />
      <Box
        sx={{
          bgColor: "palette.primary.dark",
          backgroundColor: (theme) => theme.palette.primary.dark,
          color: (theme) =>
            theme.palette.getContrastText(theme.palette.primary.dark),
          py: 3,
          textAlign: "center",
          marginTop: "auto",
        }}
      >
        <footer>
          <a
            href="http://devcon.hakoika.jp/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by Hakodate
          </a>
        </footer>
      </Box>
    </Stack>
  );
};
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  try {
    const client = await urqlClient();

    // 変数なしでGraphQL呼び出し
    const result = await client.query(PostIndexPageDocument, {}).toPromise();

    return {
      props: {
        articles: result.data.articles,
        diaries: result.data.diaries,
      },
    };
  } catch (e) {
    console.error(e);
    return {
      notFound: true,
    };
  }
};
export default Home;
