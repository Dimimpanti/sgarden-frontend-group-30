import { Input as MUIInput, InputAdornment, Typography } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { memo, useEffect, useState } from "react";

const useStyles = makeStyles(() => ({
	search: {
		background: "rgba(255, 255, 255, 0.6)",
		borderRadius: "10px",
		position: "relative",
		padding: "5px 10px",
	},
}));

const Search = ({
	value: searchValue,
	width = "100%",
	onChange,
}) => {
	const classes = useStyles();
	const [value, setValue] = useState(searchValue);

	useEffect(() => {
		setValue(searchValue);
	}, [searchValue]);

	return (
		<MUIInput
			disableUnderline
			type="search"
			value={value}
			name="search"
			className={classes.search}
			sx={{ width }}
			startAdornment={(
				<InputAdornment sx={{ position: "absolute", display: value ? "none" : "flex", marginLeft: "0px" }} position="end">
					<SearchIcon />
					<Typography ml={1}>{"Search"}</Typography>
				</InputAdornment>
			)}
			onChange={onChange}
		/>
	);
};

export default memo(Search);
