import { useEffect} from "react";

function DetectClickOutsideComponent(ref, state) {

  useEffect(()=>{
    
    function handleClickOutside (event) {
      console.log(event)
      if (ref.current && !ref.current.contains(event.target)) {
        //what i want to happen when clicked outside ref
        state(false)
      }
    }
    //bind the event Listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      //unbind the event listener to clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
    
  },[ref])
}

export default DetectClickOutsideComponent