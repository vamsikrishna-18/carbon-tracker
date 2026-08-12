import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";


function ThemeToggle(){

const {darkMode,setDarkMode}=useContext(ThemeContext);


return(

<button
onClick={()=>setDarkMode(!darkMode)}
className="px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700"
>

{
darkMode ? "🌙" : "☀️"
}

</button>

);

}

export default ThemeToggle;