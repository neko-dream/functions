import type { LoaderFunctionArgs } from "@remix-run/node";
import { openReverseGeocoder } from "@geolonia/open-reverse-geocoder";

export const loader = async ({request}: LoaderFunctionArgs) => {
    try {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get("lat") || "";
    const lng = searchParams.get("lng") || "";
    const result = await openReverseGeocoder([Number(lng), Number(lat)]);

    return new Response(JSON.stringify(result), {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (e) {
    console.log(e);
    return new Response("Error", { status: 500 });
  }
}
