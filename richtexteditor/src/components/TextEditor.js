import React,{useEffect, useState} from 'react';
import {Editor} from 'react-draft-wysiwyg';
import {ContentState,convertToRaw} from 'draft-js'
import './styles.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import io from 'socket.io-client';


const TextEditor = ()=>{
  const [username,setUsername] = useState('')
  let _contentState = ContentState.createFromText(``)
  const text = convertToRaw(_contentState)
  const [ contentState,setContentState] = useState(text)
  const [data,setData] = useState([])

  const token = localStorage.getItem('token')
  let socket
  
  useEffect(() => {

  socket = io.connect("http://localhost:8080", {
    query:{
      token : localStorage.getItem('token')
    }
  }, { transports: ['websocket', 'polling', 'flashsocket'] })
})

  useEffect(() => {
    fetch('http://localhost:8080/api/text',{
      method: 'GET',
      headers:{
        "Content-Type": "application/json",
        Authorization:token
      },
    }).then(res=>res.json()).then(result=>{
      // console.log(result.data)
      setData(result.data)
  }).catch(err=>{
    console.log(err)
  })
  },[])

  var mytext = []
   data.map(text=>{
    text.data.map(it=>{
      // {console.log(it.text,it.style)}
      // it.text !== undefined ? mytext.push(it.text) : undefined
      return  it.text !== undefined ? mytext.push(it.text) : undefined
    })
   })


console.log(mytext)
  

// console.log(data[0].data[0].text)

  const handlesubmit = ()=>{
    contentState.blocks.map(items=>{
      socket.emit('text',{contentState:{text:items.text,style:items.type},username})
    })
  }

  
  
  
  return (
    <div className="App">
      
     <h1 className ="header">Block based editor</h1>
    {mytext.map((id,it)=>{return <h5 key = {it}>{id}</h5>}) }
     <Editor 
     defaultContentState={contentState}
     onContentStateChange={setContentState}
     wrapperClassName="wrapper-class"
     editorClassName="editor-class"
     toolbarClassName="toolbar-class"
     />
     <button  onClick={handlesubmit}>save</button>
    </div>
  );
}

export default TextEditor;