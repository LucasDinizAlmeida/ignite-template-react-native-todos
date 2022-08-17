import React, { useRef, useState } from 'react';
import { FlatList, Image, TouchableOpacity, View, Text, StyleSheet, FlatListProps, TextInput } from 'react-native';


import { ItemWrapper } from './ItemWrapper';


import { TaskEditing } from './TaskEditing';

import { HandleEditTitleProps } from '../pages/Home';
import { TaskItem } from './TaskItem';

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TasksListProps {
  tasks: Task[];
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: ({title, id}: HandleEditTitleProps) => boolean
}

export function TasksList({ tasks, toggleTaskDone, removeTask, editTask }: TasksListProps) {

  const ref = useRef<HTMLInputElement>()

  const [isEditing, setIsEditing] = useState('')

  const [newTitle, setNewTitle] = useState('')

  return (

    <FlatList
       data={tasks}
      keyExtractor={item => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <ItemWrapper index={index}>

              <TaskItem 
                editTask={editTask}
                index={index}
                item={item}
                toggleTaskDone={toggleTaskDone}
                removeTask={removeTask}
              />
      
          </ItemWrapper>
        )
      }}
      style={{
        marginTop: 32
      }}
    />
  )
}
