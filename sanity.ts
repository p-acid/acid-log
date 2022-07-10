import sanityClient from "@sanity/client";

export default sanityClient({
  projectId: "aqmsqbqq",
  dataset: "production",
  useCdn: true,
});
