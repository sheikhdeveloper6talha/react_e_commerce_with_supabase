import { useEffect } from 'react';
import {connectSupabase} from '../supabase/supabase'
const getData = async (id)=>{
     if(!id){
 try {
     const { data, error } = await connectSupabase
  .from('ProductitemsAdd')
  .select()
return data
}catch(error){
console.log(error.messages);
}
}else{
  try {
     const { data, error } = await connectSupabase
  .from('ProductitemsAdd')
  .select()
  .eq('id' , id)
return data
}catch(error){
console.log(error.messages);
}
}

}

export default getData     