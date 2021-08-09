import React,{useState} from 'react';
import { Link, useHistory} from 'react-router-dom';
import M from "materialize-css";
import "./styles.css"

const Home = ()=>{

    const history = useHistory()
    
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState("")


    const login = ()=>{ 
        fetch("http://localhost:8080/api/login",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                username,
                password
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                console.log(data.error)
                // M.toast({html:data.error,classes:"#d50000 red accent-4"})
            }else{
                console.log('sucessfullly loged in',data)
                // M.toast({html:data.message,classes:"#d50000 blue accent-4"})
                localStorage.setItem("token",data.token)
                history.push('/texteditor')
            }
        }).catch(err=>{console.log(err)})
    }

    return (
        <div  className="mycard">
            <div className="card auth-card input-field">
                <h3>X-change</h3>
                <input type="text" placeholder="username" value={username} onChange={(e)=>setUsername(e.target.value)}  />
                <input type="text" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}   />
                <button class="btn waves-effect waves-light" onClick ={()=>login()} >login</button>
                <h5><Link to="/signup">Don't have an account?</Link></h5>
            </div>
        </div>
       
    )
}

export default Home