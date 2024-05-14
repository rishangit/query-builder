import "./App.css";
import QueryBuilder from "./component/queryBuilderWindow";
import { createTheme, Theme, ThemeProvider } from '@mui/material/styles';
import { teal } from '@mui/material/colors';
import { useEffect, useState } from "react";

const muiTheme:Theme = createTheme({
  palette: {
    secondary: {
      main: teal[500],
    },
  },
});

function App() {

  const [fields, setFields] = useState([]);
  const parent:any = document.getElementById('query-builder');
  const strFields = parent.getAttribute('data-fields');

  useEffect(()=>{
    if(strFields){
      const obj = JSON.parse(strFields);
      setFields(obj)
    }
  },[strFields])

  return (
    <div className="App">
      <ThemeProvider theme={muiTheme}>
        <QueryBuilder fields={fields}/>
      </ThemeProvider>
    </div>
  );
}

export default App;
