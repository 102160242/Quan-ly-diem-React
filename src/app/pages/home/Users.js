import React, { useEffect } from "react";

export default function MyPage() {
    useEffect(() => {
        document.title = 'Nhân sự';
    }, []);
    return <h1>Hello!</h1>
}