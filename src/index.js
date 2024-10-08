import { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { Route, Routes, BrowserRouter as Router, useLocation } from "react-router-dom";
import { StyledEngineProvider, ThemeProvider, createTheme } from "@mui/material/styles";
import * as Sentry from "@sentry/browser";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ErrorBoundary } from "react-error-boundary";
import { CssBaseline } from "@mui/material";

import "./index.scss";
import colors from "./_colors.scss";
import "react-table-6/react-table.css";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import Protected from "./components/Protected.js";
import GuestOnly from "./components/GuestOnly.js";
import ErrorFallback from "./components/ErrorFallback.js";
import Snackbar from "./components/Snackbar.js";
import NotFound from "./screens/NotFound.js";
import SignIn from "./screens/SignIn.js";
import ForgotPassword from "./screens/ForgotPassword.js";
import ResetPassword from "./screens/ResetPassword.js";
import SignUp from "./screens/SignUp.js";
import InvitedSignUp from "./screens/InvitedSignUp.js";
import Auth from "./screens/Auth.js";
import Examples from "./screens/Examples.js";
import Home from "./screens/Home.js";
import Users from "./screens/Users.js";
import ButtonsExample from "./examples/Buttons.js";
import CardExample from "./examples/Card.js";
import FormExample from "./examples/Form.js";
import DropdownExample from "./examples/Dropdown.js";
import TooltipExample from "./examples/Tooltip.js";
import TableExample from "./examples/Table.js";
import FileUploadExample from "./examples/FileUpload.js";
import BrokerExample from "./examples/Broker.js";
import PlotExample from "./examples/Plot.js";
import AccordionExample from "./examples/Accordion.js";
import SearchExample from "./examples/Search.js";
import ToastExample from "./examples/Toast.js";
import PopupExample from "./examples/Popup.js";
import DialogExample from "./examples/Dialog.js";
import DatePickerExample from "./examples/DatePicker.js";
import LocalizationExample from "./examples/Localization.js";
import { adjustColors, jwt, colorSuggestions } from "./utils/index.js";

import "./i18n.js";

const {
	NODE_ENV,
	REACT_APP_SENTRY_DSN,
	REACT_APP_SENTRY_ENVIRONMENT,
} = process.env;

Sentry.init({
	dsn: REACT_APP_SENTRY_DSN,
	environment: REACT_APP_SENTRY_ENVIRONMENT,
	ignoreErrors: [
		"ResizeObserver loop limit exceeded",
		"Non-Error promise rejection captured",
	],
	enabled: NODE_ENV === "production",
});

const theme = createTheme({
	palette: {
		primary: { main: colors.primary },
		secondary: { main: colors.secondary || colorSuggestions.secondary },
		third: { main: colors.third || colorSuggestions.third },

		primaryLight: { main: adjustColors(colors.primary, 100) },
		primaryDark: { main: adjustColors(colors.primary, -80) },
		secondaryLight: { main: adjustColors(colors.secondary || colorSuggestions.secondary, 100) },
		secondaryDark: { main: adjustColors(colors.secondary || colorSuggestions.secondary, -80) },
		thirdLight: { main: adjustColors(colors.third || colorSuggestions.third, 100) },
		thirdDark: { main: adjustColors(colors.third || colorSuggestions.third, -80) },

		success: { main: colors.success },
		error: { main: colors.error },
		warning: { main: colors.warning },
		info: { main: colors.info },

		dark: { main: colors.dark },
		light: { main: colors.light },
		grey: { main: colors.grey },
		greyDark: { main: colors.greyDark },
		green: { main: colors.green },
		white: { main: "#ffffff" },
	},
});

const App = () => {
	const location = useLocation();
	const [authenticated, setAuthenticated] = useState(false);

	useEffect(() => {
		setAuthenticated(jwt.isAuthenticated());
	}, [location]);

	return (
		<StyledEngineProvider injectFirst>
			<CssBaseline />
			<ThemeProvider theme={theme}>
				<ErrorBoundary FallbackComponent={ErrorFallback}>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<Header isAuthenticated={authenticated} />
						<main style={{ position: "relative", zIndex: 0, height: `calc(100vh - ${authenticated ? "160" : "70"}px)` }}>
							<Routes>
								<Route index element={<GuestOnly c={<SignIn />} />} />
								<Route path="auth" element={<GuestOnly c={<Auth />} />} />
								<Route path="forgot-password" element={<GuestOnly c={<ForgotPassword />} />} />
								<Route path="reset-password" element={<GuestOnly c={<ResetPassword />} />} />
								<Route path="sign-up" element={<GuestOnly c={<SignUp />} />} />
								<Route path="register" element={<GuestOnly c={<InvitedSignUp />} />} />
								<Route path="home" element={<Protected c={<Home />} />} />
								<Route path="examples" element={<Protected c={<Examples />} />} />
								<Route path="users" element={<Protected c={<Users />} />} />
								{/* EXAMPLES */}
								<Route path="buttons" element={<Protected c={<ButtonsExample />} />} />
								<Route path="card" element={<Protected c={<CardExample />} />} />
								<Route path="form" element={<Protected c={<FormExample />} />} />
								<Route path="dropdown" element={<Protected c={<DropdownExample />} />} />
								<Route path="tooltip" element={<Protected c={<TooltipExample />} />} />
								<Route path="table" element={<Protected c={<TableExample />} />} />
								<Route path="file-upload" element={<Protected c={<FileUploadExample />} />} />
								<Route path="broker" element={<Protected c={<BrokerExample />} />} />
								<Route path="plot" element={<Protected c={<PlotExample />} />} />
								<Route path="accordion" element={<Protected c={<AccordionExample />} />} />
								<Route path="search" element={<Protected c={<SearchExample />} />} />
								<Route path="toast" element={<Protected c={<ToastExample />} />} />
								<Route path="popup" element={<Protected c={<PopupExample />} />} />
								<Route path="dialog" element={<Protected c={<DialogExample />} />} />
								<Route path="datepicker" element={<Protected c={<DatePickerExample />} />} />
								<Route path="localization" element={<Protected c={<LocalizationExample />} />} />
								{/* END OF EXAMPLES */}
								<Route path="*" element={<NotFound />} />
							</Routes>
						</main>
						{authenticated && <Footer /> }
						<Snackbar />
					</LocalizationProvider>
				</ErrorBoundary>
			</ThemeProvider>
		</StyledEngineProvider>
	);
};

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
	<Router>
		<App />
	</Router>,
);
