import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Typography } from "@mui/material";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const DataTable: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const columns: GridColDef[] = [
    { field: "userId", headerName: "User ID", width: 150 },
    { field: "id", headerName: "ID", width: 150 },
    { field: "title", headerName: "Title", width: 300 },
    { field: "body", headerName: "Body", width: 500 },
  ];

  return (
    <div style={{ height: "600px", margin: "50px 0 100px 0" }}>
      <Typography variant="h4" gutterBottom>
        User Data
      </Typography>
      <DataGrid rows={posts} columns={columns} />
    </div>
  );
};

export default DataTable;
