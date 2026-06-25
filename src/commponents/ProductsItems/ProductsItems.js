import { useEffect } from 'react';
import {connectSupabase} from '../supabase/supabase'
const getData = async ()=>{
     
try {
     const { data, error } = await connectSupabase
  .from('ProductitemsAdd')
  .select()
return data
}catch(error){
console.log(error.messages);
}


}

export default getData     