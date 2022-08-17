import React from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, TextInputProps } from "react-native";
import trashIcon from '../assets/icons/trash/trash.png'

interface TaskEditingProps extends TextInputProps{
  cancelEdition: (title: string) => void
}

export function TaskEditing({ cancelEdition, ...rest }: TaskEditingProps) {

  return(
    <View style={styles.container}>
      <TextInput style={styles.input} {...rest}/>

      <TouchableOpacity
        onPress={() => cancelEdition('')}
      >
        <Text style={{fontSize: 22, fontWeight: 'normal', color: '#b2b2b2'}}>X</Text>
        {/* <Image source={trashIcon}/> */}
      </TouchableOpacity>
    </View>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 24,
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  input: {
    flex: 1,
    paddingVertical: 2,
    color: 'black',
  }
})