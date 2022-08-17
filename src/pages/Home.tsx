import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export interface HandleEditTitleProps {
  id: number,
  title: string
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    //TODO - add new task

    const isRepeatedTask = tasks.find(item => newTaskTitle === item.title)

    if(isRepeatedTask) {
      return Alert.alert('Task já cadastrada', 'Voce não pode cadastrar tasks com o mesmo nome')
    }

    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    setTasks([...tasks, data])
  }
  

  function handleEditTitle({title, id}: HandleEditTitleProps) {

    const isRepeatedTask = tasks.find(item => item.title === title)
    if(isRepeatedTask) {
      Alert.alert('Essa tarefa já existe')
      return false
    }

    const newTasks = tasks.map(item => {
      if(item.id !== id) return item

      return { ...item, title}
    })

    setTasks(newTasks)
    return true
  }


  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    const newTaskArray = tasks.map(item => {
      if(item.id !== id) return item

      return { ...item, done: !item.done}
    })

    setTasks(newTaskArray)
  }



  function removeTask(id: number) {
    const newTasksArray = tasks.filter(task => task.id !== id)

    setTasks(newTasksArray)
  }


  function handleRemoveTask(id: number) {
    //TODO - remove task from state

    Alert.alert(
      'Remover task',
      'Tem certeza que você deseja remover esse item?',
      [
        {
          text: 'Não',
          onPress: () => {}
        },
        {
          text: 'Sim',
          onPress: () => removeTask(id)
        },

      ]
    )
  }



  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTitle}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})