"use client";

import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    // @ts-ignore
    window.Swal.fire({
      title: "Halo!",
      text: "Perkenalkan nama saya Ariq Naufal.",
      icon: "success",
    });
  }, []);

  return null;
}
