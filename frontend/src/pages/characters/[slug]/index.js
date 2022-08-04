import { Grid } from "@mui/material";

import { getCharacterBySlug } from "../../../lib/load_characters";
import BioCard from "../../../components/pages/characters/[slug]/BioCard";
import SingleCharacterMeta from "../../../components/pages/characters/[slug]/CharacterMeta";
import CharacterPageContent from "../../../components/pages/characters/[slug]/CharacterPageContent";

const Character = ({ data, links, errorMessage }) => {
  const { attributes } = data;

  return (
    <>
      <SingleCharacterMeta attributes={attributes} />
      <h1>{attributes.name}</h1>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8} order={{ xs: 2, md: 1 }}>
          <CharacterPageContent attributes={attributes} />
        </Grid>

        <Grid item xs={12} md={4} order={{ xs: 1, md: 2 }}>
          <BioCard attributes={attributes} apiLink={links.self} />
        </Grid>
      </Grid>
    </>
  );
};

export async function getStaticPaths() {
  const slugs = [
    "harry-potter",
    "ronald-weasley",
    "hermione-granger",
    "ginevra-weasley",
    "severus-snape",
    "albus-dumbledore",
    "tom-riddle",
    "draco-malfoy",
    "james-potter-i",
    "lily-j-potter",
    "albus-potter",
    "dobby",
    "sirius-black",
    "luna-lovegood",
    "dudley-dursley",
    "rubeus-hagrid",
    "vernon-dursley",
    "petunia-dursley",
    "arthur-weasley",
    "molly-weasley",
  ];

  const paths = slugs.map((slug) => ({
    params: {
      slug,
    },
  }));

  return {
    fallback: "blocking",
    paths,
  };
}

export async function getStaticProps({ params }) {
  const character = await getCharacterBySlug(params.slug);
  const { data, links, hasError } = character;

  if (hasError || !data || !data.attributes || !links) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data,
      links,
    },
  };
}

export default Character;
