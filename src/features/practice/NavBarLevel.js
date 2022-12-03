import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

// import styles from './Practice.module.css';

function NavBarLevel({ onChangeSearch, setValue }) {
  return (
    <>
      <FormControl>
        <Select
          value={setValue}
          onChange={(e) => onChangeSearch(e.target.value)}
          sx={{ backgroundColor: "white", height: "31px", marginLeft: "10px" }}
        >
          <MenuItem value={0}>Tất cả</MenuItem>
          <MenuItem value={1}>Dễ</MenuItem>
          <MenuItem value={2}>Khó</MenuItem>
          <MenuItem value={3}>Trung Bình</MenuItem>
        </Select>
      </FormControl>
    </>
  );
}

export default NavBarLevel;
