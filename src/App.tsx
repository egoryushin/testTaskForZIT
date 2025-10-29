import { useState } from 'react'
import { InitialTodos } from './data/todos'
import type { Todo } from './types/todo.types'

function App() {
	const [todos, setTodos] = useState<Todo[]>(InitialTodos)
	const [task, setTask] = useState<string>('')

	// функция для обработки изменения в инпуте
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTask(e.target.value)
	}

	// функция для добавления новой задачи
	const handleAddTodo = (e: React.FormEvent) => {
		e.preventDefault() // предотвращение перезагрузки страницы при сабмите формы

		// проверка на пустой ввод
		if (task.trim().length === 0) {
			alert('Добавь задачу')
			return
		}

		const newTodo: Todo = {
			id: todos.length + 1,
			title: task,
			isCompleted: false,
		}

		setTodos([...todos, newTodo])

		setTask('') // очистка инпута после добавления задачи
	}

	// функция для изменения статуса задачи
	const handleChangeTodoStatus = (id: number) => {
		const updatedTodos = todos.map(todo =>
			todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
		)
		setTodos(updatedTodos)
	}
	// функция для удаления задачи
	const handleDeleteTodo = (id: number) => {
		const filteredTodos = todos.filter(todo => todo.id !== id)
		setTodos(filteredTodos)
	}

	return (
		<div className='p-4 mx-auto w-84'>
			<h1 className='text-4xl mb-4'>Список задач</h1>
			<form onSubmit={handleAddTodo}>
				<input
					type='text'
					name='Задача'
					placeholder='Добавь задачу'
					value={task}
					onChange={handleInputChange}
					className='border mx-auto w-84 p-2'
				/>
			</form>
			<ul className='text-white p-4'>
				{todos.map(todo => (
					<li key={todo.id} className='flex gap-4 mb-8 items-center'>
						<h3 className='text-2xl mb-2'>{todo.title}</h3>
						<input
							type='checkbox'
							checked={todo.isCompleted}
							onChange={() => handleChangeTodoStatus(todo.id)}
							className='cursor-pointer'
						/>
						<span>{todo.isCompleted}</span>
						<button
							className='cursor-pointer'
							onClick={() => handleDeleteTodo(todo.id)}>
							удалить
						</button>
					</li>
				))}
			</ul>
		</div>
	)
}

export default App
