"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation"; // Importing useRouter directly
import React, { useState } from "react";

const Inputforgrp = () => {
  const router = useRouter(); // Using useRouter directly in the component
  const [name, setName] = useState("");

  const createGroup = useMutation(api.groups.createGroup);

  const clickHandler = async () => {
    const id = await createGroup({ name });
    router.push(`/${id}`);
  };

  return (
    <div>
      <Input value={name} onChange={(e) => setName(e.target.value)} />
      <Button onClick={clickHandler}>Create</Button>
    </div>
  );
};

export default Inputforgrp;
