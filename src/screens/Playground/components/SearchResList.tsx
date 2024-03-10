import { useEffect } from "react"

export default function SearchResList({ searchContent }: { searchContent: string }) {

    useEffect(() => {
        console.log(searchContent);
    }, [searchContent])
    return (
        <>
        </>
    )
}
