import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../components/DataTable";
import DepartmentList from "../components/DepartmentList";

const SecondPage: React.FC = () => {
  const navigate = useNavigate();
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      return;
    }
    isMounted.current = true;

    const userData = localStorage.getItem("userData");
    if (!userData) {
      alert("You must enter your details before accessing this page.");
      navigate("/");
    }
  }, [navigate]);

  return (
    <div>
      <DataTable />
      <DepartmentList />
    </div>
  );
};

export default SecondPage;
