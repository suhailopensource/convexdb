import { Id } from "@/convex/_generated/dataModel";
import React from "react";

interface pageProps {
  params: {
    groupId: Id<"groups">;
  };
}

const page = ({ params }: pageProps) => {
  return <div> lol</div>;
};

export default page;
