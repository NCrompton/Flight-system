import { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Auth from "./components/Auth"
import Error from "./components/Error"
import "./App.css"
import Exemple from "./components/Exemple"
import { superbase } from "./api/api"
import { User } from "@supabase/supabase-js"
import Animation from "./components/Animate"
import AirlineList from "./components/AirlineList"
import AddForm from "./components/AddForm"
import FlightList from "./components/FlightList"
import AddFlight from "./components/AddFlight"
import {
	Navbar,
	Text,
	Header,
	AppShell,
	MantineProvider,
	ColorSchemeProvider,
	ColorScheme,
	ActionIcon,
	UnstyledButton,
	Group,
	Title,
	Avatar,
	Menu,
} from "@mantine/core"
import { NavLink } from "react-router-dom"
import Flight from "./pages/Flight"
import {
	IconPlane,
	IconAlbum,
	IconBrandNetbeans,
	IconSun,
	IconMoonStars,
	IconLock,
} from "@tabler/icons"
import Airline from "./pages/Airline"
import Login from "./pages/Login"

function App() {
	const [user, setUser] = useState<User>()
	const [colorScheme, setColorScheme] = useState<ColorScheme>("light")
	const toggleColorScheme = (value?: ColorScheme) =>
		setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"))
	const dark = colorScheme === "dark"

	useEffect(() => {
		superbase.auth.getSession().then(({ data, error }) => {
			error ? console.log(error) : setUser(data.session?.user)
		})
	}, [])

	return (
		<div className="app-container">
			<BrowserRouter>
				<ColorSchemeProvider
					colorScheme={colorScheme}
					toggleColorScheme={toggleColorScheme}
				>
					<MantineProvider
						withGlobalStyles
						withNormalizeCSS
						theme={{
							colorScheme: colorScheme,
							colors: {
								// override dark colors to change them for all components
								dark: [
									"#d5d7e0",
									"#acaebf",
									"#8c8fa3",
									"#666980",
									"#4d4f66",
									"#34354a",
									"#2b2c3d",
									"#1d1e30",
									"#0c0d21",
									"#01010a",
								],
							},
						}}
					>
						<AppShell
							padding="md"
							navbar={<Nav />}
							header={<Head dark={dark} toggleColorScheme={toggleColorScheme} />}
						>
							<AppRouter />
						</AppShell>
					</MantineProvider>
				</ColorSchemeProvider>
			</BrowserRouter>
		</div>
	)
}

function Nav() {
	return (
		<Navbar width={{ base: 200 }} p="xs" withBorder={false}>
			<Navbar.Section>
				<Text fz="lg" ta="center" mb="md">
					Flight System
				</Text>
			</Navbar.Section>
			<Navbar.Section grow>
				<MenuSection icon={<IconPlane />} text="Flight" to="/flight" />
				<MenuSection icon={<IconAlbum />} text="Airline" to="/airline" />
			</Navbar.Section>
		</Navbar>
	)
}

function Head({ dark, toggleColorScheme }: { [key: string]: any }) {
	return (
		<Header height={60} style={{ padding: "5px 12px 0 12px" }}>
			<Group position="apart">
				<NavLink to="/" style={{ textDecoration: "none" }}>
					<Title variant="gradient" gradient={{ from: "indigo", to: "cyan", deg: 45 }}>
						<IconBrandNetbeans size={40} />
						Flight Test System
					</Title>
				</NavLink>
				<Group>
					<Menu>
						<Menu.Target>
							<Avatar src="" radius="xl" />
						</Menu.Target>
						<Menu.Dropdown>
							<NavLink to="/login" style={{ textDecoration: "none", color: "#000" }}>
								<Menu.Item icon={<IconLock />}>Login</Menu.Item>
							</NavLink>
						</Menu.Dropdown>
					</Menu>
					<ActionIcon
						variant="outline"
						color={dark ? "yellow" : "blue"}
						onClick={() => toggleColorScheme()}
						title="Toggle color scheme"
					>
						{dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
					</ActionIcon>
				</Group>
			</Group>
		</Header>
	)
}

function AppRouter() {
	return (
		<Routes>
			<Route
				index
				element={
					<Exemple className="page-container">
						<Auth />
						<Error msg="ERROR" />
						<AirlineList />
						<AddForm />
						<FlightList />
						<AddFlight />
					</Exemple>
				}
			/>
			<Route path="/flight" element={<Flight />} />
			<Route path="/airline" element={<Airline />} />
			<Route path="/login" element={<Login />} />
		</Routes>
	)
}

function MenuSection({ icon, text, to }: { [key: string]: any }) {
	return (
		<UnstyledButton
			sx={(theme) => ({
				display: "block",
				width: "100%",
				padding: theme.spacing.xs,
				borderRadius: theme.radius.sm,
				color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

				"&:hover": {
					backgroundColor:
						theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
				},
			})}
			component={Link}
			to={to}
		>
			<Group>
				{icon}
				<Text size="md" sx={{ fontFamily: "Greycliff CF, sans-serif" }}>
					{text}
				</Text>
			</Group>
		</UnstyledButton>
	)
}

export default App
