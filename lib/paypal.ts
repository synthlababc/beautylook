const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET!;
export const baseUrl = process.env.PAYPAL_API_BASE_URL!;

export async function getPayPalAccessToken() {
    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
    const res = await fetch(`${baseUrl}/v1/oauth2/token`, {
        method: "POST",
        headers: {
            Authorization: `Basic ${auth}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "grant_type=client_credentials",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch PayPal access token");
    }

    const data = await res.json();
    return data.access_token as string;
}
