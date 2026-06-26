import { useState, useEffect } from "react"
import { connectSupabase } from "../supabase/supabase"

 const UseAuth = (DobaraChala) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [Loading, setLoading] = useState(true)

  useEffect(() => {
    const getCurrentUser = async () => {

      try {
        const { data: { user } } = await connectSupabase.auth.getUser()
        setCurrentUser(user)
      } catch (err) {
        console.log(err)
      } 
      setLoading(false)
    }

    getCurrentUser()
  }, [DobaraChala]) // DobaraChala change hoga to dobara chalega

  return { currentUser, Loading }
}

export  const getCurrentUserData = async (id)=>{
  
  try{
 const {data , error} = await connectSupabase
 .from('UsersIfo')
 .select()
 .eq('id' , id)
 .single()
 return  data
  }catch(errors){
console.log(errors);

  }
}

export default UseAuth