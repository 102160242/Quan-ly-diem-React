import React, { useEffect } from "react";

export default function EditPage() {
    useEffect(() => {
        document.title = 'Chỉnh sửa';
    }, []);
    return <h1>Hello Edit user!</h1>
}