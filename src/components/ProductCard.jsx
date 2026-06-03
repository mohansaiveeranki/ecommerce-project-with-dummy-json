import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Chip,
  Stack,
  Rating,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const discountPrice =
    product.discountPercentage > 0
      ? product.price - (product.price * product.discountPercentage) / 100
      : product.price;

  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        border: "1px solid rgba(15, 23, 42, 0.08)",
        overflow: "hidden",
        transition: "transform 180ms ease, box-shadow 180ms ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 18px 40px rgba(15, 23, 42, 0.12)",
        },
      }}
    >
      <CardActionArea
        onClick={() => navigate(`/product/${product.id}`)}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
        }}
      >
        <Box
          sx={{
            position: "relative",
            bgcolor: "#eef3f0",
            aspectRatio: { xs: "16 / 11", sm: "4 / 3" },
            p: { xs: 1.5, sm: 2 },
          }}
        >
          {product.discountPercentage > 0 && (
            <Chip
              label={`${Math.round(product.discountPercentage)}% off`}
              size="small"
              sx={{
                position: "absolute",
                top: 12,
                left: 12,
                zIndex: 1,
                bgcolor: "#fff7ed",
                color: "#9a3412",
                fontWeight: 700,
              }}
            />
          )}
          <CardMedia
            component="img"
            image={product.thumbnail}
            alt={product.title}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              mixBlendMode: "multiply",
            }}
          />
        </Box>

        <CardContent sx={{ flexGrow: 1, p: { xs: 2, sm: 2.5 } }}>
          <Typography
            variant="caption"
            sx={{
              color: "primary.dark",
              fontWeight: 800,
              letterSpacing: 0.4,
              textTransform: "uppercase",
            }}
          >
            {product.category}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{
              mt: 0.5,
              minHeight: { xs: "auto", sm: 58 },
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
            }}
          >
            {product.title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              minHeight: { xs: "auto", sm: 42 },
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
            }}
          >
            {product.description}
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            gap={2}
            sx={{ mt: 2.5 }}
          >
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                ${discountPrice.toFixed(2)}
              </Typography>
              {discountPrice !== product.price && (
                <Typography
                  variant="caption"
                  sx={{
                    color: "text.secondary",
                    textDecoration: "line-through",
                  }}
                >
                  ${product.price}
                </Typography>
              )}
            </Box>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Rating
                value={product.rating || 0}
                precision={0.5}
                readOnly
                size="small"
              />
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                {product.rating}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
