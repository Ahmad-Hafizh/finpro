/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Alert,
  CircularProgress,
  Typography,
  InputLabel,
  styled,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useRouter } from "next/navigation";
import { callAPI } from "@/config/axios";
import { useSession } from "next-auth/react";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  whiteSpace: "nowrap",
  width: 1,
});

interface PaymentProofFormProps {
  orderId: string;
}

const PaymentProofForm: React.FC<PaymentProofFormProps> = ({ orderId }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [file, setFile] = useState<File | null>(null);
  const [filename, setFilename] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setFilename(selectedFile.name);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Please choose the file for payment proof first.");
      return;
    }
    setError(null);
    setLoading(true);

    const allowedExtensions = ["jpg", "jpeg", "png"];
    const fileExt = file.name.split(".").pop()?.toLowerCase();
    if (!fileExt || !allowedExtensions.includes(fileExt)) {
      setError("Format Invalid. Only .jpg, .jpeg, .png are allowed.");
      setLoading(false);
      return;
    }
    if (file.size > 1024 * 1024) {
      setError("File size exceeds maximum 1MB.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("proof", file);

    try {
      const token = session?.user?.auth_token;
      await callAPI.post(`/order/${orderId}/payment-proof`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage("Payment proof is successfully uploaded!");
      setTimeout(() => {
        router.push("/payment-proof");
      }, 1500);
    } catch (err: any) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ mb: 4 }}>
        <InputLabel
          htmlFor="payment-proof"
          sx={{
            color: "text.primary",
            fontWeight: 600,
            mb: 1.5,
            display: "flex",
            alignItems: "center",
          }}
        >
          <CloudUploadIcon sx={{ mr: 1, fontSize: 20 }} /> Upload Payment Proof
        </InputLabel>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", mb: 2 }}
        >
          Allowed format: JPG, JPEG, PNG (Maks. 1MB)
        </Typography>
        <Box
          sx={{
            border: "2px dashed",
            borderColor: file ? "primary.main" : "divider",
            borderRadius: 2,
            p: 3,
            textAlign: "center",
            bgcolor: file ? "primary.light" : "background.paper",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              borderColor: "primary.main",
              bgcolor: "rgba(87, 204, 153, 0.08)",
            },
          }}
        >
          {filename ? (
            <Typography color="primary.dark" fontWeight={500}>
              {filename}
            </Typography>
          ) : (
            <Typography color="text.secondary">
              Click or drag here to choose the file.
            </Typography>
          )}
          <Button
            component="label"
            variant="contained"
            sx={{
              mt: 2,
              bgcolor: file ? "primary.dark" : "primary.main",
              "&:hover": { bgcolor: "primary.dark" },
            }}
            startIcon={<CloudUploadIcon />}
          >
            {file ? "Change File" : "Choose File"}
            <VisuallyHiddenInput
              id="payment-proof"
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={handleFileChange}
            />
          </Button>
        </Box>
      </Box>
      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
          {error}
        </Alert>
      )}
      {message && (
        <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
          {message}
        </Alert>
      )}
      <Button
        type="submit"
        variant="contained"
        fullWidth
        size="large"
        disabled={loading || !file}
        sx={{
          py: 1.5,
          fontSize: "1rem",
          bgcolor: "primary.main",
          "&:hover": { bgcolor: "primary.dark" },
        }}
        startIcon={
          loading ? <CircularProgress size={20} color="inherit" /> : null
        }
      >
        {loading ? "Is Uploading..." : "Confirm the Payment"}
      </Button>
    </form>
  );
};

export default PaymentProofForm;
