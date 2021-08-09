import React,{useEffect} from 'react';
import {  useHistory} from 'react-router-dom';



const IndexPage = ()=>{
    const history = useHistory()

    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(!token){
            history.push('/login')
        }
        else{
            history.push('/texteditor')
        }
    },[])
    return <>Index</>
}

export default IndexPage