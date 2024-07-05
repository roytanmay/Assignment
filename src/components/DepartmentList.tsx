import React, { useState } from "react";
import {
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Typography } from "@mui/material";

interface DepartmentData {
  department: string;
  sub_departments: string[];
}

const departmentData: DepartmentData[] = [
  {
    department: "customer_service",
    sub_departments: ["support", "customer_success"],
  },
  {
    department: "design",
    sub_departments: ["graphic_design", "product_design", "web_design"],
  },
];

const DepartmentList: React.FC = () => {
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
  const [selected, setSelected] = useState<{ [key: string]: boolean }>({});

  const handleExpandClick = (department: string) => {
    setExpanded((prev) => ({ ...prev, [department]: !prev[department] }));
  };

  const handleSelectClick = (
    id: string,
    isSub: boolean = false,
    parentId?: string
  ) => {
    setSelected((prev) => {
      const newSelected = { ...prev, [id]: !prev[id] };
      if (!isSub) {
        // If selecting a department, select/deselect all sub-departments
        departmentData
          .find((dep) => dep.department === id)
          ?.sub_departments.forEach((sub) => {
            newSelected[sub] = newSelected[id];
          });
      } else if (parentId !== undefined) {
        // If selecting a sub-department, check/uncheck parent if all sub-departments are selected
        const parent = departmentData.find(
          (dep) => dep.department === parentId
        );
        if (parent) {
          const allSelected = parent.sub_departments.every(
            (sub) => newSelected[sub]
          );
          newSelected[parentId] = allSelected;
        }
      }
      return newSelected;
    });
  };

  return (
    <div style={{ maxWidth: "300px", margin: "20px 0 100px 50px" }}>
      <Typography variant="h4" gutterBottom>
        Select Department
      </Typography>
      <List>
        {departmentData.map((department) => (
          <React.Fragment key={department.department}>
            <ListItem
              onClick={() => handleExpandClick(department.department)}
              style={{ cursor: "pointer" }}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={selected[department.department] || false}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectClick(department.department);
                  }}
                />
              </ListItemIcon>
              <ListItemText primary={department.department} />
              <IconButton
                edge="end"
                onClick={(e) => {
                  e.stopPropagation();
                  handleExpandClick(department.department);
                }}
              >
                {expanded[department.department] ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )}
              </IconButton>
            </ListItem>
            {expanded[department.department] &&
              department.sub_departments.map((sub) => (
                <ListItem key={sub} style={{ paddingLeft: "2em" }}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={selected[sub] || false}
                      onClick={() =>
                        handleSelectClick(sub, true, department.department)
                      }
                    />
                  </ListItemIcon>
                  <ListItemText primary={sub} />
                </ListItem>
              ))}
          </React.Fragment>
        ))}
      </List>
    </div>
  );
};

export default DepartmentList;
