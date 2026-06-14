import { useState, useEffect } from "react"
import { connectSupabase } from "../supabase/supabase"

const useAuth = (DobaraChala) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [Loading, setLoading] = useState(false)

  useEffect(() => {
    const getCurrentUser = async () => {

      try {
        const { data: { user } } = await connectSupabase.auth.getUser()
        setCurrentUser(user)
      } catch (err) {
        console.log(err)
      } 
      setLoading(true)
    }

    getCurrentUser()
  }, [DobaraChala]) // DobaraChala change hoga to dobara chalega

  return { currentUser, Loading }
}

export default useAuth