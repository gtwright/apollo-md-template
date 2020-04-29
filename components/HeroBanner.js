import { Parallax, Background } from "react-parallax";
import Typography from "@material-ui/core/Typography";
import { Image } from "cloudinary-react";

const photoIds = [
  "Boston%20Opera%20Calendar/guerilla-noexit.jpg",
  "Boston%20Opera%20Calendar/odyssey-thezoo.jpg",
  "Boston%20Opera%20Calendar/odyssey-powder",
  "Boston%20Opera%20Calendar/boc-ourtown-1100",
  "Boston%20Opera%20Calendar/blo-boheme-h",
  "Boston%20Opera%20Calendar/blo-carmen",
];

const randomPhotoId = (photoIds) => {
  const idx = Math.floor(Math.random() * photoIds.length);
  return photoIds[idx];
};
const image1 =
  "https://res.cloudinary.com/opusaffair/image/upload/c_fill,g_faces:auto,h_795,w_3234/v1587519484/Boston%20Opera%20Calendar/odyssey-thezoo.jpg";

const insideStyles = {
  // padding: 20,
  // position: "absolute",
  // top: "50%",
  // left: "50%",
  // transform: "translate(-50%,-50%)",
  color: "white",

  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: 295,
  textShadow: "0px 0px 39px #000",
  margin: "auto",
  padding: 20,
};

const HeroBanner = ({ tagline }) => (
  <Parallax strength={0} style={{ backgroundColor: "black" }}>
    <div style={insideStyles}>
      <Typography
        variant="h1"
        component="h1"
        style={{
          fontSize: "4rem",
          textAlign: "center",
        }}
      >
        {tagline}
      </Typography>
    </div>
    <Background>
      {/* <img src={image1} /> */}
      <Image
        cloudName="opusaffair"
        publicId={randomPhotoId(photoIds)}
        width="1400"
        height="300"
        crop="crop"
        gravity="auto:faces"
        secure="true"
        suppressHydrationWarning={true}
      />
    </Background>
  </Parallax>
);

export default HeroBanner;
