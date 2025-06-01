// app/reset-password/page.tsx
"use client";
import { Suspense } from "react";

import ResetPasswordForm from "@/components/ResetPasswordForm"; // 把表单抽离成单独组件

export default function ResetPasswordPage() {
    return (
        <Suspense fallback="Loading...">
            <ResetPasswordForm />
        </Suspense>
    );
}