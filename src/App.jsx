import React, { useState } from "react";
import { Box, Container } from "@mui/material";
import Header from "./components/Header";
import Form from "./components/Form";
import { useApp } from "./ThemedApp";
import Item from "./components/Item";
const App = () => {
	const { showForm, setShowForm, setGlobalMsg } = useApp();
	const [data,setData] = useState([
		{id:3, name:"John", content: "Yay, interesting."},
		{id:2, name:"Jane", content: "Wow, amazing."},
		{id:1, name:"Doe", content: "Cool, awesome."},
	]);

	const remove = (id) => {
		const newData = data.filter((item) => item.id !== id);
		setData(newData);
		setGlobalMsg({ msg: "Item removed", severity: "success" });
	}
	const add = (item) => {
		setData([...data, item]);
		setGlobalMsg({ msg: "Item added", severity: "success" });
	}
	return (
		<>
			<Header />
			<Container maxWidth="sm" sx={{ mt: 4 }}>
				{showForm && (

					<Form add={add} onClose={() => setShowForm(false)} />

				)}
				{
					data.map((item) => (
						<Item key={item.id} item={item} remove={remove} />
					))
				}



			</Container>
		</>
	);
};

export default App;
