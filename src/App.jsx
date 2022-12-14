import React from "react";
import { useEffect, useState } from "react";
import {
	Flex,
	Heading,
	useColorMode,
	Button,
	useToast,
} from "@chakra-ui/react";

import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { v4 as uuidv4 } from "uuid";
import Form from "../components/Form";
import Tasks from "../components/Tasks";

function App() {
	const [tasks, setTasks] = useState(() => {
		const savedTasks = localStorage.getItem("tasks");
		if (savedTasks) {
			return JSON.parse(savedTasks);
		} else {
			return [];
		}
	});

	const toast = useToast();

	useEffect(() => {
		localStorage.setItem("tasks", JSON.stringify(tasks));
	}, [tasks]);

	const handleDelete = (id) => {
		setTasks(tasks.filter((task) => task.id !== id));

		toast({
			title: "Success",
			description: "Task Removed",
			status: "success",
			duration: 3000,
			isClosable: true,
		});
	};

	const handleAdd = (name) => {
		let task = {
			id: uuidv4(),
			name: name,
			status: "incomplete",
			date: Date.now(),
		};
		setTasks([...tasks, task]);

		toast({
			title: "Success",
			description: "New Task Added",
			status: "success",
			duration: 3000,
			isClosable: true,
		});
	};

	const handleToggle = (id) => {
		let message = "";
		setTasks(
			tasks.map(function (task) {
				if (task.id === id)
					if (task.status === "complete") {
						task.status = "incomplete";
						message = "Task Marked Incomplete";
					} else {
						task.status = "complete";
						message = "Task Marked Complete";
					}
				return task;
			})
		);

		toast({
			title: "Success",
			description: message,
			status: "success",
			duration: 3000,
			isClosable: true,
		});
	};

	const { theme, toggleTheme } = useColorMode();

	return (
		<Flex direction="column" alignContent="center" alignItems="center">
			<Button onClick={toggleTheme}>
				{theme === "light" ? <MoonIcon /> : <SunIcon />}
			</Button>
			<Flex direction="column">
				<Heading
					mb={2}
					bgGradient="linear(to-r,cyan.400,blue.500,purple.600)"
					bgClip="text"
				>
					Task Manager
				</Heading>

				<Form onAdd={handleAdd} tasks={tasks} />
				<Tasks tasks={tasks} onDelete={handleDelete} onToggle={handleToggle} />
			</Flex>
		</Flex>
	);
}

export default App;