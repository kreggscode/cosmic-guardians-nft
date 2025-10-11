import express from 'express';
import { PaymentController } from '../controllers/payment.controller';

const router = express.Router();
const paymentController = new PaymentController();

// Get supported currencies and prices
router.get('/currencies', paymentController.getSupportedCurrencies);

// Calculate price in different currency
router.post('/calculate', paymentController.calculatePrice);

// Create payment intent
router.post('/create', paymentController.createPayment);

// Check payment status
router.get('/status/:paymentId', paymentController.getPaymentStatus);

// Webhook for payment confirmation (for external payment gateways)
router.post('/webhook', paymentController.handleWebhook);

export default router;
