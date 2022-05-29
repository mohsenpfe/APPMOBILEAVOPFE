import React,{useState,useEffect} from 'react';
import { Text, View,StyleSheet,Dimensions,Platform,Image,TextInput,TouchableOpacity, Alert, StatusBar,ScrollView} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import {useDispatch,useSelector} from 'react-redux';
import {SignIn}  from '../redux/actions/authaction';
import {clearErrors} from '../redux/actions/erroraction';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function login({navigation}) {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const error =useSelector(state=>state.error);

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [check_textInputChange,setCheck_textInputChange]=useState(false);
    const [secureTextEntry,setSecureTextEntry]=useState(true);
    const [msg, setMsg] = useState(null);

    const textInputChange=(val)=>{
        if(val.length!==0){
            setEmail(val);
            setCheck_textInputChange(true);
          
        }else{
            setEmail(val);
            setCheck_textInputChange(false);
          }}
    const handelPasswordChange=(val)=>{
      setPassword(val);
    }
 
    const updateSecureTextEntry=()=>{
        setSecureTextEntry(!secureTextEntry);
     
    }
   
   

    useEffect(() => {
        dispatch(clearErrors());
        
       }, []);

      useEffect(() => {
        // Check for register error
        if (error.id === 'LOGIN_FAIL') {
          setMsg(error.msg.msg);
        
        } else {
          setMsg(null);
        
        }
      }, [error,isAuthenticated]);
    
      const loginHandler=()=>{
            
            dispatch(SignIn({email,password}));
            
           }

       
       
         
    
 
    return (
        <ScrollView>
        <View style={styles.container}>
 
        <StatusBar backgroundColor='#009387'barStyle="light-content"/>
        <View style={styles.header}>
        <Text style={styles.text_header}> Welcome! </Text>
        </View>
        <Animatable.View style={styles.footer}
        animation='fadeInUpBig'
        >
        <Text style={styles.text_footer}> Email </Text>
        <View style={styles.action}>
        <FontAwesome
        name="user-o"
        color="#05375a"
        size={20}
        />
        <TextInput
        placeholder="Your Email"
        style={styles.textInput}
        autoCapitalize='none'
        value={email}
        onChangeText={setEmail}
        />
        {check_textInputChange? 
            <Animatable.View 
             animation="bounceIn" 
             >
            <Feather
            name="check-circle"
            color="green"
            size={20}
            />
            </Animatable.View>
            :null }
            
            </View>
            <Text style={[styles.text_footer,{marginTop:35}]}> Password </Text>
            <View style={styles.action}>
            <Feather
            name="lock"
            color="#05375a"
            size={20}
            />
            <TextInput
            placeholder="Your Password"
            secureTextEntry={secureTextEntry? true:false}
            style={styles.textInput}
            autoCapitalize='none'
            value={password}
            onChangeText={setPassword}
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
           {secureTextEntry?  <Feather
            name="eye-off"
            color="gray"
            size={20}
            />: <Feather
            name="eye"
            color="gray"
            size={20}
            />}
           
            </TouchableOpacity>
        
                </View>
                <Text style={{color:'red',marginTop:20}}>{msg}</Text>
            <View style={styles.button}>
            <TouchableOpacity onPress={()=>{loginHandler()}} style={[styles.signIn,
                { 
                borderBottomColor:'#009387',
                 borderWidth:1,
                 marginTop:15
            }]}>
            <LinearGradient
            colors={['#08d4c4','#01ab9d']}
            style={styles.signIn} 
            >
            <Text style={[styles.textSign,{
                color:'#fff'
            }] }> Sign In </Text>
            </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>navigation.navigate('SignUp')}
            style={[styles.signIn,
                { 
                borderBottomColor:'#009387',
                 borderWidth:1,
                 marginTop:15
            }]}
            >
            <Text style={[styles.textSign,{
                color:'#009387'
            }]} > Sign Up </Text>
            </TouchableOpacity>
            </View>
        </Animatable.View>
        </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
  });
