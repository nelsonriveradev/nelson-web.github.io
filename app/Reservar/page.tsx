"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
export default function MyApp() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "reunion-de-desarrollo" });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);
  return (
    <div className="p-4 mt-15 ">
      <h1 className="text-center mx-auto text-bold text-4xl">
        Reserva una reunión conmigo
      </h1>
      <Cal
        namespace="reunion-de-desarrollo"
        calLink="nelson-rivera-ltqlxs/reunion-de-desarrollo"
        style={{ width: "100%", height: "60%", overflow: "scroll" }}
        config={{ layout: "month_view" }}
      />
    </div>
  );
}
