import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const HomeScreen = () => {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState([]);

  const saveTodos = async(data)=>{
    try{
      await AsyncStorage.setItem("todos", JSON.stringify(data));
    }catch(e){
     Alert.aler('Save error',e);
    }
  }

  useEffect(()=>{
    const LoadTodos = async()=>{
      try{
      const Stored = await AsyncStorage.getItem('todos');
      if(Stored !==null){
        setTodos(JSON.parse(Stored));
      }
      }
      catch(e){
          Alert.aler('load error',e);
      }
    }
    LoadTodos();
  },[])
  const AddTodo = () => {
    if (text.trim() === '') return;
    const newTodos = [...todos, text]
    setTodos(newTodos);
    saveTodos(newTodos);
    setText('');
  };

 const deleteTodo = (index) => {
  const updatedTodos = todos.filter((_, i) => i !== index);
  setTodos(updatedTodos);
  saveTodos(updatedTodos);
};
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Todo App</Text>
      <View style={styles.container1}>
        <TextInput
          value={text}
          onChangeText={setText}
          style={styles.inputBox}
          placeholder="Enter Todo..."
          placeholderTextColor={color='#111'}
        />
        <TouchableOpacity onPress={AddTodo} style={styles.btn}>
          <Text style={styles.btnText}>Add Todo</Text>
        </TouchableOpacity>
        
        <ScrollView style={{ maxHeight: 500 }}showsVerticalScrollIndicator={false}>
        {

        todos.map((val, index) => {
            return (
                <View style={styles.listscontainer} key={index}>
              <Text style={styles.listText}>{val}</Text>
              <TouchableOpacity 
              onPress={()=>deleteTodo(index)}
              style={styles.btn1}>
                <Text style={styles.btnText}>Delete Todo</Text>
              </TouchableOpacity>
            </View>
          );
        })}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
    padding: 10,
    width:"100%",
    height:"100%",
    borderWidth:2,
    // borderColor:"red",
    backgroundColor:"#111"
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color:"#fff",
    alignSelf:"center",
    letterSpacing:1
  },
  container1: {
    gap: 10,
  },
  inputBox: {
    width: '100%',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth:2,
    borderColor:"#111",
    letterSpacing:1,
    fontWeight:"bold",
  },
  btn: {
    // width: '25%',
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
  },
  btn1:{
    backgroundColor: 'grey',
    padding: 5,
    borderRadius: 10,
    alignSelf: "flex-end",
  },
  btnText:{
    color:"#111",
    letterSpacing:1,
    fontWeight:"bold"
  },
  listscontainer:{
    width:"100%",
    // height:"50%",
    backgroundColor:"#fff",
    borderWidth:2,
    borderColor:"#111",
    padding:10,
    borderRadius:20,
    marginVertical:10
  },
  listText:{
   fontSize:20,
   fontWeight:"bold",
   color:"#111",
   letterSpacing:1
  }
  // https://github.com/Kh-Sohail95/MonthlyPayManager/tree/main
});
export default HomeScreen;
