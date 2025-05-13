export async function GET() {
    return Response.json({ 
        ID: process.env.GOOGLE_CLIENT_ID,
        SECRET: process.env.GOOGLE_CLIENT_SECRET,
     });
  }