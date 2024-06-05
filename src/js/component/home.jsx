import React, { useEffect, useState } from "react";
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [tarea, setTarea] = useState("");
	const [tareas, setTareas] = useState([]);

	
	const getAllData = async () => {
		const data = await fetch('https://playground.4geeks.com/todo/users/jaume153');
		if (data.ok) {
			const dataJson = await data.json();
			setTareas(dataJson.todos);
		}
	};

	
	const manejarCambioTarea = (event) => {
		setTarea(event.target.value);
	};


	const manejarEnvioTarea = (event) => {
		event.preventDefault();
		if (tarea.trim() === "") return;
		setTareas([...tareas, { label: tarea, done: false }]);
		setTarea("");
	};

	
	const manejarEliminarTarea = (index) => {
		const nuevasTareas = tareas.filter((_, tareaIndex) => tareaIndex !== index);
		setTareas(nuevasTareas);
	};

	
	const manejarEliminarTodasTareas = () => {
		setTareas([]);
	};

	
	const manejarTeclaEnter = (event) => {
		if (event.key === "Enter") {
			manejarEnvioTarea(event);
		}
	};

	
	const contarTareas = () => {
		return tareas.length === 1 ? "1 tarea pendiente" : `${tareas.length} tareas pendientes`;
	};

	
	useEffect(() => {
		getAllData();
	}, []);

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
