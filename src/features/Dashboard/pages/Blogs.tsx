import { useState } from "react"
import type { BlogPayload } from "../../../types/blog.types"

const initialState:BlogPayload = {
  id: null,
  authorId: null,
  title: "",
  content:""
}

export const Blogs = function () {

  const [data, setData] = useState();
  const [currentPage, setCurrentPage] = useState();
  const [totalPages, setTotalPages] = useState();
  const [limit, setLimit] = useState();

  return (
    <h1>BLOGSSSSSSSss</h1>
  )
}
