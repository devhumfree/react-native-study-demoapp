import { StyleSheet, Text, View, SafeAreaView, Image, Pressable, KeyboardAvoidingView, TextInput } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons, Feather  } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const LoginScreen = () => {
    const [email, setEmail] = useState("")
    const [password,setPassword] = useState("")
    const navigation = useNavigation()

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
            <Text style={{fontSize: 17, fontWeight:"bold", marginTop:25}}>Login</Text>
          </View>

          <View style={{marginTop:80}}>
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
              placeholder="이메일을 입력하세요." 
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
                placeholder="비밀번호를 입력하세요." 
              />
              </View>
            </View>
          </View>

          <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginTop:12}}>
            <Text>로그인 유지하기</Text>
            <Text style={{fontWeight:"500",color:"#007fff"}}>비밀번호 찾기</Text>
          </View>

          <View style={{marginTop:45}}/>

          <Pressable style={{width:200, backgroundColor:"black",padding:15,marginTop:40,marginLeft:"auto",marginRight:"auto",borderRadius:6}}>
              <Text style={{textAlign:"center",fontWeight:"bold",fontSize:16,color:"white"}}>로그인</Text>
          </Pressable>

          <Pressable onPress={() => navigation.navigate("Register")} style={{marginTop:10}}>
              <Text style={{textAlign:"center",fontSize:16}}>회원가입</Text>
          </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({})