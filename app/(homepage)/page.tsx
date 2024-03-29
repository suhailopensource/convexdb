"use client";

import { Loading } from "@/components/auth/loading";
import { UploadArea } from "@/components/shared/UploadArea";
import Inputforgrp from "@/components/shared/inputforgrp";
import { api } from "@/convex/_generated/api";
import { UserButton } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const page = () => {
  const store = useMutation(api.users.store);
  const groups = useQuery(api.groups.listGroups, {});
  const images = useQuery(api.files.list)!;

  useEffect(() => {
    const storeUser = async () => {
      await store({});
    };

    storeUser();
  }, [store]);

  if (groups === undefined) {
    return <Loading />;
  }

  console.log(images);

  return (
    <div>
      <UserButton />
      <Inputforgrp />
      <div>
        {groups.map((group, idx) => {
          return <div key={group._id}>{group.name}</div>;
        })}
      </div>

      <UploadArea />

      <br></br>

      {images.map((image, idx) => {
        return (
          <Image
            key={idx}
            src={image.imageUrl!}
            height={300}
            width={300}
            alt="image"
          />
        );
      })}
    </div>
  );
};

export default page;
