'use client'

import { useParams } from "next/navigation"

const Document = () => {
    const params = useParams<{id: string}>()
  return (
    <div>Document:{params.id}</div>
  )
}

export default Document