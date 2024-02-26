'use client'

import { RecoilRoot } from "recoil"
import React from "react";
import SSEcontrol from "./sse/SSEcontrol";

export default function RecoilRootProvider({
    children,
} : {
    children: React.ReactNode
}) {
    return (
    <RecoilRoot>
        <SSEcontrol />
        {children}
    </RecoilRoot>
    )
}