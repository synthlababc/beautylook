declare module '@paypal/checkout-server-sdk' {
    import { PayPalHttpClient } from '@paypal/checkout-server-sdk/lib/core';
    import { OrdersCaptureRequest } from '@paypal/checkout-server-sdk/lib/orders';

    export const core: {
        SandboxEnvironment: typeof import('@paypal/checkout-server-sdk/lib/core').SandboxEnvironment;
        ProductionEnvironment: typeof import('@paypal/checkout-server-sdk/lib/core').ProductionEnvironment;
        PayPalHttpClient: typeof import('@paypal/checkout-server-sdk/lib/core').PayPalHttpClient;
    };

    export { OrdersCaptureRequest };
}