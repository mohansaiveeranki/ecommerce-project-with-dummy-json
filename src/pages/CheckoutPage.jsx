import { useMemo, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LockIcon from "@mui/icons-material/Lock";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { useAuth } from "../context/authContext";
import { useCart } from "../context/cartContext";

const formatCurrency = (value) => `$${value.toFixed(2)}`;

const getItemPrice = (item) =>
  item.discountPercentage > 0
    ? item.price - (item.price * item.discountPercentage) / 100
    : item.price;

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { currentUser, isAuthenticated } = useAuth();
  const { items, itemCount, subtotal, discount, total, clearCart } = useCart();
  const [orderNumber, setOrderNumber] = useState("");
  const [formValues, setFormValues] = useState({
    fullName: currentUser?.name || "",
    email: currentUser?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    delivery: "standard",
    payment: "card",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [error, setError] = useState("");

  const shipping = formValues.delivery === "express" ? 14.99 : 0;
  const tax = useMemo(() => total * 0.08, [total]);
  const grandTotal = total + shipping + tax;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((currentValues) => ({ ...currentValues, [name]: value }));
  };

  const validateForm = () => {
    const requiredFields = [
      "fullName",
      "email",
      "phone",
      "address",
      "city",
      "state",
      "zipCode",
    ];

    if (requiredFields.some((field) => formValues[field].trim() === "")) {
      return "Please complete your shipping details.";
    }

    if (formValues.payment === "card") {
      const cardFields = ["cardName", "cardNumber", "expiry", "cvv"];
      if (cardFields.some((field) => formValues[field].trim() === "")) {
        return "Please complete your card details.";
      }
    }

    return "";
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setOrderNumber(`MN-${Date.now().toString().slice(-8)}`);
    clearCart();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isAuthenticated) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          px: { xs: 2, sm: 3 },
          py: { xs: 4, md: 7 },
          display: "grid",
          placeItems: "center",
          background:
            "linear-gradient(180deg, rgba(247, 248, 246, 1) 0%, rgba(238, 243, 240, 1) 100%)",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            maxWidth: 480,
            p: { xs: 3, sm: 4 },
            textAlign: "center",
            border: "1px solid rgba(15, 23, 42, 0.08)",
            borderRadius: 2,
          }}
        >
          <LockIcon color="primary" sx={{ fontSize: 44, mb: 1 }} />
          <Typography variant="h4" component="h1">
            Log in to checkout
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>
            Your cart is ready. Sign in to add delivery details and place the order.
          </Typography>
          <Button component={RouterLink} to="/login" variant="contained">
            Log in
          </Button>
        </Paper>
      </Box>
    );
  }

  if (orderNumber) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          px: { xs: 2, sm: 3 },
          py: { xs: 4, md: 7 },
          display: "grid",
          placeItems: "center",
          background:
            "linear-gradient(180deg, rgba(247, 248, 246, 1) 0%, rgba(238, 243, 240, 1) 100%)",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            maxWidth: 560,
            p: { xs: 3, sm: 5 },
            textAlign: "center",
            border: "1px solid rgba(15, 23, 42, 0.08)",
            borderRadius: 2,
            boxShadow: "0 20px 50px rgba(15, 23, 42, 0.08)",
          }}
        >
          <CheckCircleIcon color="primary" sx={{ fontSize: 56, mb: 1 }} />
          <Typography variant="h3" component="h1" sx={{ mb: 1 }}>
            Order placed
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Thank you, {currentUser.name}. Your order number is {orderNumber}.
          </Typography>
          <Button
            component={RouterLink}
            to="/"
            variant="contained"
            startIcon={<StorefrontIcon />}
          >
            Continue shopping
          </Button>
        </Paper>
      </Box>
    );
  }

  if (items.length === 0) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          px: { xs: 2, sm: 3 },
          py: { xs: 4, md: 7 },
          display: "grid",
          placeItems: "center",
          background:
            "linear-gradient(180deg, rgba(247, 248, 246, 1) 0%, rgba(238, 243, 240, 1) 100%)",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            maxWidth: 480,
            p: { xs: 3, sm: 4 },
            textAlign: "center",
            border: "1px solid rgba(15, 23, 42, 0.08)",
            borderRadius: 2,
          }}
        >
          <Typography variant="h4" component="h1">
            Your cart is empty
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>
            Add products before starting checkout.
          </Typography>
          <Button component={RouterLink} to="/" variant="contained">
            Browse products
          </Button>
        </Paper>
      </Box>
    );
  }

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
      <Box sx={{ maxWidth: 1180, mx: "auto" }}>
        <Button
          onClick={() => navigate("/cart")}
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 3, bgcolor: "background.paper" }}
        >
          Back to cart
        </Button>

        <Typography variant="h3" component="h1" sx={{ mb: 1 }}>
          Checkout
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Review your order and enter delivery details.
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1fr) 360px" },
            gap: 3,
            alignItems: "start",
          }}
        >
          <Stack spacing={3}>
            {error && <Alert severity="error">{error}</Alert>}

            <Paper
              elevation={0}
              sx={{
                p: { xs: 2.5, sm: 3 },
                border: "1px solid rgba(15, 23, 42, 0.08)",
                borderRadius: 2,
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                <LocalShippingIcon color="primary" />
                <Typography variant="h5">Shipping details</Typography>
              </Stack>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
                  gap: 2,
                }}
              >
                <TextField label="Full name" name="fullName" value={formValues.fullName} onChange={handleChange} required fullWidth />
                <TextField label="Email" name="email" type="email" value={formValues.email} onChange={handleChange} required fullWidth />
                <TextField label="Phone" name="phone" value={formValues.phone} onChange={handleChange} required fullWidth />
                <TextField label="ZIP code" name="zipCode" value={formValues.zipCode} onChange={handleChange} required fullWidth />
                <TextField label="Address" name="address" value={formValues.address} onChange={handleChange} required fullWidth sx={{ gridColumn: { sm: "1 / -1" } }} />
                <TextField label="City" name="city" value={formValues.city} onChange={handleChange} required fullWidth />
                <TextField label="State" name="state" value={formValues.state} onChange={handleChange} required fullWidth />
              </Box>
            </Paper>

            <Paper
              elevation={0}
              sx={{
                p: { xs: 2.5, sm: 3 },
                border: "1px solid rgba(15, 23, 42, 0.08)",
                borderRadius: 2,
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                <CreditCardIcon color="primary" />
                <Typography variant="h5">Payment</Typography>
              </Stack>

              <FormControl sx={{ mb: 2 }}>
                <RadioGroup row name="payment" value={formValues.payment} onChange={handleChange}>
                  <FormControlLabel value="card" control={<Radio />} label="Card" />
                  <FormControlLabel value="cash" control={<Radio />} label="Cash on delivery" />
                </RadioGroup>
              </FormControl>

              {formValues.payment === "card" && (
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
                    gap: 2,
                  }}
                >
                  <TextField label="Name on card" name="cardName" value={formValues.cardName} onChange={handleChange} required fullWidth sx={{ gridColumn: { sm: "1 / -1" } }} />
                  <TextField label="Card number" name="cardNumber" value={formValues.cardNumber} onChange={handleChange} required fullWidth sx={{ gridColumn: { sm: "1 / -1" } }} />
                  <TextField label="MM/YY" name="expiry" value={formValues.expiry} onChange={handleChange} required fullWidth />
                  <TextField label="CVV" name="cvv" value={formValues.cvv} onChange={handleChange} required fullWidth />
                </Box>
              )}
            </Paper>
          </Stack>

          <Paper
            elevation={0}
            sx={{
              p: 3,
              border: "1px solid rgba(15, 23, 42, 0.08)",
              borderRadius: 2,
              position: { lg: "sticky" },
              top: 24,
            }}
          >
            <Typography variant="h5" sx={{ mb: 2 }}>
              Order review
            </Typography>
            <Stack spacing={1.5}>
              {items.map((item) => (
                <Stack key={item.id} direction="row" justifyContent="space-between" gap={2}>
                  <Typography color="text.secondary">
                    {item.quantity} x {item.title}
                  </Typography>
                  <Typography fontWeight={800}>
                    {formatCurrency(getItemPrice(item) * item.quantity)}
                  </Typography>
                </Stack>
              ))}
              <Divider />
              <Stack direction="row" justifyContent="space-between" gap={2}>
                <Typography color="text.secondary">Items</Typography>
                <Typography fontWeight={800}>{itemCount}</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between" gap={2}>
                <Typography color="text.secondary">Subtotal</Typography>
                <Typography fontWeight={800}>{formatCurrency(subtotal)}</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between" gap={2}>
                <Typography color="text.secondary">Discount</Typography>
                <Typography fontWeight={800}>-{formatCurrency(discount)}</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between" gap={2}>
                <Typography color="text.secondary">Tax</Typography>
                <Typography fontWeight={800}>{formatCurrency(tax)}</Typography>
              </Stack>
              <FormControl sx={{ py: 0.5 }}>
                <RadioGroup name="delivery" value={formValues.delivery} onChange={handleChange}>
                  <FormControlLabel value="standard" control={<Radio />} label="Standard delivery - Free" />
                  <FormControlLabel value="express" control={<Radio />} label="Express delivery - $14.99" />
                </RadioGroup>
              </FormControl>
              <Divider />
              <Stack direction="row" justifyContent="space-between" gap={2}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6" color="primary">
                  {formatCurrency(grandTotal)}
                </Typography>
              </Stack>
              <Button type="submit" variant="contained" size="large">
                Place order
              </Button>
            </Stack>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default CheckoutPage;
