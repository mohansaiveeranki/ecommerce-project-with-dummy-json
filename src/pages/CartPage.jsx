import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { useAuth } from "../context/authContext";
import { useCart } from "../context/cartContext";

const formatCurrency = (value) => `$${value.toFixed(2)}`;

const getItemPrice = (item) =>
  item.discountPercentage > 0
    ? item.price - (item.price * item.discountPercentage) / 100
    : item.price;

const CartPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    itemCount,
    subtotal,
    discount,
    total,
  } = useCart();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 3, md: 5 },
        background:
          "linear-gradient(180deg, rgba(247, 248, 246, 1) 0%, rgba(238, 243, 240, 1) 100%)",
      }}
    >
      <Box sx={{ maxWidth: 1120, mx: "auto" }}>
        <Button
          onClick={() => navigate("/")}
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 3, bgcolor: "background.paper" }}
        >
          Continue shopping
        </Button>

        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems={{ xs: "stretch", md: "flex-start" }}
          gap={3}
        >
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="h3" component="h1" sx={{ mb: 1 }}>
              Shopping cart
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              {itemCount} {itemCount === 1 ? "item" : "items"} ready for checkout
            </Typography>

            {!isAuthenticated && items.length > 0 && (
              <Alert severity="info" sx={{ mb: 2 }}>
                Log in or register before checkout to keep your order details.
              </Alert>
            )}

            {items.length === 0 ? (
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, sm: 5 },
                  textAlign: "center",
                  border: "1px solid rgba(15, 23, 42, 0.08)",
                  borderRadius: 2,
                }}
              >
                <Typography variant="h5">Your cart is empty</Typography>
                <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>
                  Add a few products and they will appear here.
                </Typography>
                <Button component={RouterLink} to="/" variant="contained">
                  Browse products
                </Button>
              </Paper>
            ) : (
              <Stack spacing={2}>
                {items.map((item) => (
                  <Paper
                    key={item.id}
                    elevation={0}
                    sx={{
                      p: { xs: 2, sm: 2.5 },
                      border: "1px solid rgba(15, 23, 42, 0.08)",
                      borderRadius: 2,
                    }}
                  >
                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      alignItems={{ xs: "stretch", sm: "center" }}
                      gap={2}
                    >
                      <Box
                        sx={{
                          width: { xs: "100%", sm: 110 },
                          aspectRatio: "1 / 1",
                          bgcolor: "#eef3f0",
                          borderRadius: 2,
                          display: "grid",
                          placeItems: "center",
                          p: 1.5,
                          flexShrink: 0,
                        }}
                      >
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                          }}
                        />
                      </Box>

                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="h6">{item.title}</Typography>
                        <Typography color="text.secondary">
                          {item.brand || "MarketNest"} | {formatCurrency(getItemPrice(item))}
                        </Typography>
                      </Box>

                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent={{ xs: "space-between", sm: "flex-end" }}
                        gap={1}
                      >
                        <Stack
                          direction="row"
                          alignItems="center"
                          sx={{
                            border: "1px solid rgba(15, 23, 42, 0.14)",
                            borderRadius: 2,
                            overflow: "hidden",
                          }}
                        >
                          <IconButton
                            aria-label={`Decrease quantity for ${item.title}`}
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            size="small"
                          >
                            <RemoveIcon fontSize="small" />
                          </IconButton>
                          <Typography
                            sx={{
                              minWidth: 36,
                              textAlign: "center",
                              fontWeight: 800,
                            }}
                          >
                            {item.quantity}
                          </Typography>
                          <IconButton
                            aria-label={`Increase quantity for ${item.title}`}
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            size="small"
                          >
                            <AddIcon fontSize="small" />
                          </IconButton>
                        </Stack>
                        <IconButton
                          aria-label={`Remove ${item.title} from cart`}
                          onClick={() => removeFromCart(item.id)}
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    </Stack>
                  </Paper>
                ))}
              </Stack>
            )}
          </Box>

          <Paper
            elevation={0}
            sx={{
              width: { xs: "100%", md: 340 },
              p: 3,
              border: "1px solid rgba(15, 23, 42, 0.08)",
              borderRadius: 2,
              position: { md: "sticky" },
              top: 24,
            }}
          >
            <Typography variant="h5" sx={{ mb: 2 }}>
              Order summary
            </Typography>
            <Stack spacing={1.5}>
              <Stack direction="row" justifyContent="space-between" gap={2}>
                <Typography color="text.secondary">Subtotal</Typography>
                <Typography fontWeight={800}>{formatCurrency(subtotal)}</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between" gap={2}>
                <Typography color="text.secondary">Discount</Typography>
                <Typography fontWeight={800}>-{formatCurrency(discount)}</Typography>
              </Stack>
              <Divider />
              <Stack direction="row" justifyContent="space-between" gap={2}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6" color="primary">
                  {formatCurrency(total)}
                </Typography>
              </Stack>
              <Button
                variant="contained"
                size="large"
                startIcon={<ShoppingCartCheckoutIcon />}
                disabled={items.length === 0}
                component={RouterLink}
                to={isAuthenticated ? "/checkout" : "/login"}
              >
                {isAuthenticated ? "Checkout" : "Log in to checkout"}
              </Button>
              <Button disabled={items.length === 0} onClick={clearCart}>
                Clear cart
              </Button>
            </Stack>
          </Paper>
        </Stack>
      </Box>
    </Box>
  );
};

export default CartPage;
