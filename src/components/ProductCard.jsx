import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  CircularProgress,
} from "@mui/material";

export default function ProductCard({ product }) {
  return (
    <Card sx={{ maxWidth: 345, height: "100%" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={product.thumbnail}
          alt={product.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.title}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {product.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
