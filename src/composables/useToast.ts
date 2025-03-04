// toastUtils.js  
import { useToast, POSITION } from "vue-toastification";  

const toast = useToast();  

const showToast = (message: string, type = "default", options = {}) => {  
  const defaultOptions = {  
    position: POSITION.TOP_CENTER, // Posición central en la parte superior  
    timeout: 3000,         // Duración de 3 segundos 
  };  

  // Combina las opciones predeterminadas con las opciones personalizadas  
  const finalOptions = { ...defaultOptions, ...options };  

  switch(type) {  
    case "success":  
      toast.success(message, finalOptions);  
      break;  
    case "error":  
      toast.error(message, finalOptions);  
      break;  
    case "info":  
      toast.info(message, finalOptions);  
      break;  
    case "warn":  
      toast.warning(message, finalOptions);  
      break;  
    default:  
      toast(message, finalOptions);  
  }  
};  

export { showToast };  