import React from "react";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

function DoMode({ onChangeMode, setValue }) {
  return (
    <>
      <FormControl>
        <Select
          value={setValue}
          onChange={(e) => onChangeMode(e.target.value)}
          sx={{ backgroundColor: "white", height: "31px", marginLeft: "10px" }}
        >
          <MenuItem value={0}>Bình Thường</MenuItem>
          <MenuItem value={1}>Luyện Tập</MenuItem>
          {/* <MenuItem value={2}>Khó</MenuItem>
          <MenuItem value={3}>Trung Bình</MenuItem> */}
        </Select>
      </FormControl>
    </>
  );
}

export default DoMode;
