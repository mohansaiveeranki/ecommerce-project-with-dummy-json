import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };
  return (
    <Card sx={{ maxWidth: 345, height: "100%" }}>
      <CardActionArea onClick={handleCardClick}>
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
