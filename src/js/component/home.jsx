import React, { useEffect, useState } from "react";
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [tarea, setTarea] = useState("");
	const [tareas, setTareas] = useState([]);
	const [name] = useState("jaume153");
	const [añadirTarea] = useState(false);


	const obtenerTodasLasTareas = async () => {		
			const response = await fetch(`https://playground.4geeks.com/todo/users/${name}`);
			if (response.ok) {
				const dataJson = await response.json();
				setTareas(Array.isArray(dataJson.todos) ? dataJson.todos : []);				
			} else {
				console.error("Error al obtener tareas:", response.statusText);
			}		
	};


	const crearNuevaTarea = async (event) => {
		event.preventDefault();
		const nuevaTarea = { label: tarea, done: añadirTarea };
		const response = await fetch(`https://playground.4geeks.com/todo/todos/${name}`, {
			method: 'POST',
			body: JSON.stringify(nuevaTarea),
			headers: { "Content-Type": "application/json" }
		});

		if (response.ok) {
			const dataJson = await response.json();
			setTareas([...tareas, dataJson]);
			setTarea("");
		} else {
			console.error("Error al crear nueva tarea:", response.statusText);
		}
	};


	const eliminarTarea = async (todoId) => {
		const response = await fetch(`https://playground.4geeks.com/todo/todos/${todoId}`, {
			method: 'DELETE'
		});
		if (response.ok) {
			setTareas(tareas.filter((item) => item.id !== todoId));
		} else {
			console.error("Error al eliminar tarea:", response.statusText);
		}
	};


	const eliminarTodasLasTareas = async () => {		
			const eliminarTareas = tareas.map((item) =>
				fetch(`https://playground.4geeks.com/todo/todos/${item.id}`, { method: 'DELETE' })
			);
			await Promise.all(eliminarTareas);
			setTareas([]);
		
	};


	const manejarEnvioTarea = (event) => {
		event.preventDefault();
		crearNuevaTarea(event);
	};


	const manejarCambioTarea = (event) => {
		setTarea(event.target.value);
	};


	const manejarTeclaEnter = (event) => {
		if (event.key === "Enter") {
			manejarEnvioTarea(event);
		}
	};


	const manejarEliminarTarea = (index) => {
		const tareaId = tareas[index].id;
		eliminarTarea(tareaId);
	};


	const manejarEliminarTodasTareas = () => {
		eliminarTodasLasTareas();
	};


	const contarTareas = () => {
		return tareas.length === 0 ? "No hay tareas pendientes" : `Tareas pendientes: ${tareas.length}`;
	};

	useEffect(() => {
		obtenerTodasLasTareas();
	}, []);

	useEffect(() => {
		setTarea("");
	  }, [tareas]);

	return (
		<div className="container">
			<h1 className="text-center mt-5 text-primary">LISTA DE TAREAS</h1>
			<form onSubmit={manejarEnvioTarea}>
				<div className="mb-3">
					<input
						type="text"
						className="form-control"
						id="tareaInput"
						value={tarea}
						onChange={manejarCambioTarea}
						onKeyDown={manejarTeclaEnter}
						placeholder="Escribe tu tarea"
					/>
				</div>
			</form>
			<ul className="list-group mt-3">
				{tareas.length === 0 && (
					<li className="list-group-item text-center">No hay tareas, añadir tareas</li>
				)}
				{tareas.map((tarea, index) => (
					<li
						key={index}
						className="list-group-item d-flex justify-content-between align-items-center"
					>
						<span>{tarea.label}</span>
						<span className="delete-icon" onClick={() => manejarEliminarTarea(index)}>x</span>
					</li>
				))}
			</ul>
			<div className="mt-3">
				<p className="text-start text-black-50">{contarTareas()}</p>
			</div>
			<div className="mt-3 text-center">
				<button className="btn btn-danger" onClick={manejarEliminarTodasTareas}>
					Limpiar todas las tareas
				</button>
			</div>
		</div>
	);
};

export default Home;