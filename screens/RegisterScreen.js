import { StyleSheet, Text, View, SafeAreaView, Image, Pressable,Alert, KeyboardAvoidingView, TextInput } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const RegisterScreen = () => {
  const [email, setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [name, setName] = useState("")
  const navigation = useNavigation()


  const handleRegister = () => {
    const user = {
      name:name,
      email:email,
      password:password
    }

    console.log(user)

    axios
    .post("http://192.168.0.37:3000/register/",user)
    .then((response) => {
      console.log(response)
      Alert.alert("회원가입이 완료되었습니다.")
      setName("")
      setEmail("")
      setPassword("")
    })
    .catch((error) => {
      Alert.alert("회원가입도중 에러가 발생하였습니다!")
      console.log("rego page error",error)
    })
  }

  return (
    <SafeAreaView style={{flex:1,backgroundColor:"white",alignItems:"center"}}>
      <View style={{marginTop: 50}}>
        <Image
          style={{width:150,height:100,resizeMode:"contain"}}
          source={{
            uri:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Emoji_u1f6b2.svg/2048px-Emoji_u1f6b2.svg.png"
          }}
          />
      </View>

      <KeyboardAvoidingView>
          <View style={{alignItems:"center",justifyContent:"center"}}>
            <Text style={{fontSize: 17, fontWeight:"bold", marginTop:25}}>회원가입</Text>
          </View>

          <View style={{marginTop:24}}>
              <View 
                style={{
                  flexDirection:"row",
                  alignItems:"center",
                  gap:5,borderColor:"#d0d0d0",
                  borderWidth:1,
                  paddingVertical:5,
                  borderRadius:5}}>
              <MaterialIcons style={{marginLeft:8}} name="person-outline" size={24} color="gray" />
              <TextInput
                value={name}
                onChangeText={(text) => setName(text)}
                placeholderTextColor={"gray"} 
                style={{color:"gray",marginVertical:10,width:300,fontSize:name?16:16}} 
                placeholder="닉네임" 
              />
              </View>
            </View>

          <View style={{marginTop:24}}>
            <View 
              style={{
                flexDirection:"row",
                alignItems:"center",
                gap:5,borderColor:"#d0d0d0",
                borderWidth:1,
                paddingVertical:5,
                borderRadius:5}}>
            <MaterialIcons style={{marginLeft:8}} name="email" size={24} color="gray" />
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholderTextColor={"gray"}
              style={{color:"gray",marginVertical:10,width:300,fontSize:email?16:16}} 
              placeholder="이메일" 
            />
            </View>

            <View style={{marginTop:24}}>
              <View 
                style={{
                  flexDirection:"row",
                  alignItems:"center",
                  gap:5,borderColor:"#d0d0d0",
                  borderWidth:1,
                  paddingVertical:5,
                  borderRadius:5}}>
              <Feather style={{marginLeft:8}} name="lock" size={24} color="gray" />
              <TextInput
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
                placeholderTextColor={"gray"} 
                style={{color:"gray",marginVertical:10,width:300,fontSize:password?16:16}} 
                placeholder="비밀번호" 
              />
              </View>
            </View>
          </View>

          <View style={{marginTop:45}}/>

          <Pressable 
          onPress={handleRegister}
            style={{
              width:200, 
              backgroundColor:"black",
              padding:15,
              marginTop:40,
              marginLeft:"auto",
              marginRight:"auto",
              borderRadius:6}}>
              <Text style={{textAlign:"center",fontWeight:"bold",fontSize:16,color:"white"}}>가입하기</Text>
          </Pressable>

          <Pressable onPress={() => navigation.goBack()} style={{marginTop:10}}>
              <Text style={{textAlign:"center",fontSize:16}}>로그인 하러가기</Text>
          </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({})