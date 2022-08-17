import React, { useEffect, useRef, useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png'
import pencilIcon from '../assets/icons/pencil/pencil.png'
import { Task } from './TasksList'
import { HandleEditTitleProps } from "../pages/Home";
import IconX from 'react-native-vector-icons'

interface TaskItemProps {
  removeTask: (id: number) => void;
  toggleTaskDone: (id: number) => void;
  editTask: ({title, id}: HandleEditTitleProps) => boolean
  item: Task,
  index: number
}


export function TaskItem({ toggleTaskDone, item, index, removeTask, editTask }: TaskItemProps) {

  const [ isEditing, setIsEditing ] = useState(false)
  const [ newTitle, setNewTitle ] = useState(item.title)
  const textInputRef = useRef<TextInput>(null)

  function handleStartEditing() {
    setIsEditing(true)
  }

  function handleCancelEditing() {
    setNewTitle(item.title)
    setIsEditing(false)
  }

  function handleSubmitEditing() {
    
    const wasEdited = editTask({
      id: item.id,
      title: newTitle
    })

    if(!wasEdited) {
      setNewTitle(item.title)
    }

    setIsEditing(false)

  }

  useEffect(() => {

    if(isEditing) {
      textInputRef.current?.focus()
    } else {
      textInputRef.current?.blur()
    }

  }, [isEditing])

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          //TODO - use onPress (toggle task) prop
          onPress={() => toggleTaskDone(item.id)}
        >
          <View 
            testID={`marker-${index}`}
            //TODO - use style prop 
            style={item.done? styles.taskMarkerDone : styles.taskMarker}
          >
            { item.done && (
              <Icon 
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

            <TextInput
              value={newTitle}
              onChangeText={setNewTitle}
              editable={isEditing}
              onSubmitEditing={handleSubmitEditing}
              style={item.done? styles.taskTextDone : styles.taskText}
              ref={textInputRef}
            />

  
            {/* <Text 
              //TODO - use style prop
              style={item.done? styles.taskTextDone : styles.taskText}
            >
              {item.title}
            </Text> */}
          
        </TouchableOpacity>
        
      </View>
  
      <View style={{flexDirection: 'row'}}>
        
        {
          isEditing? 
          <TouchableOpacity
            onPress={handleCancelEditing}
          >
            <Icon name="x" size={24} color="#b2b2b2"/>
          </TouchableOpacity>
          :
          <TouchableOpacity
            onPress={() => handleStartEditing()}
          >
            <Image source={pencilIcon}/>
          </TouchableOpacity>

        }
        
        <TouchableOpacity
          testID={`trash-${index}`}
          style={{ paddingHorizontal: 24, opacity: isEditing? 0.2 : 1 }}
          //TODO - use onPress (remove task) prop
          onPress={() => removeTask(item.id)}
          disabled={isEditing}
          
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
      </View>
    </>
  )
}



const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  }
})