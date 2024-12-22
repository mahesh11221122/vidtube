 import React, { useState } from 'react'
 //import Sidebar from './../../SideBar/SideBar'
import SideBar from '../../Component/SideBar/SideBar'
import Feed from '../../Component/Feed/Feed'
import './Home.css'

 function Home({sidebar}) {
const [category,setcategory] = useState(0);
   return (
     <div>
        <SideBar sidebar={sidebar} category={category} setcategory={setcategory}/>
        <div className={`container ${sidebar? "" :"large-container"}`}>
        <Feed category={category}/>

        </div>
     </div>
   )
 }
 
 export default Home